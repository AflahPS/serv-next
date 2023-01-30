import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import {
  Alert,
  Avatar,
  Badge,
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Snackbar,
  Stack,
  TextFieldProps,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { COLOR } from "../../constants";
import { LinkButton } from "../common";
import { TabHeader } from "./TabHeader";
import { StyledTextField } from "./StyledTextField";
import {
  CreateOutlined,
  LocationOnOutlined,
  SaveAltOutlined,
} from "@mui/icons-material";
import {
  fbPhoneAuth,
  geoCords,
  geoLocator,
  lengthChecker,
  nest,
  uploadImages,
  validateEmail,
  validatePhone,
} from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../../store";
import { userDataActions } from "../../store/user-data.slice";
import { Vendor } from "../../types";

export const PersonalDetails: React.FC<{
  user: Vendor;
  isProfileOwner: boolean;
}> = ({ user, isProfileOwner }) => {
  const dispatch = useDispatch();
  // const user = useSelector((state: StoreState) => state.user.data);
  const token = useSelector((state: StoreState) => state.jwt.token);
  const role = user.role;

  const [isDpUploading, setIsDpUploading] = useState(false);
  const [isEditable, setIsEditable] = useState(false);

  const nameRef = useRef<TextFieldProps>(null);
  const emailRef = useRef<TextFieldProps>(null);
  const phoneRef = useRef<TextFieldProps>(null);
  const locationRef = useRef<TextFieldProps>(null);

  const [nameVerified, setNameVerified] = useState(true);
  const [emailVerified, setEmailVerified] = useState(true);
  const [phoneVerified, setPhoneVerified] = useState(true);
  const [locationVerified, setLocationVerified] = useState(true);

  const [place, setPlace] = useState(user.place || "");
  const [phone, setPhone] = useState(user.phone || "");
  const [otp, setOtp] = useState("");
  const [sendOtpButton, setSendOtpButton] = useState(false);
  const [verifyOtpButton, setVerifyOtpButton] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [showOtpField, setShowOtpField] = useState(false);
  const [location, setLocation] = useState(
    user.location || {
      type: "Point",
      coordinates: [0, 0],
    }
  );

  //----- ERROR, Success message Snackbar related properties
  const [errMessage, setErrMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [openError, setOpenError] = React.useState(false);
  const [openSuccess, setOpenSuccess] = React.useState(false);

  const handleCloseError = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenError(false);
  };

  const handleCloseSuccess = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccess(false);
  };

  const errorSetter = (message: string) => {
    setErrMessage(message);
    setOpenError(true);
  };

  //----- Profile Image updator function
  const handleMediaSelected = async (
    event: React.FormEvent<HTMLInputElement>
  ) => {
    try {
      const target = event.target as HTMLInputElement;
      const filesInput = target.files;

      if (!filesInput?.length) return;
      if (!filesInput[0].type.startsWith("image")) {
        setErrMessage("Please select an image file !");
        setOpenError(true);
        return;
      }
      setIsDpUploading(true);
      const uploadedUrl = await uploadImages([filesInput[0]]);
      const newDp = String(uploadedUrl[0]);
      if (!newDp) {
        errorSetter("Something went wrong while uploading image !");
        return;
      }
      const { data } = await nest({
        method: "PATCH",
        url: `/user/image`,
        data: { image: newDp },
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      if (!data || data?.status !== "success") {
        errorSetter("Something went wrong while updating profile image !");
        return;
      }
      dispatch(userDataActions.addUserData(data?.user));
      setIsDpUploading(false);
      setSuccessMessage("Successfully uploaded profile image !");
      setOpenSuccess(true);
      return;
    } catch (err: any) {
      setIsDpUploading(false);
      setErrMessage("Something went wrong !");
      setOpenError(true);
      console.log(err?.message);
    }
  };

  //----- Phone verification with OTP

  // Generate recaptcha
  const genRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "verify-otp",
      {
        size: "invisible",
        callback: (response: any) => {},
      },
      fbPhoneAuth
    );
  };

  // Send OTP to mobile
  const sendOtp = (num: string) => {
    try {
      genRecaptcha();
      const phoneNum = `+91${num}`;
      console.log({ phoneNum });

      const appVerifier = window.recaptchaVerifier;
      console.log({ appVerifier });
      signInWithPhoneNumber(fbPhoneAuth, phoneNum, appVerifier).then((res) => {
        console.log({ res });

        window.confirmationResult = res;
      });
    } catch (err) {
      console.log(123);
      console.log(err);
    }
  };

  // Enable SEND OTP Button
  useEffect(() => {
    const isPhoneLegit = validatePhone(phone);
    setSendOtpButton(isPhoneLegit);
    if (!isPhoneLegit) setShowOtpField(false);
  }, [phone]);

  // Enable SEND OTP Button
  useEffect(() => {
    const isOtpLegit = lengthChecker(otp, 6, 6);
    setVerifyOtpButton(isOtpLegit);
  }, [otp]);

  // handle 'Send OTP' button click
  const handleOtpButton = (event: any) => {
    setShowOtpField(true);
    sendOtp(phone);
  };

  // Handle 'Verify OTP' button click
  const handleVerifyButton = async (event: any) => {
    try {
      let confirmationResult = window.confirmationResult;
      const confObj = await confirmationResult?.confirm(otp);
      if (confObj?.user) {
        console.log("Verified");
        setShowOtpField(false);
        setOtpVerified(true);
      }
    } catch (err: any) {
      setOtpVerified(false);
      console.log(err?.message);
    }
  };

  // ---- Location finder using MAPBOX

  // Get the coordinates of the location
  const getLocation = async () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      if (position)
        setLocation({
          type: "Point",
          coordinates: [position.coords.longitude, position.coords.latitude],
        });
    });
    const loc: any = await geoLocator(
      location.coordinates[0],
      location.coordinates[1]
    );
    if (!loc) return setLocationVerified(false);
    setPlace(loc);
    setLocationVerified(true);
  };

  // Get location if user typed a location
  const gatherPLace = async (place: string) => {
    const cords = await geoCords(place);
    if (!cords) {
      setLocationVerified(false);
      return console.log("Coordinates not found");
    }
    if (cords)
      setLocation({ type: "Point", coordinates: [cords[0], cords[1]] });
  };

  // Verify all data before API call

  const verifiyData = () => {
    const nameInput = nameRef.current?.value;
    const emailInput = emailRef.current?.value;
    const phone = phoneRef.current?.value;

    const name = String(nameInput).trim();
    const email = String(emailInput).trim();

    const isName = lengthChecker(name, 2, 50);
    const isEmail = validateEmail(email);
    const isLocation = Boolean(location.coordinates[0]);
    const isPhone = otpVerified || phone === user.phone;

    if (!isName) {
      setNameVerified(false);
      return false;
    }
    setNameVerified(true);
    if (!isEmail) {
      setEmailVerified(false);
      return false;
    }
    setEmailVerified(true);
    if (!isPhone) {
      setPhoneVerified(false);
      return false;
    }
    setPhoneVerified(true);
    if (!isLocation) {
      setLocationVerified(false);
      return false;
    }
    setLocationVerified(true);

    return {
      name,
      email,
      phone,
      location,
      place,
    };
  };

  const handleSaveClick = async () => {
    try {
      if (!isEditable) {
        setIsEditable(true);
        return;
      }
      const dataV = verifiyData();

      if (!dataV) return;
      const { data } = await nest({
        method: "PATCH",
        url: `/user/personal`,
        data: dataV,
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      if (!data || data?.status !== "success") {
        errorSetter("Something went wrong while updating profile image !");
        return;
      }
      dispatch(userDataActions.addUserData(data?.user));
      setSuccessMessage("Successfully updated personal informations !");
      setOpenSuccess(true);
      setIsEditable(false);
    } catch (err: any) {
      errorSetter(
        "Something went wrong while updating profile personal informations !"
      );
      console.log(err?.message);
    }
  };

  return (
    <>
      <TabHeader header="Personal Details" />
      <Box
        bgcolor={COLOR["H1d-ui-bg"]}
        display={"flex"}
        flexDirection={"column"}
        borderRadius={3}
        marginY={2}
      >
        {/* ---Avatar------ */}
        <Stack alignItems={"center"} marginY={2} gap={2}>
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent={
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="label"
                sx={{
                  backgroundColor: COLOR["H1d-ui-secondary"],
                }}
              >
                <input
                  hidden
                  accept="image/*"
                  onChange={handleMediaSelected}
                  type="file"
                />
                {isDpUploading ? <CircularProgress /> : <CreateOutlined />}
              </IconButton>
            }
          >
            <Avatar sx={{ height: 124, width: 124 }} src={user?.image || ""}>
              {user.name || "Username"}
            </Avatar>
          </Badge>
          <Typography
            variant="h6"
            fontWeight={400}
            color={COLOR["H1d-font-primary"]}
          >
            {user.name || "Username"}
          </Typography>
        </Stack>

        {/* ------TextFields------- */}
        <Box
          borderRadius={3}
          bgcolor={COLOR["H1d-ui-bg"]}
          display={"flex"}
          flexDirection={"column"}
          // alignItems={"center"}
          paddingX={6}
          paddingY={2}
        >
          {/* NAME */}

          <StyledTextField
            type={"text"}
            inputRef={nameRef}
            size="small"
            label="Full Name"
            error={!nameVerified}
            defaultValue={user.name}
            disabled={!isEditable}
            helperText={
              !nameVerified ? "Provide a valid name (Min: 2, Max: 50) !" : ""
            }
            onChange={() => {
              setNameVerified(true);
            }}
          />

          {/* EMAIL */}

          <StyledTextField
            type={"email"}
            inputRef={emailRef}
            size="small"
            label="Email"
            disabled={!isEditable}
            defaultValue={user.email}
            error={!emailVerified}
            helperText={!emailVerified ? "Provide a valid email !" : ""}
            onChange={() => {
              setEmailVerified(true);
            }}
          />

          {/* PHONE */}
          <StyledTextField
            inputRef={phoneRef}
            size="small"
            label="Phone"
            disabled={!isEditable}
            error={!phoneVerified}
            helperText={!phoneVerified ? "Verify the number with OTP" : ""}
            value={phone}
            defaultValue={user.phone}
            onChange={(e) => {
              setPhone(e.target?.value);
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Box borderRadius={1} marginY={0} textAlign={"center"}>
                    <Typography variant="body1">+91</Typography>
                  </Box>
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <Button disabled={!sendOtpButton} onClick={handleOtpButton}>
                    Send OTP
                  </Button>
                </InputAdornment>
              ),
            }}
          />

          {/* OTP-FIELD */}
          {showOtpField && (
            <>
              <StyledTextField
                label="OTP"
                size="small"
                value={otp}
                onChange={(e) => {
                  setOtp(e.target.value);
                }}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        disabled={!verifyOtpButton}
                        onClick={handleVerifyButton}
                      >
                        Verify OTP
                      </Button>
                    </InputAdornment>
                  ),
                }}
              />
            </>
          )}

          {/* LOCATION */}
          <StyledTextField
            inputRef={locationRef}
            size="small"
            label="Location"
            disabled={!isEditable}
            error={!locationVerified}
            // defaultValue={user.place}
            helperText={
              !locationVerified
                ? "Sorry, Couldn't locate you. Try the pin icon after 10 seconds or type your location properly."
                : ""
            }
            onChange={(e: any) => {
              setLocationVerified(true);
              setPlace(e?.target?.value);
            }}
            onBlur={() => {
              gatherPLace(place);
            }}
            value={place}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton disabled={!isEditable} onClick={getLocation}>
                    <LocationOnOutlined />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {isProfileOwner && (
            <LinkButton
              variant="outlined"
              onClick={handleSaveClick}
              sx={{ alignSelf: "end", paddingX: 3, marginY: 2, marginRight: 1 }}
              startIcon={isEditable ? <SaveAltOutlined /> : <CreateOutlined />}
            >
              {isEditable ? "Save" : "Edit"}
            </LinkButton>
          )}
        </Box>
      </Box>
      <Snackbar
        open={openError}
        autoHideDuration={6000}
        onClose={handleCloseError}
      >
        <Alert
          onClose={handleCloseError}
          severity="error"
          sx={{ width: "100%" }}
        >
          {errMessage}
        </Alert>
      </Snackbar>
      <Snackbar
        open={openSuccess}
        autoHideDuration={6000}
        onClose={handleCloseSuccess}
      >
        <Alert
          onClose={handleCloseSuccess}
          severity="success"
          sx={{ width: "100%" }}
        >
          {successMessage}
        </Alert>
      </Snackbar>
      {/* -------Recaptcha Div-------- */}
      <div id="verify-otp"></div>
    </>
  );
};
