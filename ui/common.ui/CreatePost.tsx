import React, { useState } from "react";
import {
  DeleteOutlineOutlined,
  PermMediaOutlined,
  SendOutlined,
} from "@mui/icons-material";
import {
  Alert,
  Autocomplete,
  Avatar,
  Button,
  Card,
  CardHeader,
  CircularProgress,
  Divider,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  MenuItem,
  Snackbar,
  Typography,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import Image from "next/image";
import { useSelector } from "react-redux";
import { nest, uploadImages } from "../../utils";
import { LinkButton, TextFieldCustom2 } from "..";
import { COLOR, USERS, PROJECTS } from "../../constants";
import { StoreState } from "../../store";

export const CreatePost: React.FC<{ extraSx?: {} }> = (props) => {
  const [tags, setTags] = useState([]);
  const [medias, setMedias] = useState<File[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string[]>([]);
  const [errMessage, setErrMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [caption, setCaption] = useState("");
  const [project, setProject] = useState("");

  const token = useSelector((state: StoreState) => state.jwt.token);
  const currentUser = useSelector((state: StoreState) => state.user.data);

  const [open, setOpen] = useState(false);
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleMediaSelected = async (
    event: React.FormEvent<HTMLInputElement>
  ) => {
    const target = event.target as HTMLInputElement;
    const filesInput = target.files;

    // If more than 4 files or no files
    if (medias.length >= 4) {
      return setErrMessage("Maximum of 4 images are allowed !");
    }
    if (filesInput?.length && filesInput?.length > 4) {
      setErrMessage("Please select a maximum of 4 files !");
      return;
    }
    if (!filesInput?.length) return;

    // Pushing files to medias array
    for (let i = 0; i < filesInput.length; i++) {
      if (!filesInput[i].type.startsWith("image")) {
        setErrMessage("We support images only for now !");
      }

      const tempUrl = URL.createObjectURL(filesInput[i]);
      setPreviewUrl((cur) => [tempUrl, ...cur]);
      setMedias((cur) => [filesInput[i], ...cur]);
    }
  };

  const handleRemoveSelected = (index: number) => {
    setMedias((cur) => {
      const latest = [...cur];
      latest.splice(index, 1);
      return latest;
    });

    setPreviewUrl((cur) => {
      const latest = [...cur];
      latest.splice(index, 1);
      return latest;
    });
  };

  const verifyData = async () => {
    try {
      setLoading(true);
      const uploadedUrls = await uploadImages(medias);
      const tagged = tags.map((tag: any) => tag._id);

      const captionInput = caption;
      if (captionInput.length < 2) {
        setErrMessage("Please write something about this post !");
        return false;
      }

      if (!project) {
        setErrMessage("Please select the project related to this post !");
        return false;
      }

      return {
        mediaType: "image",
        media: uploadedUrls,
        caption: captionInput,
        tagged,
        project,
      };
    } catch (error) {
      console.error(error);
    }
  };

  const handlePost = async () => {
    try {
      const data = await verifyData();
      if (!data) {
        setLoading(false);
        return;
      }
      const res = await nest({
        method: "POST",
        url: "post",
        data,
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      if (res.data?.status === "success") {
        setLoading(false);
        setOpen(true);
        setCaption("");
        setProject("");
        setTags([]);
        setMedias([]);
        setPreviewUrl([]);
        setErrMessage("");
      }
    } catch (err: any) {
      setLoading(false);
      setErrMessage(err.message || "Something went wrong !");
      console.error(err?.message);
    }
  };

  return (
    <>
      <Card
        onClick={() => {
          setErrMessage("");
        }}
        sx={{
          boxShadow: 8,
          borderRadius: 3,
          // maxWidth: "100%",
          // ...props.extraSx,
          width: "100%",
          marginX: "auto",
          paddingBottom: 1,
          marginBottom: "16px",
          backgroundColor: COLOR["H1d-ui-bg"],
        }}
      >
        <CardHeader
          titleTypographyProps={{
            textAlign: "center",
            fontSize: { xs: "16px", md: "20px", xl: "24px" },
          }}
          title="Create Post"
        />
        <Divider variant="fullWidth" />
        <Stack
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-around"}
          alignItems={"center"}
          width={"100%"}
          height={"35%"}
          paddingX={4}
          paddingY={{ xs: 1, md: 2 }}
        >
          <Box flex={1} sx={{ display: { xs: "none", md: "block" } }}>
            <Avatar
              src={currentUser.image}
              sx={{ width: 56, height: 56 }}
            ></Avatar>
          </Box>
          <Box flex={6}>
            <TextFieldCustom2
              value={caption}
              onChange={(e) => {
                setCaption(e.target.value);
              }}
              multiline
              maxRows={3}
              placeholder="Write something here..."
              fullWidth
            ></TextFieldCustom2>
          </Box>
        </Stack>
        <Stack>
          {previewUrl.length > 0 && (
            <ImageList
              sx={{ minHeight: "162px", padding: 2 }}
              cols={4}
              rowHeight={125}
            >
              {previewUrl.map((preview, ind) => (
                <ImageListItem key={preview}>
                  <Image
                    src={preview}
                    alt=""
                    // loading="lazy"

                    width={90}
                    height={90}
                    className="my-auto"
                  />
                  <ImageListItemBar
                    sx={{ backgroundColor: "transparent" }}
                    actionIcon={
                      <IconButton
                        onClick={() => {
                          handleRemoveSelected(ind);
                        }}
                        sx={{ color: "red" }}
                      >
                        <DeleteOutlineOutlined />
                      </IconButton>
                    }
                  />
                </ImageListItem>
              ))}
            </ImageList>
          )}
        </Stack>
        <Divider variant="middle" sx={{ color: COLOR["H1d-font-primary"] }} />
        <Box
          paddingY={{ xs: 1, sm: 2, md: 3 }}
          paddingX={3}
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
            value={tags}
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
            gap={{ xs: 1, md: 2 }}
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
              value={project}
              onChange={(e) => {
                setProject(e.target.value);
              }}
              select
              defaultValue={""}
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
            sx={{ marginY: { xs: 1, md: 0 } }}
          >
            <LinkButton
              // style={{ backgroundColor: COLOR["H1d-ui-secondary"] }}
              variant="contained"
              color="uiBgLight"
              className="bg-H1d-ui-secondary"
              endIcon={
                loading ? (
                  <CircularProgress color="inherit" size={18} />
                ) : (
                  <SendOutlined />
                )
              }
              onClick={handlePost}
            >
              Post
            </LinkButton>
          </Box>
        </Stack>
        {errMessage && (
          <Typography
            color={"red"}
            marginTop={{ xs: 1, md: 2 }}
            textAlign={"center"}
            variant="body2"
          >
            {errMessage}
          </Typography>
        )}
      </Card>
    </>
  );
};
