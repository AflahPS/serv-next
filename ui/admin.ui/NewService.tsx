import {
  AddCircleOutlineOutlined,
  CreateOutlined,
  DeleteOutlineOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  ImageListItem,
  ImageListItemBar,
  TextFieldProps,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { Stack } from "@mui/system";
import React, { useRef, useState } from "react";
import { COLOR } from "../../constants";
import { TextFieldCustom2 } from "../common.ui";
import { useDispatch, useSelector } from "react-redux";
import { notifierActions } from "../../store/notifier.slice";
import { lengthChecker, uploadImages } from "../../utils";
import { createService } from "../../APIs";
import { StoreState } from "../../store/store";
import { useRouter } from "next/router";
import { Service } from "../../types";

interface Props {
  setServices: React.Dispatch<React.SetStateAction<Service[]>>;
}

export const NewService = (props: Props) => {
  const { setServices } = props;

  const dispatch = useDispatch();
  const router = useRouter();
  const titleRef = useRef<TextFieldProps>(null);
  const captionRef = useRef<TextFieldProps>(null);

  const [openModal, setOpenModal] = useState(false);
  const [isImageUploading, setIsImageUploading] = useState(false);

  const [imagePreview, setImagePreview] = useState(`/upload-placeholder.webp`);

  const token = useSelector((state: StoreState) => state.jwt.token);

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleNewClick = () => {
    setOpenModal(true);
  };

  const handleMediaSelected = async (
    event: React.FormEvent<HTMLInputElement>
  ) => {
    try {
      const target = event.target as HTMLInputElement;
      const filesInput = target.files;

      if (!filesInput?.length) return;
      if (!filesInput[0].type.startsWith("image")) {
        dispatch(notifierActions.error("Please select an image file !"));
        return;
      }
      setIsImageUploading(true);
      const uploadedUrl = await uploadImages([filesInput[0]]);
      const newImage = String(uploadedUrl[0]);
      if (!newImage) {
        dispatch(
          notifierActions.error("Something went wrong while uploading image !")
        );
        return;
      }
      setImagePreview(newImage);
      setIsImageUploading(false);
      return;
    } catch (err: any) {
      setIsImageUploading(false);
      dispatch(notifierActions.somethingWentWrong());
      console.error(err?.message);
    }
  };

  const verifyData = () => {
    // Verify data

    const image = imagePreview;
    const title: string = titleRef.current?.value as string;
    const caption: string = captionRef.current?.value as string;

    const isTitle = lengthChecker(title as string, 2, 50);
    const isCaption = lengthChecker(caption as string, 2, 350);
    const isImage = image !== `/upload-placeholder.webp`;

    if (!isTitle || !isCaption || !isImage) return false;

    return { image, title, caption };
  };

  const handleAddService = async () => {
    try {
      const dataV = verifyData();
      if (!dataV) {
        return dispatch(notifierActions.error(`Invalid data provided !`));
      }
      const addedServiceData = await createService(dataV, token);
      if (addedServiceData) {
        setServices((prev) => [...prev, addedServiceData?.service]);
        handleClose();
        router.push("/admin/services");
      }
    } catch (err) {
      console.error(err);
      dispatch(notifierActions.somethingWentWrong());
    }
  };

  return (
    <>
      <Box
        width={"100%"}
        marginBottom={2}
        display={"flex"}
        justifyContent={"center"}
      >
        <Button variant="outlined" onClick={handleNewClick}>
          <Typography variant="button" fontSize={16}>
            <Stack direction={"row"} gap={1}>
              {`Create New Service`}
              <AddCircleOutlineOutlined />
            </Stack>
          </Typography>
        </Button>
      </Box>

      <Dialog
        color={COLOR["H1d-font-primary"]}
        open={openModal}
        fullWidth
        onClose={handleClose}
        PaperProps={{
          sx: {
            paddingX: "12px",
            background:
              "linear-gradient(180deg, rgba(10,113,115,1) 0%, rgba(0,0,1,1) 25%)",
          },
        }}
      >
        <DialogTitle>Create New Service</DialogTitle>
        <DialogContent>
          <Stack gap={2}>
            <Box
              display={`flex`}
              justifyContent={`center`}
              alignItems={"center"}
            >
              <ImageListItem>
                <Image
                  src={imagePreview}
                  alt="Service Thumbail"
                  width={150}
                  height={150}
                />
                <ImageListItemBar
                  sx={{ backgroundColor: "transparent" }}
                  actionIcon={
                    <IconButton
                      component="label"
                      sx={{ color: "rgba(10,113,115,1)", margin: "3px" }}
                    >
                      <input
                        accept="image/*"
                        type="file"
                        hidden
                        aria-hidden
                        onChange={(e) => {
                          handleMediaSelected(e);
                        }}
                      />
                      {isImageUploading ? (
                        <CircularProgress />
                      ) : (
                        <CreateOutlined />
                      )}
                    </IconButton>
                  }
                />
              </ImageListItem>
            </Box>
            <TextFieldCustom2
              fullWidth
              size="small"
              label="Service Title"
              variant="outlined"
              inputRef={titleRef}
            ></TextFieldCustom2>
            <TextFieldCustom2
              inputRef={captionRef}
              fullWidth
              rows={4}
              label="Service Caption"
              variant="outlined"
            ></TextFieldCustom2>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddService}>Add</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
