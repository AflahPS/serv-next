import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Divider,
  ListItemButton,
  IconButton,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Comment, CommentLike } from "../../types";
import dayjs from "dayjs";
import { COLOR } from "../../constants";
import {
  DeleteOutlineOutlined,
  ThumbDownAltOutlined,
  ThumbUpAltOutlined,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import { StoreState } from "../../store/store";
import { deleteCommentById, getCommentLikes, likeComment } from "../../APIs";
import { useConfirm } from "material-ui-confirm";

export const CommentCard: React.FC<{
  comment: Comment;
  removeComment: (id: string) => void;
}> = ({ comment, removeComment }) => {
  const muiConfirm = useConfirm();

  const [isLiked, setIsLiked] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [commentLikes, setCommentLikes] = useState<CommentLike[]>([]);

  // const [isEditable, setIsEditable] = useState(false);
  // const handleEditComment = () => {
  //   setIsEditable((prev) => !prev);
  // };

  // CHECK IF THE USER IS OWNER
  const currentUser = useSelector((state: StoreState) => state.user.data);
  useEffect(() => {
    setIsOwner(comment.user?._id === currentUser._id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAndSetLikes = async () => {
    try {
      const likes: CommentLike[] = await getCommentLikes(comment._id);
      setCommentLikes(likes);
      if (likes.some((el: CommentLike) => el.user === currentUser._id)) {
        setIsLiked(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getAndSetLikes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const token = useSelector((state: StoreState) => state.jwt.token);
  const handleDeleteComment = async () => {
    try {
      await muiConfirm({
        description: "Do you want to delete this comment ?",
      });
      const isDeleted = await deleteCommentById(comment._id, token);
      if (isDeleted) {
        removeComment(comment._id);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const handleLikeComment = async () => {
    try {
      const isSuccess = await likeComment(isLiked, comment._id, token);

      // DISLIKED
      if (isLiked && typeof isSuccess === "boolean" && isSuccess) {
        setIsLiked(false);
        setCommentLikes((prev) =>
          prev.filter((like) => like.user !== currentUser._id)
        );
        return;
      }

      // LIKED
      setIsLiked(true);
      setCommentLikes((prev) => [...prev, isSuccess?.like]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={comment?.user?.name} src={comment?.user?.image} />
        </ListItemAvatar>
        <ListItemText
          primary={comment.user.name}
          primaryTypographyProps={{
            color: COLOR["H1d-font-primary"],
            fontSize: "14px",
          }}
          secondary={
            <>
              {/* TIME */}
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="subtitle2"
                fontSize={12}
                color={COLOR["H1d-font-primary"]}
              >
                {dayjs(comment.createdAt).format("LLL")}
              </Typography>

              {/* EDITED
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="subtitle2"
                fontSize={12}
                color={COLOR["H1d-font-primary"]}
              >
                {`    [EDITED]`}
              </Typography> */}

              {/* CONTENT */}

              <Typography
                sx={{ display: "block" }}
                component="span"
                variant="subtitle1"
                color="text.primary"
              >
                {comment.content}
              </Typography>

              {/* LIKE */}

              <ListItemButton sx={{ display: "contents" }}>
                <IconButton onClick={handleLikeComment}>
                  <Typography
                    variant="subtitle1"
                    fontSize="16px"
                    color={COLOR["H1d-font-primary"]}
                    fontWeight="900"
                    marginX={1}
                  >
                    {commentLikes.length}
                  </Typography>
                  {!isLiked && (
                    <ThumbUpAltOutlined
                      sx={{ height: "18px", width: "18px", marginRight: "5px" }}
                    />
                  )}
                  {isLiked && (
                    <ThumbDownAltOutlined
                      sx={{ height: "18px", width: "18px", marginRight: "5px" }}
                    />
                  )}
                </IconButton>
              </ListItemButton>

              {/* DELETE */}
              {isOwner && (
                <ListItemButton sx={{ display: "contents" }}>
                  <IconButton onClick={handleDeleteComment}>
                    <DeleteOutlineOutlined
                      sx={{ height: "18px", width: "18px", marginRight: "5px" }}
                    />
                  </IconButton>
                </ListItemButton>
              )}

              {/* EDIT */}

              {/* <ListItemButton sx={{ display: "contents" }}>
                <IconButton onClick={handleEditComment}>
                  <EditOutlined
                    sx={{ height: "18px", width: "18px", marginRight: "5px" }}
                  />
                </IconButton>
              </ListItemButton> */}
            </>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
};
