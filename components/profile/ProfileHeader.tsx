import React, { useEffect, useState } from "react";
import {
  CreateOutlined,
  HowToRegOutlined,
  PersonAddAlt1Outlined,
} from "@mui/icons-material";
import { Avatar, IconButton, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { COLOR } from "../../constants";
import { StatStack } from "../../ui";
import { User } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../../store";
import { checkIfFriends, deepCloneObject, nest } from "../../utils";
import { followFriend, unfollowFriend } from "../../APIs";
import { userDataActions } from "../../store/user-data.slice";
import { notifierActions } from "../../store/notifier.slice";

export const ProfileHeader: React.FC<{
  user: User;
  isProfileOwner: boolean;
}> = ({ user, isProfileOwner }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: StoreState) => state.user.data);
  const currentUserRole = useSelector(
    (state: StoreState) => state.role.currentUser
  );
  const token = useSelector((state: StoreState) => state.jwt.token);

  // Checking if the user and profile owner friends.
  const [isFriend, setIsFriend] = useState(false);
  useEffect(() => {
    if (checkIfFriends(currentUser, user)) {
      setIsFriend(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // FOLLOW & UNFOLLOW
  const handleAddFriend = async () => {
    try {
      const isAdded = await followFriend(user._id, token);
      if (isAdded) {
        const clonedUser = deepCloneObject(currentUser);
        clonedUser.followers?.push(user._id);
        dispatch(userDataActions.addUserData(clonedUser));
        setIsFriend(true);
        dispatch(notifierActions.success("Successfully followed !"));
      }
    } catch (err: any) {
      console.log(err);
      dispatch(notifierActions.error("Something went wrong !"));
    }
  };
  const handleRemoveFriend = async () => {
    try {
      console.log(currentUser.followers);
      const isRemoved = await unfollowFriend(user._id, token);
      if (!isRemoved) throw new Error("Something went wrong");
      const clonedUser = deepCloneObject(currentUser);
      const removeIndex = clonedUser.followers?.indexOf(user._id);
      if (removeIndex !== undefined && removeIndex > -1) {
        clonedUser.followers?.splice(removeIndex, 1);
        dispatch(userDataActions.addUserData(clonedUser));
        setIsFriend(false);
        dispatch(notifierActions.success("Successfully unfollowed !"));

        return;
      }
    } catch (err: any) {
      console.log(err);
      dispatch(notifierActions.error("Something went wrong !"));
    }
  };

  return (
    <Stack height={270} gap={1}>
      {/* ------COVER------- */}
      <Box
        flex={3.5}
        sx={{
          backgroundImage:
            "url('https://hire-one.s3.ap-south-1.amazonaws.com/777be1735c8bf3d4e2d4162802637c0c.jpeg')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          borderRadius: 3,
        }}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"end"}
      >
        <Avatar
          sx={{ marginLeft: 2, marginBottom: 1, height: 96, width: 96 }}
          src={user.image || ""}
        >
          {user.name || ""}
        </Avatar>
        {isProfileOwner && (
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
            sx={{
              margin: 2,
              backgroundColor: COLOR["H1d-ui-bg"],
              color: COLOR["H1d-ui-primary"],
              borderRadius: 3,
            }}
          >
            <input hidden accept="image/*" type="file" />
            <CreateOutlined />
          </IconButton>
        )}
        {!isProfileOwner && currentUserRole !== "guest" && (
          <>
            {!isFriend && (
              <IconButton
                color="primary"
                aria-label="add-friend"
                component="label"
                onClick={handleAddFriend}
                sx={{
                  margin: 2,
                  backgroundColor: COLOR["H1d-ui-bg"],
                  color: COLOR["H1d-ui-primary"],
                  borderRadius: 3,
                }}
              >
                <PersonAddAlt1Outlined />
              </IconButton>
            )}

            {isFriend && (
              <IconButton
                color="primary"
                aria-label="remove-friend"
                component="label"
                onClick={handleRemoveFriend}
                sx={{
                  margin: 2,
                  backgroundColor: COLOR["H1d-ui-bg"],
                  color: COLOR["H1d-ui-primary"],
                  borderRadius: 3,
                }}
              >
                <HowToRegOutlined />
              </IconButton>
            )}
          </>
        )}
      </Box>
      {/* -----Title------- */}
      <Box
        bgcolor={"black"}
        flex={1}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{
          boxShadow: 8,
          borderRadius: 3,
        }}
      >
        <Stack marginLeft={2}>
          <Typography variant="h6" color={COLOR["H1d-font-primary"]}>
            {user.name || ""}
          </Typography>
          <div></div>
        </Stack>
        <Box display={"flex"} gap={1} marginRight={2}>
          <StatStack name="Posts" stat="0" />
          <StatStack
            name="Follwers"
            stat={(user.followers && String(user.followers?.length)) || "0"}
          />
          <StatStack name="Following" stat="0" />
        </Box>
      </Box>
    </Stack>
  );
};
