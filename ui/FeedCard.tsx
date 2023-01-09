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
import React, { PropsWithChildren } from "react";
import { COLOR } from "../constants";

export const FeedCard: React.FC<{ customSx?: {} }> = (props) => {
  return (
    <>
      <Card
        sx={{
          maxWidth: "80%",
          marginX: "auto",
          marginBottom: "16px",
          ...props.customSx,
        }}
      >
        <CardHeader
          avatar={
            <Avatar
              sx={{ bgcolor: "red" }}
              aria-label="recipe"
              src="https://images.pexels.com/photos/2709718/pexels-photo-2709718.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            ></Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVert />
            </IconButton>
          }
          title="Dhamodar"
          subheader="September 14, 2022"
        />
        <CardMedia
          component="img"
          height="20%"
          image="https://images.pexels.com/photos/461431/pexels-photo-461431.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            This impressive paella is a perfect party dish and a fun meal to
            cook together with your guests. Add 1 cup of frozen peas along with
            the mussels, if you like.
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
