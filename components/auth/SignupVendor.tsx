import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  MenuItem,
  Snackbar,
  Typography,
} from "@mui/material";
import useSWR from "swr";
import { Stack } from "@mui/system";
import React, { MouseEvent, useEffect, useRef, useState } from "react";
import {
  AuthHeading,
  LinkButton,
  TextFieldCustom2,
  LabelCustom,
  StyledTextField,
} from "../../ui";
import { ChevronRightOutlined, LocationOnOutlined } from "@mui/icons-material";
import Link from "next/link";
import {
  firebaseAuth,
  geoCords,
  geoCordsAutoComplete,
  geoLocator,
  nest,
} from "../../utils";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { userDataActions } from "../../store/user-data.slice";
import { roleActions } from "../../store/role.slice";
import { jwtActions } from "../../store/jwt.slice";
import { Service } from "../../types";
import { sideNavTabActions } from "../../store/sidenav-tab.slice";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { notifierActions } from "../../store/notifier.slice";
import { User } from "aws-sdk/clients/budgets";
import { signupUser } from "../../APIs";

interface OptionObject {
  place: string;
  location: {
    type: "Point";
    coordinates: number[];
  };
}

export const SignupVendor = () => {
  const dispatch = useDispatch();

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
  const [location, setLocation] = useState({
    type: "Point",
    coordinates: [0, 0],
  });

  const [options, setOptions] = useState<OptionObject[]>([]);
  const [selectedOption, setSelectedOption] = useState<OptionObject>({
    place: "",
    location: { type: "Point", coordinates: [0, 0] },
  });
  const getOptionLabel = (option: string | OptionObject) =>
    (option as OptionObject).place;
  const onSelectValue = (val: OptionObject) => setSelectedOption(val);
  const token = useSelector((state: any) => state.jwt.token);
  const router = useRouter();

  const [errMessage, setErrMessage] = useState("");

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
      firebaseAuth
    );
  };

  // Send OTP to mobile
  const sendOtp = (num: string) => {
    try {
      genRecaptcha();
      const phoneNum = `+91${num}`;
      const appVerifier = window.recaptchaVerifier;
      signInWithPhoneNumber(firebaseAuth, phoneNum, appVerifier).then((res) => {
        window.confirmationResult = res;
      });
    } catch (err) {
      console.error(err);
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

  // For fetching posts from backend
  const fetcher = async () => {
    const { data } = await nest({
      url: "/service",
      method: "GET",
    });
    return data;
  };
  const { data, error } = useSWR("services", fetcher);

  // Get location if user typed a location
  const gatherPLace = async (place: string) => {
    const cords = await geoCords(place);
    if (!cords) return console.warn("Coordinates not found");
    if (cords)
      setLocation({ type: "Point", coordinates: [cords[0], cords[1]] });
  };

  // Get the coordinates of the location
  const getLocation = async () => {
    navigator.geolocation.getCurrentPosition(async function (position) {
      if (position)
        var loc = await geoLocator(
          position.coords.longitude,
          position.coords.latitude
        );
      if (!loc) return setLocationVerified(false);
      // setPlace(loc);
      setSelectedOption({
        place: loc,
        location: {
          type: "Point",
          coordinates: [position.coords.longitude, position.coords.latitude],
        },
      });
      setLocationVerified(true);
    });
  };

  // To get the place suggestions
  useEffect(() => {
    const gatherSuggestions = async (place: string) => {
      try {
        const suggestions = await geoCordsAutoComplete(place);
        const suggArr = suggestions?.features?.map((el: any) => {
          const placeSplitArr = el?.place_name.split(",");

          return {
            place: `${placeSplitArr[0]}, ${
              placeSplitArr[placeSplitArr.length - 1]
            }`,
            location: el?.geometry,
          };
        });
        if (suggArr) {
          setOptions(suggArr);
          return;
        }
        setOptions([]);
        setLocationVerified(false);
      } catch (err) {
        console.error(err);
      }
    };
    gatherSuggestions(place);
  }, [place]);

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
        dispatch(notifierActions.success("OTP Verified Successfully !"));
        setShowOtpField(false);
        setOtpVerified(true);
      }
    } catch (err: any) {
      setOtpVerified(false);
      console.error(err?.message);
    }
  };

  // Verify and validate data before sending to the server
  const verifyBeforeSignup = () => {
    const service = serviceRef.current?.value;
    const phone = phoneRef.current?.value;
    const about = aboutRef.current?.value;
    const location = selectedOption?.location;

    const isService = Boolean(service);
    const isLocation = location && Boolean(location?.coordinates[0] !== 0);
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
      service: service as string,
      location,
      phone: phone as string,
      about: about as string,
      place: place as string,
    };
  };

  // handle the 'Sign Up' button
  const handleSignupClick = async (e: MouseEvent) => {
    e.preventDefault();
    const verified = verifyBeforeSignup();
    if (!verified) return;
    try {
      const newData = await signupUser(verified, token);
      if (newData?.status === "success") {
        dispatch(notifierActions.success("You have successfully signed up!"));
        dispatch(jwtActions.setToken(newData?.token));
        dispatch(roleActions.vendor());
        dispatch(userDataActions.addUserData(newData?.user));
        dispatch(sideNavTabActions.push("Posts"));
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
        return console.warn({ errMessage: error?.response?.data?.message });
      }
      dispatch(notifierActions.somethingWentWrong());
    }
  };

  const [animRef] = useAutoAnimate();

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
              gap={3}
              width={"100%"}
              ref={animRef}
            >
              {/* -------Service--------- */}
              {/* <LabelCustom variant="h6">
               
              </LabelCustom> */}
              <TextFieldCustom2
                label=" Service Category/Profession"
                select
                inputRef={serviceRef}
                size="small"
                error={!serviceVerified}
                helperText={!serviceVerified ? "Please select a service" : ""}
                defaultValue={""}
                fullWidth
              >
                {data &&
                  data?.services?.map((serv: Service) => (
                    <MenuItem key={serv._id} value={serv._id}>
                      {serv.title}
                    </MenuItem>
                  ))}
                {error && <MenuItem value="">Something went wrong !</MenuItem>}
              </TextFieldCustom2>

              {/* --------Location----------- */}

              <Autocomplete
                id="mapbox"
                getOptionLabel={getOptionLabel}
                disablePortal
                fullWidth
                freeSolo
                size="small"
                options={options}
                // loading={l}
                popupIcon={null}
                value={selectedOption}
                onChange={(event: any, newValue: any) => {
                  onSelectValue(newValue);
                }}
                onInputChange={(event, newInputValue) => {
                  setPlace(newInputValue);
                }}
                renderInput={({ InputProps, ...params }) => {
                  return (
                    <StyledTextField
                      {...params}
                      label={"Location"}
                      fullWidth
                      size="small"
                      error={!locationVerified}
                      helperText={
                        !locationVerified && "Couldn't find location !"
                      }
                      InputProps={{
                        ...InputProps,

                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={getLocation}>
                              <LocationOnOutlined />
                            </IconButton>
                            {InputProps.endAdornment}
                          </InputAdornment>
                        ),
                      }}
                    />
                  );
                }}
                renderOption={(props, option, state) => {
                  const label = getOptionLabel(option);
                  return (
                    <li {...props}>
                      <Typography variant="body2" color="text.secondary">
                        {label}
                      </Typography>
                    </li>
                  );
                }}
              />

              {/* --------Phone----------- */}

              {/* <LabelCustom variant="h6">Phone</LabelCustom> */}
              <TextFieldCustom2
                inputRef={phoneRef}
                size="small"
                fullWidth
                label="Phone"
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
                  {/* <LabelCustom variant="h6">OTP</LabelCustom> */}
                  <TextFieldCustom2
                    size="small"
                    label="OTP"
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

              {/* <LabelCustom variant="h6">About Me</LabelCustom> */}
              <TextFieldCustom2
                inputRef={aboutRef}
                error={!aboutVerified}
                label="About Me"
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
      </Box>
      {/* -------Recaptcha Div-------- */}
      <div id="verify-otp"></div>
    </>
  );
};
