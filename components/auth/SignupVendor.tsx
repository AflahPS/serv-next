import {
  Alert,
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  MenuItem,
  Snackbar,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import React, { MouseEvent, useEffect, useRef, useState } from "react";
import {
  AuthHeading,
  LinkButton,
  TextFieldCustom2,
  LabelCustom,
} from "../../ui";
import { ChevronRightOutlined, LocationOnOutlined } from "@mui/icons-material";
import Link from "next/link";
import { fbPhoneAuth, geoCords, geoLocator, nest } from "../../utils";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

export const SignupVendor = () => {
  const serviceRef = useRef<HTMLInputElement>();
  const locationRef = useRef<HTMLInputElement>();
  const phoneRef = useRef<HTMLInputElement>();
  const aboutRef = useRef<HTMLInputElement>();

  const [serviceVerified, setServiceVerified] = useState(true);
  const [locationVerified, setLocationVerified] = useState(true);
  const [phoneVerified, setPhoneVerified] = useState(true);
  const [aboutVerified, setAboutVerified] = useState(true);

  const [place, setPlace] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [sendOtpButton, setSendOtpButton] = useState(false);
  const [verifyOtpButton, setVerifyOtpButton] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [showOtpField, setShowOtpField] = useState(false);
  const [location, setLocation] = useState({ lat: 0, lon: 0 });

  const [errMessage, setErrMessage] = useState("");

  const token = useSelector((state: any) => state.jwt.token);
  const router = useRouter();

  const [open, setOpen] = React.useState(false);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  // Check if the entered number is valid
  const validatePhone = (num: string) => {
    let isOnlyNum = /^\d+$/.test(num);
    let isLengthTen = num.length === 10;
    return isOnlyNum && isLengthTen;
  };

  // Check if the entered OTP is valid
  const validateOtp = (num: string) => num.length === 6;

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
      const appVerifier = window.recaptchaVerifier;
      signInWithPhoneNumber(fbPhoneAuth, phoneNum, appVerifier).then((res) => {
        window.confirmationResult = res;
      });
    } catch (err) {
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
    const isOtpLegit = validateOtp(otp);
    setVerifyOtpButton(isOtpLegit);
  }, [otp]);

  // Get the coordinates of the location
  const getLocation = async () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      if (position)
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
    });
    const loc: any = await geoLocator(location.lat, location.lon);
    if (!loc) return setLocationVerified(false);
    setPlace(loc);
    setLocationVerified(true);
  };

  // Get location if user typed a location
  const gatherPLace = async (place: string) => {
    const cords = await geoCords(place);
    if (!cords) return console.log("Coordinates not found");
    if (cords) setLocation({ lat: cords[0], lon: cords[1] });
  };

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

  // Verify and validate data before sending to the server
  const verifyBeforeSignup = () => {
    const service = serviceRef.current?.value;
    const phone = phoneRef.current?.value;
    const about = aboutRef.current?.value;

    const isService = Boolean(service);
    const isLocation = Boolean(location.lat);
    const isPhone = otpVerified;
    const isAbout = Boolean(about);

    if (!isService) {
      setServiceVerified(false);
      return false;
    }
    setServiceVerified(true);
    if (!isLocation) {
      setLocationVerified(false);
      return false;
    }
    setLocationVerified(true);
    if (!isPhone) {
      setPhoneVerified(false);
      return false;
    }
    setPhoneVerified(true);
    if (!isAbout) {
      setAboutVerified(false);
      return false;
    }
    setAboutVerified(true);

    return {
      service,
      location,
      phone,
      about,
    };
  };

  // handle the 'Sign Up' button
  const handleSignupClick = async (e: MouseEvent) => {
    e.preventDefault();
    const verified = verifyBeforeSignup();
    if (!verified) return;
    try {
      console.log(token);

      const res = await nest({
        url: "/auth/signup/vendor",
        method: "POST",
        data: verified,
        headers: {
          authorization: "Bearer " + token,
        },
      });
      if (res.data?.status === "success") {
        setOpen(true);
        router.push("/");
      }
    } catch (error: any) {
      if (error?.response) {
        let errorResponeMessage = "";
        if (Array.isArray(error?.response?.data?.message)) {
          errorResponeMessage = error?.response?.data?.message[0];
        } else {
          errorResponeMessage = error?.response?.data?.message;
        }
        setErrMessage(errorResponeMessage);
        return console.log({ errMessage: error?.response?.data?.message });
      }
      setErrMessage("Something went wrong ! Please try again.");
    }
  };

  return (
    <>
      <Box
        // flex={2}
        sx={{ flex: { xs: 1, md: 2 } }}
        bgcolor="black"
        height={"100vh"}
        minWidth={"34%"}
      >
        <Stack height={"100%"} paddingY={3} paddingX={5}>
          <AuthHeading main="Sign Up As Vendor" />
          <Box
            display={"flex"}
            height={"100%"}
            justifyContent="space-between"
            flexDirection="column"
          >
            <Box
              flex={3}
              display="flex"
              flexDirection={"column"}
              alignItems="center"
              justifyContent="center"
              gap={1}
              width={"100%"}
            >
              {/* -------Service--------- */}
              <LabelCustom variant="h6">
                Service Category/Profession
              </LabelCustom>
              <TextFieldCustom2
                select
                inputRef={serviceRef}
                size="small"
                error={!serviceVerified}
                helperText={!serviceVerified ? "Please select a service" : ""}
                defaultValue={""}
                fullWidth
              >
                <MenuItem value={"painter"}>Painter</MenuItem>
                <MenuItem value={"driver"}>Driver</MenuItem>
                <MenuItem value={"masonry"}>Masonry</MenuItem>
              </TextFieldCustom2>

              {/* --------Location----------- */}

              <LabelCustom variant="h6">Location</LabelCustom>
              <TextFieldCustom2
                inputRef={locationRef}
                size="small"
                fullWidth
                error={!locationVerified}
                helperText={!locationVerified ? "Try again" : ""}
                onChange={(e: any) => {
                  setPlace(e?.target?.value);
                }}
                onBlur={() => {
                  gatherPLace(place);
                }}
                value={place}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={getLocation}>
                        <LocationOnOutlined />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {/* --------Phone----------- */}

              <LabelCustom variant="h6">Phone</LabelCustom>
              <TextFieldCustom2
                inputRef={phoneRef}
                size="small"
                fullWidth
                error={!phoneVerified}
                helperText={!phoneVerified ? "Verify the number with OTP" : ""}
                value={phone}
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
                      <Button
                        disabled={!sendOtpButton}
                        onClick={handleOtpButton}
                      >
                        Send OTP
                      </Button>
                    </InputAdornment>
                  ),
                }}
              />

              {showOtpField && (
                <>
                  <LabelCustom variant="h6">OTP</LabelCustom>
                  <TextFieldCustom2
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

              {/* --------About----------- */}

              <LabelCustom variant="h6">About Me</LabelCustom>
              <TextFieldCustom2
                inputRef={aboutRef}
                error={!aboutVerified}
                helperText={
                  !aboutVerified ? "Please provide something about you !" : ""
                }
                size="small"
                fullWidth
                multiline
                rows={2}
              />

              {/* ---------SIGNUP BUTTON-----  */}
              <LinkButton
                variant="outlined"
                onClick={handleSignupClick}
                sx={{
                  marginLeft: "auto",
                  marginRight: "12px",
                  marginY: "12px",
                }}
              >
                Sign Up
              </LinkButton>
            </Box>
            <Typography
              color={"red"}
              marginBottom={2}
              textAlign={"center"}
              variant="body2"
            >
              {errMessage}
            </Typography>
            <Divider color="grey" />
            <Box
              flex={1}
              marginY={1}
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"center"}
              width={"100%"}
            >
              <LinkButton variant="outlined" endIcon={<ChevronRightOutlined />}>
                <Link href={"/"}>Continue as user</Link>
              </LinkButton>
            </Box>
          </Box>
        </Stack>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Successfully signed up !
          </Alert>
        </Snackbar>
      </Box>
      {/* -------Recaptcha Div-------- */}
      <div id="verify-otp"></div>
    </>
  );
};
