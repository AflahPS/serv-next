import React from "react";
import { PermMediaOutlined } from "@mui/icons-material";
import { Avatar, Card, CardHeader, Divider } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { COLOR } from "../constants";
import { TextFieldCustom2 } from "./TextFieldCustom2";
import { LinkButton } from "./LinkButton";

export const CreatePost: React.FC<{ customSx?: {} }> = (props) => {
  return (
    <>
      <Card
        sx={{
          boxShadow: 8,
          borderRadius: 3,
          maxWidth: "80%",
          marginX: "auto",
          marginBottom: "16px",
          ...props.customSx,
          backgroundColor: "black",
        }}
      >
        <CardHeader title="Create Post" />
        <Divider variant="fullWidth" />
        <Stack
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-around"}
          alignItems={"center"}
          width={"100%"}
          height={"35%"}
          paddingX={4}
          paddingY={2}
        >
          <Box flex={1}>
            <Avatar sx={{ width: 56, height: 56 }}></Avatar>
          </Box>
          <Box flex={6}>
            <TextFieldCustom2
              multiline
              maxRows={3}
              placeholder="Write something here..."
              fullWidth
            ></TextFieldCustom2>
          </Box>
        </Stack>
        <Divider variant="middle" sx={{ color: COLOR["H1d-font-primary"] }} />
        <Stack direction={"row"} padding={3}>
          <Stack direction={"row"} justifyContent={"space-around"} flex={2}>
            <LinkButton
              color="uiPrimary"
              variant="outlined"
              startIcon={<PermMediaOutlined />}
            >
              Media
            </LinkButton>
            <LinkButton color="uiPrimary" variant="outlined">
              Tags
            </LinkButton>
            <LinkButton color="uiPrimary" variant="outlined">
              Project
            </LinkButton>
          </Stack>
          <Box flex={1} display={"flex"} justifyContent={"end"}>
            <LinkButton
              // style={{ backgroundColor: COLOR["H1d-ui-secondary"] }}
              variant="contained"
              color="uiSecondary"
            >
              Post
            </LinkButton>
          </Box>
        </Stack>
      </Card>
    </>
  );
};
