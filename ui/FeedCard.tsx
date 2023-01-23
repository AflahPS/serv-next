import { Favorite, FavoriteBorder, MoreVert, Share } from "@mui/icons-material";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import { COLOR } from "../constants";
import { Post } from "../types/Posts";
import Carousel from "react-material-ui-carousel";

export const FeedCard: React.FC<{ post: Post }> = ({ post }) => {
  console.log({ post });

  return (
    <>
      <Card
        sx={{
          backgroundColor: COLOR["H1d-ui-bg"],
          maxWidth: "80%",
          marginX: "auto",
          marginBottom: "16px",
          boxShadow: 8,
          borderRadius: 3,
        }}
      >
        <CardHeader
          avatar={
            <Avatar
              sx={{ bgcolor: "red" }}
              aria-label="recipe"
              src={post.owner.image}
            ></Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVert />
            </IconButton>
          }
          title={post.owner.name}
        
          subheader="September 14, 2022"
        />
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
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {post.caption}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <Checkbox
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite sx={{ color: COLOR["H1d-ui-primary"] }} />}
            />
          </IconButton>
          <IconButton aria-label="share">
            <Share />
          </IconButton>
        </CardActions>
      </Card>
    </>
  );
};
