import {
  ChatBubbleOutlineOutlined,
  Favorite,
  FavoriteBorder,
  Label,
  MoreVert,
  SendOutlined,
} from "@mui/icons-material";
import {
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
  Typography,
  styled,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { COLOR } from "../../constants";
import { Post } from "../../types/Posts";
import Carousel from "react-material-ui-carousel";
import { useSelector } from "react-redux";
import { StoreState } from "../../store";
import { TextFieldCustom2 } from "./TextFieldCustom2";
import { COMMENTS } from "../../constants";
import { LinkButton } from "./LinkButton";
import { Comments } from "../../components/common";
import { nest } from "../../utils";
import { Like } from "../../types";

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
  const role = useSelector((state: StoreState) => state.role.currentUser);
  const user = useSelector((state: StoreState) => state.user.data);
  const token = useSelector((state: StoreState) => state.jwt.token);

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
        const liked = data?.likes.some(
          (like: Like) => like.user.toString() === user._id.toString()
        );
        liked && setIsChecked(liked);
      })();
    } catch (err: any) {
      console.log(err?.message);
    }
  }, [post, user]);

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

  return (
    <>
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
            <Avatar
              sx={{ bgcolor: "red" }}
              aria-label="owner-image"
              src={post.owner.image}
            ></Avatar>
          }
          action={
            role !== "guest" && (
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
                  <MenuItem onClick={handleClose}>Report</MenuItem>
                </Menu>
              </>
            )
          }
          title={post.owner.name}
          subheader="September 14, 2022"
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
            <Comments comments={COMMENTS} />
            <TextFieldCustom2
              placeholder="Type a comment here..."
              size="small"
              sx={{ width: "88%", margin: 1 }}
              InputProps={{
                sx: { paddingX: 1, paddingY: 1 },
                endAdornment: (
                  <InputAdornment position="end">
                    <LinkButton endIcon={<SendOutlined />} variant="outlined">
                      Add
                    </LinkButton>
                  </InputAdornment>
                ),
              }}
            />
          </CardContent>
        </Collapse>
      </Card>
    </>
  );
};
