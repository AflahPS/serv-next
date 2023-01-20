import React from "react";
import {
  DeleteOutlineOutlined,
  PermMediaOutlined,
  SendOutlined,
} from "@mui/icons-material";
import {
  Autocomplete,
  Avatar,
  Card,
  CardHeader,
  Divider,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  MenuItem,
  TextField,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import { COLOR, SIDE_NAV_LINKS } from "../constants";
import { TextFieldCustom2 } from "./TextFieldCustom2";
import { LinkButton } from "./LinkButton";
import Image from "next/image";

export const CreatePost = () => {
  return (
    <>
      <Card
        sx={{
          boxShadow: 8,
          borderRadius: 3,
          maxWidth: "80%",
          marginX: "auto",
          paddingBottom: 3,
          marginBottom: "16px",
          backgroundColor: COLOR["H1d-ui-bg"],
        }}
      >
        <CardHeader
          titleTypographyProps={{ textAlign: "center" }}
          title="Create Post"
        />
        <Divider variant="fullWidth" />
        <Stack
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-around"}
          alignItems={"center"}
          // width={"100%"}
          height={"35%"}
          paddingX={4}
          paddingY={2}
        >
          <Box flex={1} sx={{ display: { xs: "none", md: "block" } }}>
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
        <Stack>
          {/* <ImageList
            sx={{ minHeight: "162px", padding: 2 }}
            cols={4}
            rowHeight={125}
          >
            <ImageListItem>
              <Image
                src={`https://images.pexels.com/photos/14911739/pexels-photo-14911739.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`}
                alt=""
                loading="lazy"
                width={90}
                height={90}
                className="my-auto"
              />
              <ImageListItemBar
                sx={{ backgroundColor: "transparent" }}
                actionIcon={
                  <IconButton sx={{ color: "red" }}>
                    <DeleteOutlineOutlined />
                  </IconButton>
                }
              />
            </ImageListItem>
          </ImageList> */}
        </Stack>
        <Divider variant="middle" sx={{ color: COLOR["H1d-font-primary"] }} />
        <Box
          padding={3}
          // marginLeft={"auto"}
          // marginRight={5}
          display={"flex"}
          justifyContent={"center"}
          // alignItems={"center"}
        >
          <Autocomplete
            multiple
            limitTags={2}
            id="multiple-limit-tags"
            options={SIDE_NAV_LINKS}
            getOptionLabel={(option) => option.title}
            defaultValue={[]}
            renderInput={(params) => (
              <TextFieldCustom2
                {...params}
                variant="outlined"
                label="Tags"
                size="small"
                placeholder="Clients"
              />
            )}
            sx={{ width: { xs: "100%", md: "93%" } }}
          />
        </Box>
        <Stack sx={{ flexDirection: { xs: "column", md: "row" } }} paddingX={3}>
          <Stack
            sx={{ flexDirection: { xs: "column", md: "row" } }}
            gap={3}
            justifyContent={"space-around"}
            flex={1}
          >
            <LinkButton
              className="bg-H1d-ui-secondary "
              color="uiBgLight"
              variant="contained"
              startIcon={<PermMediaOutlined />}
            >
              Media
            </LinkButton>

            <TextFieldCustom2
              select
              label="Project"
              size="small"
              sx={{ minWidth: 98 }}
            >
              <MenuItem value={"painter"}>Painter</MenuItem>
              <MenuItem value={"driver"}>Driver</MenuItem>
              <MenuItem value={"masonry"}>Masonry</MenuItem>
            </TextFieldCustom2>
          </Stack>
          <Box
            flex={1}
            display={"flex"}
            justifyContent={"end"}
            marginRight={2}
            sx={{ marginY: { xs: 3, md: 0 } }}
          >
            <LinkButton
              // style={{ backgroundColor: COLOR["H1d-ui-secondary"] }}
              variant="contained"
              color="uiBgLight"
              className="bg-H1d-ui-secondary"
              endIcon={<SendOutlined />}
            >
              Post
            </LinkButton>
          </Box>
        </Stack>
      </Card>
    </>
  );
};
