import {
  ChatBubbleOutlineOutlined,
  Favorite,
  FavoriteBorder,
  MoreVert,
  SendOutlined,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  Collapse,
  IconButton,
  IconButtonProps,
  InputAdornment,
  Menu,
  MenuItem,
  Typography,
  styled,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { COLOR } from "../../constants";
import Carousel from "react-material-ui-carousel";
import { useDispatch } from "react-redux";
import { TextFieldCustom2 } from "./TextFieldCustom2";
import { LinkButton, EditPost } from ".";
import { Comments } from "../../components/common";
import { Like, Post } from "../../types";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import { useConfirm } from "material-ui-confirm";
import {
  addComment,
  addToSavedPost,
  deletePost,
  getLikesOfPost,
  likePost,
  removeFromSavedPost,
  reportPost,
} from "../../APIs";
import { notifierActions } from "../../store/notifier.slice";
import { useNotification, useStore } from "../../customHooks";
import { userDataActions } from "../../store/user-data.slice";
import Image from "next/image";
// import { EditPost } from "./EditPost";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

interface Props {
  post: Post;
}

export const FeedCard: React.FC<Props> = ({ post }) => {
  const router = useRouter();
  const muiConfirm = useConfirm();
  const dispatch = useDispatch();
  const setNotification = useNotification();

  const { role, currentUser: user, token } = useStore();

  const isOwner =
    user?.name && post.owner?._id?.toString() === user?._id?.toString();

  const [isEditable, setIsEditable] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [likeCount, setLikeCount] = useState<number>(0);

  // Control COllapse of comments and more buttons
  const [expanded, setExpanded] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleMoreClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // Gathering the "Likes" from DB
  useEffect(() => {
    try {
      (async () => {
        const likeData = await getLikesOfPost(post._id);
        if (!user || !likeData) return;
        setLikeCount(likeData?.results);
        if (!likeData?.results) return;
        const liked = likeData?.likes?.some(
          (like: Like) => like?.user?._id?.toString() === user?._id?.toString()
        );
        liked && setIsChecked(liked);
      })();
    } catch (err: any) {
      console.error(err?.message);
    }
  }, [post, user]);

  // If like is created on the DB, Change UI according to it
  const handleLikeClick = async () => {
    try {
      const done = await likePost(
        !isChecked ? "like" : "dislike",
        post._id,
        token
      );
      if (done) {
        setIsChecked((prev) => !prev);
        setLikeCount((prev) => {
          return isChecked ? prev - 1 : prev + 1;
        });
        if (!isChecked) {
          setNotification({
            content: `${user.name} has liked your post !`,
            type: "success",
            receiver: post.owner._id as string,
          });
        }
      }
    } catch (err: any) {
      console.error(err?.message);
    }
  };

  // Report a post
  const handleReportClick = async () => {
    try {
      setAnchorEl(null);
      await muiConfirm({
        description: "Are you sure you want to report this post?",
      });
      const isSuccess = await reportPost(post._id, token);
      if (isSuccess) {
        dispatch(notifierActions.success("Reported successfully !"));
        setNotification({
          content: `${user.name} has reported your post !`,
          type: "warning",
          receiver: post.owner._id as string,
        });
      }
    } catch (err: any) {
      console.error(err?.message);
      dispatch(notifierActions.error("Something went wrong while reporting !"));
    }
  };

  const addSavedLocally = (postId: string) => {
    const updatedUser = Object.assign(
      {},
      { ...user },
      {
        savedPosts: [...(user?.savedPosts as string[]), postId],
      }
    );
    dispatch(userDataActions.addUserData(updatedUser));
  };

  const removeSavedLocally = (postId: string) => {
    const updatedUser = Object.assign(
      {},
      { ...user },
      {
        savedPosts: (user?.savedPosts as string[]).filter(
          (post) => post !== postId
        ),
      }
    );
    dispatch(userDataActions.addUserData(updatedUser));
  };

  // Save a post
  const handleSaveClick = async (action: "save" | "remove") => {
    try {
      setAnchorEl(null);
      const isSuccess =
        action === "save"
          ? await addToSavedPost(token, post._id)
          : await removeFromSavedPost(token, post._id);
      if (isSuccess) {
        action === "save"
          ? addSavedLocally(post._id)
          : removeSavedLocally(post._id);
        dispatch(notifierActions.success(`Post ${action}d successfully !`));
      }
    } catch (err: any) {
      console.error(err?.message);
      dispatch(notifierActions.error("Something went wrong while reporting !"));
    }
  };

  // Enable post-editable UI
  const handleEditClick = async () => {
    setAnchorEl(null);
    setIsEditable(true);
  };

  // Removes a post
  const handleRemoveClick = async () => {
    try {
      setAnchorEl(null);
      const isConfirm = await muiConfirm({
        description: "Do you want to remove this post ?",
      });
      const isDeleted = await deletePost(post._id, token);
      if (isDeleted) {
        dispatch(notifierActions.success("Post removed successfully !!"));
      }
    } catch (err) {
      console.error(err);
      if (typeof err === "undefined") return;
      dispatch(notifierActions.somethingWentWrong());
    }
  };
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState("");

  const handleAddCommentClick = async () => {
    if (!newComment.length)
      return dispatch(
        notifierActions.error("Please type something on the comment field...")
      );
    const dataV = {
      content: newComment,
      post: post._id,
    };
    const added = await addComment(dataV, token);
    if (added) {
      setNewComment("");
      setComments((prev) => [added?.comment, ...prev]);
      dispatch(
        notifierActions.success("You have successfully added a new comment !")
      );
      setNotification({
        content: `${user.name} has commented to your post !`,
        type: "success",
        receiver: post.owner._id as string,
      });
    }
  };

  const handleProfileClick = () => {
    router.push(`/profile/${post.owner._id}`);
  };

  const checkIfAlreadySaved = (id: string) => {
    const saved = user?.savedPosts;
    if (!Array.isArray(saved)) return false;
    if (saved.includes(id)) return true;
    return false;
  };

  return (
    <>
      {isEditable && (
        <Card
          sx={{
            backgroundColor: COLOR["H1d-ui-bg"],
            marginX: "auto",
            width: "100%",
            marginBottom: "16px",
            boxShadow: 8,
            borderRadius: 3,
          }}
        >
          <EditPost post={post} setIsEditable={setIsEditable} />
        </Card>
      )}
      {!isEditable && (
        <Card
          sx={{
            backgroundColor: COLOR["H1d-ui-bg"],
            width: "100%",
            marginX: "auto",
            marginBottom: "16px",
            boxShadow: 8,
            borderRadius: 3,
          }}
        >
          {/*  Header with avatar, name and morebutton */}
          <CardHeader
            avatar={
              <IconButton onClick={handleProfileClick} sx={{ padding: 0 }}>
                <Avatar
                  sx={{ bgcolor: "red" }}
                  aria-label="owner-image"
                  src={post.owner?.image}
                ></Avatar>
              </IconButton>
            }
            action={
              (role !== "guest" && !isOwner && (
                <>
                  <IconButton onClick={handleMoreClick} aria-label="settings">
                    <MoreVert />
                  </IconButton>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <MenuItem onClick={handleReportClick}>Report</MenuItem>
                    {!checkIfAlreadySaved(post._id) && (
                      <MenuItem
                        onClick={() => {
                          handleSaveClick("save");
                        }}
                      >
                        Add to saved
                      </MenuItem>
                    )}
                    {checkIfAlreadySaved(post._id) && (
                      <MenuItem
                        onClick={() => {
                          handleSaveClick("remove");
                        }}
                      >
                        Remove from saved
                      </MenuItem>
                    )}
                  </Menu>
                </>
              )) ||
              (isOwner && (
                <>
                  <IconButton onClick={handleMoreClick} aria-label="settings">
                    <MoreVert />
                  </IconButton>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <MenuItem onClick={handleEditClick}>Edit</MenuItem>
                    <MenuItem onClick={handleRemoveClick}>Remove</MenuItem>
                  </Menu>
                </>
              ))
            }
            title={post.owner.name}
            subheader={dayjs(post.createdAt).format("LLL")}
          />

          {/*  Image carousel  */}

          {post.media.length > 0 && (
            <CardMedia>
              <Carousel autoPlay={false}>
                {post.media.map((image, ind) => (
                  <Box
                    position={"relative"}
                    height={{
                      xs: "100vw",
                      sm: "75vw",
                      md: "50vw",
                      lg: "600px",
                    }}
                    key={ind}
                  >
                    <Image
                      src={image}
                      alt={`Post image`}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 768px) 100vw,
                    (max-width: 1200px) 50vw,
                    33vw"
                    />
                  </Box>
                ))}
              </Carousel>
            </CardMedia>
          )}

          {/*  CAPTION */}

          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {post.caption}
            </Typography>
          </CardContent>

          {/* ACTIOnssss */}

          {role !== "guest" && (
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                {/* <Label  /> */}

                <Checkbox
                  id={`checkbox-${post._id}`}
                  icon={<FavoriteBorder />}
                  checkedIcon={<Favorite sx={{ color: "red" }} />}
                  onClick={handleLikeClick}
                  checked={isChecked}
                />
              </IconButton>
              <Typography variant="body2" color={"Menu"}>
                {likeCount}
              </Typography>

              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ChatBubbleOutlineOutlined />
              </ExpandMore>
            </CardActions>
          )}

          {/*  CoMMENTS SECTION  */}

          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "end",
              }}
            >
              {/* All Comments.... */}

              <Comments
                post={post._id}
                comments={comments}
                setComments={setComments}
              />

              {/*  LEave a acomment */}

              <TextFieldCustom2
                placeholder="Type a comment here..."
                size="small"
                sx={{ width: "88%", margin: 1 }}
                onChange={(e) => {
                  setNewComment(e.target.value);
                }}
                value={newComment}
                InputProps={{
                  sx: { paddingX: 1, paddingY: 1 },
                  endAdornment: (
                    <InputAdornment position="end">
                      <LinkButton
                        onClick={handleAddCommentClick}
                        endIcon={<SendOutlined />}
                        variant="outlined"
                      >
                        Add
                      </LinkButton>
                    </InputAdornment>
                  ),
                }}
              />
            </CardContent>
          </Collapse>
        </Card>
      )}
    </>
  );
};
