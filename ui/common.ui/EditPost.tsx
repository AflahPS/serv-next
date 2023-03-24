import React, { useState } from "react";
import { CancelOutlined, SendOutlined } from "@mui/icons-material";
import {
  Autocomplete,
  Avatar,
  Card,
  CardHeader,
  CircularProgress,
  Divider,
  ImageList,
  ImageListItem,
  MenuItem,
  Typography,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { nest, uploadImages } from "../../utils";
import { LinkButton, TextFieldCustom2 } from "..";
import { COLOR, PROJECTS, USERS } from "../../constants";
import { Post } from "../../types";
import { useStore } from "../../customHooks";
import { notifierActions } from "../../store";
import { editPost } from "../../APIs";

interface Props {
  extraSx?: {};
  post: Post;
  setIsEditable: (input: boolean) => void;
}

export const EditPost: React.FC<Props> = (props) => {
  const { extraSx, post, setIsEditable } = props;
  const dispatch = useDispatch();

  const [tags, setTags] = useState([]);
  const [medias, setMedias] = useState<(File | string)[]>(post.media || []);
  const [previewUrl, setPreviewUrl] = useState<string[]>(post.media || []);
  const [errMessage, setErrMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [caption, setCaption] = useState(post.caption || "");
  const [project, setProject] = useState(post.project || "");

  const { token } = useStore();

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
        _id: post._id,
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

  const clearFields = () => {
    setCaption("");
    setProject("");
    setTags([]);
    setMedias([]);
    setPreviewUrl([]);
    setErrMessage("");
  };

  const handlePost = async () => {
    try {
      const dataV = await verifyData();
      if (!dataV) {
        setLoading(false);
        return;
      }

      const data = await editPost(dataV, token);
      if (data) {
        setLoading(false);
        dispatch(notifierActions.success(`Successfully updated !`));
        clearFields();
        setIsEditable(false);
      }
    } catch (err: any) {
      setLoading(false);
      setErrMessage("Something went wrong !");
      console.error(err);
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
          marginX: "auto",
          paddingBottom: 3,
          marginBottom: "16px",
          backgroundColor: COLOR["H1d-ui-bg"],
          ...extraSx,
        }}
      >
        <CardHeader
          titleTypographyProps={{ textAlign: "center" }}
          title="Edit Post"
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
              value={caption}
              onChange={(e) => {
                setCaption(e.target.value);
              }}
              multiline
              maxRows={5}
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
                    width={90}
                    height={90}
                    className="my-auto"
                  />
                </ImageListItem>
              ))}
            </ImageList>
          )}
        </Stack>
        <Divider variant="middle" sx={{ color: COLOR["H1d-font-primary"] }} />
        <Box padding={3} display={"flex"} justifyContent={"center"}>
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
            paddingX={3}
            // justifyContent={"start"}
            flex={1}
          >
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
            gap={2}
            paddingX={3}
            sx={{ marginY: { xs: 3, md: 0 } }}
          >
            <LinkButton
              // style={{ backgroundColor: COLOR["H1d-ui-secondary"] }}
              variant="contained"
              color="uiBgLight"
              className="bg-H1d-ui-secondary"
              endIcon={<CancelOutlined />}
              onClick={() => {
                setIsEditable(false);
              }}
            >
              Cancel
            </LinkButton>
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
              Update
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
