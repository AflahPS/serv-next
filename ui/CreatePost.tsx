import React, { useRef, useState } from "react";
import {
  ContentPaste,
  DeleteOutlineOutlined,
  PermMediaOutlined,
  PhotoCamera,
  SendOutlined,
} from "@mui/icons-material";
import {
  Autocomplete,
  Avatar,
  Button,
  Card,
  CardHeader,
  Divider,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  ListItemIcon,
  ListItemText,
  MenuItem,
  TextField,
  TextFieldProps,
  Typography,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import { COLOR, PROJECTS, SIDE_NAV_LINKS, USERS } from "../constants";
import { TextFieldCustom2 } from "./TextFieldCustom2";
import { LinkButton } from "./LinkButton";
import Image from "next/image";

export const CreatePost = () => {
  const [tags, setTags] = useState([]);
  const [medias, setMedias] = useState([]);
  const [errMessage, setErrMessage] = useState("");

  const captionRef = useRef<TextFieldProps>();
  const projectRef = useRef<TextFieldProps>();

  const handleMediaSelected = (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const files = target.files;
    console.log(files);
    if (files?.length && files?.length > 4) {
      setErrMessage("Please select a maximum of 4 files !");
      return;
    }
    // const uploadedFiles = upload(files);
    // setMedias(uploadedFiles)
  };

  const verifyData = () => {
    const captionRefInput = captionRef.current?.value;
    const projectInput = projectRef.current?.value;

    console.log({
      captionRefInput,
      projectInput,
      tags,
    });
  };

  const handlePost = async () => {
    verifyData();
  };

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
              inputRef={captionRef}
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
            onChange={(event: any, value: any) => {
              setTags(value);
            }}
            limitTags={2}
            id="multiple-limit-tags"
            options={USERS}
            getOptionLabel={(option) => option.name}
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
            <Button
              className="bg-H1d-ui-secondary "
              color="uiBgLight"
              variant="contained"
              component="label"
              startIcon={<PermMediaOutlined />}
              sx={{ color: COLOR["H1d-font-primary"] }}
            >
              Media
              <input
                accept="image/*"
                hidden
                multiple
                type="file"
                onChange={handleMediaSelected}
              />
            </Button>

            <TextFieldCustom2
              inputRef={projectRef}
              select
              label="Project"
              size="small"
              sx={{ minWidth: 98 }}
            >
              {PROJECTS.map((project) => (
                <MenuItem key={project._id} value={project._id}>
                  {project.title}
                </MenuItem>
              ))}
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
              onClick={handlePost}
            >
              Post
            </LinkButton>
          </Box>
        </Stack>
        <Typography
          color={"red"}
          marginTop={2}
          textAlign={"center"}
          variant="body2"
        >
          {errMessage}
        </Typography>
      </Card>
    </>
  );
};
