import React, { useEffect, useState } from "react";
import {
  CreateOutlined,
  HourglassBottomOutlined,
  HowToRegOutlined,
  PersonAddAlt1Outlined,
} from "@mui/icons-material";
import { Avatar, IconButton, Typography, fabClasses } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { COLOR } from "../../constants";
import { StatStack } from "../../ui";
import { User } from "../../types";
import { useSelector } from "react-redux";
import { StoreState } from "../../store";
import { checkIfFriends } from "../../utils";

export const ProfileHeader: React.FC<{
  user: User;
  isProfileOwner: boolean;
}> = ({ user, isProfileOwner }) => {
  const [isFriend, setIsFriend] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const currentUser = useSelector((state: StoreState) => state.user.data);
  const currentUserRole = useSelector(
    (state: StoreState) => state.role.currentUser
  );

  useEffect(() => {
    if (checkIfFriends(currentUser, user)) {
      setIsFriend(true);
    }
  }, [currentUser, user]);

  const handleAddFriend = async () => {
    // Write the code to add a friend
    setIsAdded(true);
  };

  const handleMakeAppointment = async () => {
    // Write the code to add a friend
    setIsAdded(true);
  };

  const handleRemoveFriend = async () => {
    // Write the code to Remove a friend
    // setIsFriend(false)
  };

  const handleCancelRequestFriend = async () => {
    // Write the code to Cancel Request sent to a friend
    // setAdded(false)
    setIsAdded(false);
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
            {!isAdded && !isFriend && (
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
            {isAdded && !isFriend && (
              <IconButton
                color="primary"
                aria-label="cancel-friend-request"
                component="label"
                onClick={handleCancelRequestFriend}
                sx={{
                  margin: 2,
                  backgroundColor: COLOR["H1d-ui-bg"],
                  color: COLOR["H1d-ui-primary"],
                  borderRadius: 3,
                }}
              >
                <HourglassBottomOutlined />
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
