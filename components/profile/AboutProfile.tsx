import { Box, Stack } from "@mui/system";
import React from "react";
import { StatStack } from "../../ui";
import { Button, Typography } from "@mui/material";
import { COLOR } from "../../constants";
import { User } from "../../types";
import { useRouter } from "next/router";

interface Props {
  user: User;
  isProfileOwner: boolean;
}

export const AboutProfile: React.FC<Props> = ({ user, isProfileOwner }) => {
  const router = useRouter();

  return (
    <Stack
      sx={{
        backgroundColor: "black",
        boxShadow: 8,
        borderRadius: 3,
        marginY: 1,
      }}
    >
      {user.role === "user" && isProfileOwner && (
        <Button
          variant="outlined"
          sx={{ borderRadius: 3 }}
          onClick={() => {
            router.push("/auth/signup/vendor");
          }}
        >
          Sign-up To Be A Vendor
        </Button>
      )}
      {user.role === "user" && !isProfileOwner && <></>}
      {user.role === "vendor" && (
        <>
          <Box padding={2}>
            <Typography
              align="center"
              fontWeight={300}
              variant="body1"
              color={COLOR["H1d-font-primary"]}
            >
              {user.vendor?.about || ""}
            </Typography>
          </Box>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            paddingX={2}
            paddingY={1}
          >
            <StatStack
              name="Service"
              stat={user?.vendor?.service?.title || "-"}
            />
            <StatStack
              name="Projects"
              stat={
                (user?.vendor?.projects &&
                  user?.vendor?.projects.length.toString()) ||
                "0"
              }
            />
            <StatStack name="Location" stat={user?.place} />
          </Stack>
        </>
      )}
    </Stack>
  );
};
