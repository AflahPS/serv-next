import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  InputBase,
  Typography,
} from "@mui/material";
import { CheckOutlined, ClearOutlined } from "@mui/icons-material";
import { LinkButton, SearchContainer, TabHeader } from "../../ui";
import { User } from "../../types";
import {
  checkIfFriends,
  deepCloneObject,
  findCommonInArrays,
} from "../../utils";
import { useDispatch } from "react-redux";
import { followFriend, getFollowers, unfollowFriend } from "../../APIs";
import { userDataActions } from "../../store/user-data.slice";
import { AVATAR } from "../../constants";
import { useStore } from "../../customHooks";
import { useAutoAnimate } from "@formkit/auto-animate/react";

interface Props {
  user: User;
  isProfileOwner: boolean;
}

export const Friends: React.FC<Props> = (props) => {
  const { user, isProfileOwner } = props;
  const dispatch = useDispatch();
  const [animationRef] = useAutoAnimate();
  const { currentUser, token, isAuth } = useStore();

  const [followers, setFollowers] = useState<User[]>([]);

  // Populates the followers details when mounting
  const getAndSetFollowers = async () => {
    try {
      const data = await getFollowers(user._id);
      setFollowers(data ? data : []);
    } catch (err: any) {
      console.error(err?.message);
    }
  };

  // Follow and Unfollow handlers
  const handleFollowClick = async (user: User) => {
    try {
      const isAdded = await followFriend(user._id, token);
      if (!isAdded) throw new Error(`Something went wrong`);
      const clonedUser = deepCloneObject(currentUser);
      clonedUser.followers?.push(user._id);
      dispatch(userDataActions.addUserData(clonedUser));
      user?.followers;
      await getAndSetFollowers();
    } catch (err: any) {
      console.error(err);
    }
  };
  const handleUnfollowClick = async (userId: string) => {
    try {
      const isRemoved = await unfollowFriend(userId, token);
      if (!isRemoved) throw new Error("Something went wrong");
      const clonedUser = deepCloneObject(currentUser);
      const removeIndex = clonedUser.followers?.indexOf(userId);
      if (removeIndex !== undefined && removeIndex > -1) {
        clonedUser.followers?.splice(removeIndex, 1);
        dispatch(userDataActions.addUserData(clonedUser));
        isProfileOwner &&
          setFollowers(followers.filter((el) => el._id !== userId));
        return;
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  useEffect(() => {
    getAndSetFollowers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box sx={{ boxShadow: 8, borderRadius: 3 }}>
      <TabHeader invertColor header="Friends" />
      <SearchContainer marginBottom={3}>
        <InputBase fullWidth placeholder="Search friends.." />
      </SearchContainer>

      {/* GRID Container */}
      <Grid
        color={"white"}
        ref={animationRef}
        container
        spacing={{ xs: 1, md: 2, lg: 3 }}
      >
        {followers.map((follower, index) => (
          // GRID Items
          <Grid
            item
            xs={12}
            sm={6}
            xl={4}
            height={200}
            justifyContent={"center"}
            key={index}
          >
            {/* FOLLOWER's CARD */}
            <Card sx={{ display: "flex", height: "100%", borderRadius: 3 }}>
              {/* FOLLOWER's DP -on left */}
              <CardMedia
                component="img"
                sx={{
                  width: "35%",
                  objectFit: "cover",
                }}
                image={
                  follower.image?.includes("hire-one.s3")
                    ? follower.image
                    : AVATAR
                }
                alt={follower.name}
              />

              {/* FOLLOWER's Details -on right */}
              <CardContent
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                {/* Name */}
                <Typography component="div" variant="h6">
                  {follower.name}
                </Typography>
                {/* Friends number */}
                <Typography
                  variant="body1"
                  color="text.secondary"
                  component="div"
                >
                  {follower.followers?.length} Friends
                </Typography>
                {/* Mutual friends */}
                <Typography
                  variant="body1"
                  color="text.secondary"
                  component="div"
                >
                  {findCommonInArrays(follower.followers!, followers)} Mutual
                  Friends
                </Typography>

                {/* Follow & Unfollow Button */}
                {isAuth && checkIfFriends(currentUser, follower) === true && (
                  <LinkButton
                    variant="outlined"
                    id={`follow-button-${index}`}
                    startIcon={<ClearOutlined color="error" />}
                    onClick={() => {
                      handleUnfollowClick(follower._id);
                    }}
                  >
                    Unfollow
                  </LinkButton>
                )}
                {isAuth && checkIfFriends(currentUser, follower) === false && (
                  <LinkButton
                    variant="outlined"
                    startIcon={<CheckOutlined color="success" />}
                    onClick={() => {
                      handleFollowClick(follower);
                    }}
                  >
                    Follow
                  </LinkButton>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
