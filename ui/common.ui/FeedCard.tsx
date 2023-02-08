import {
  ChatBubbleOutlineOutlined,
  Favorite,
  FavoriteBorder,
  MoreVert,
  SendOutlined,
} from "@mui/icons-material";
import {
  Alert,
  Avatar,
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
  Snackbar,
  Typography,
  styled,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { COLOR } from "../../constants";
import Carousel from "react-material-ui-carousel";
import { useSelector } from "react-redux";
import { StoreState } from "../../store";
import { TextFieldCustom2 } from "./TextFieldCustom2";
import { LinkButton, EditPost } from ".";
import { Comments } from "../../components/common";
import { nest } from "../../utils";
import { Like, Post } from "../../types";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import { useConfirm } from "material-ui-confirm";
import { deletePost } from "../../APIs";
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

export const FeedCard: React.FC<{ post: Post; maxWidth?: string }> = ({
  post,
  maxWidth,
}) => {
  const router = useRouter();

  const muiConfirm = useConfirm();

  const role = useSelector((state: StoreState) => state.role.currentUser);
  const user = useSelector((state: StoreState) => state.user.data);
  const token = useSelector((state: StoreState) => state.jwt.token);

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

  //----- ERROR, Success message Snackbar related properties
  const [errMessage, setErrMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [openError, setOpenError] = React.useState(false);
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const handleCloseError = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenError(false);
  };
  const handleCloseSuccess = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccess(false);
  };
  const errorSetter = (message: string) => {
    setErrMessage(message);
    setOpenError(true);
  };
  const successSetter = (message: string) => {
    setSuccessMessage(message);
    setOpenSuccess(true);
  };

  // Gathering the "Likes" from DB
  useEffect(() => {
    try {
      (async () => {
        const { data } = await nest({
          url: `/post/like/${post._id}`,
          method: "GET",
        });
        if (!user || !data) return;
        setLikeCount(data?.results);
        if (!data?.results) return;
        console.log(data?.likes);
        console.log(user);

        const liked = data?.likes.some(
          (like: Like) => like?.user?._id?.toString() === user?._id?.toString()
        );
        liked && setIsChecked(liked);
      })();
    } catch (err: any) {
      console.log(err?.message);
    }
  }, [post, user]);

  // Create a like on the DB
  const likerFunction = async (action: boolean) => {
    try {
      const { data } = await nest({
        url: `/post/${action ? "like" : "dislike"}/${post._id}`,
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      return Boolean(data?.status === "success");
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  // If like is created on the DB, Change UI according to it
  const handleLikeClick = async () => {
    try {
      const done = await likerFunction(!isChecked);
      if (done) {
        setIsChecked(!isChecked);
        setLikeCount((prev) => {
          return isChecked ? prev - 1 : prev + 1;
        });
      }
    } catch (err: any) {
      console.log(err?.message);
    }
  };

  // Report a post
  const handleReportClick = async () => {
    try {
      setAnchorEl(null);
      await muiConfirm({
        description: "Are you sure you want to report this post?",
      });
      const { data } = await nest({
        method: "PATCH",
        url: `post/report/${post._id}`,
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      if (data.status === "success") successSetter("Reported successfully !");
    } catch (err: any) {
      console.error(err?.message);
      errorSetter("Something went wrong while reporting !");
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
        successSetter("Post removed successfully !!");
      }
    } catch (err) {
      console.log(err);
      if (typeof err === "undefined") return;
      errorSetter("Something went wrong !");
    }
  };
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState("");

  const handleAddCommentClick = async () => {
    if (!newComment.length)
      return errorSetter("Please type something on the comment field...");
    const dataV = {
      content: newComment,
      post: post._id,
    };
    const { data } = await nest({
      url: "/comment",
      method: "POST",
      data: dataV,
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (data.status === "success") {
      setNewComment("");
      setComments((prev) => [data?.comment, ...prev]);
      successSetter("You have successfully added a new comment !");
    }
  };

  const handleProfileClick = () => {
    router.push(`/profile/${post.owner._id}`);
  };

  return (
    <>
      {isEditable && (
        <Card
          sx={{
            backgroundColor: COLOR["H1d-ui-bg"],
            maxWidth: maxWidth || "100%",
            marginX: "auto",
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
            maxWidth: maxWidth || "100%",
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
            <Carousel autoPlay={false}>
              {post.media.map((image, ind) => (
                <CardMedia
                  key={ind}
                  component={"img"}
                  image={image}
                  alt={`Post image`}
                />
              ))}
            </Carousel>
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

      <Snackbar
        open={openError}
        autoHideDuration={6000}
        onClose={handleCloseError}
      >
        <Alert
          onClose={handleCloseError}
          severity="error"
          sx={{ width: "100%" }}
        >
          {errMessage}
        </Alert>
      </Snackbar>

      <Snackbar
        open={openSuccess}
        autoHideDuration={6000}
        onClose={handleCloseSuccess}
      >
        <Alert
          onClose={handleCloseSuccess}
          severity="success"
          sx={{ width: "100%" }}
        >
          {successMessage}
        </Alert>
      </Snackbar>
    </>
  );
};