import React from "react";
import { CreateOutlined } from "@mui/icons-material";
import { Avatar, IconButton, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { COLOR } from "../../constants";
import { StatStack } from "../../ui";

export const ProfileHeader = () => {
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
          src="https://images.pexels.com/photos/2709718/pexels-photo-2709718.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        >
          Dhamodar
        </Avatar>
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
            Dhamodar
          </Typography>
          <div></div>
        </Stack>
        <Box display={"flex"} gap={1} marginRight={2}>
          <StatStack name="Posts" stat="65" />
          <StatStack name="Follwers" stat="165" />
          <StatStack name="Following" stat="105" />
        </Box>
      </Box>
    </Stack>
  );
};
