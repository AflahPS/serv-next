import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import {
  Autocomplete,
  Avatar,
  Badge,
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Stack,
  TextFieldProps,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { COLOR } from "../../constants";
import { LinkButton } from "../common.ui";
import { TabHeader } from "./TabHeader";
import { StyledTextField } from "./StyledTextField";
import {
  CreateOutlined,
  LocationOnOutlined,
  SaveAltOutlined,
} from "@mui/icons-material";
import {
  firebaseAuth,
  geoCordsAutoComplete,
  geoLocator,
  lengthChecker,
  nest,
  uploadImages,
  validateEmail,
  validatePhone,
} from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../../store/store";
import { userDataActions } from "../../store/user-data.slice";
import { User } from "../../types";
import { notifierActions } from "../../store/notifier.slice";
import { changeProfileImage, editPersonal } from "../../APIs";
import { useStore } from "../../customHooks";

interface Props {
  user: User;
  isProfileOwner: boolean;
}

interface OptionObject {
  place: string;
  location: {
    type: "Point";
    coordinates: number[];
  };
}

export const PersonalDetails: React.FC<Props> = (props) => {
  const { user, isProfileOwner } = props;
  const dispatch = useDispatch();
  const { token } = useStore();

  const [isDpUploading, setIsDpUploading] = useState(false);
  const [isEditable, setIsEditable] = useState(false);

  const nameRef = useRef<TextFieldProps>(null);
  const emailRef = useRef<TextFieldProps>(null);
  const phoneRef = useRef<TextFieldProps>(null);

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

  // for Location autocomplete
  const [options, setOptions] = useState<OptionObject[]>([]);
  const [selectedOption, setSelectedOption] = useState<OptionObject>({
    place: user?.place,
    location: user?.location || { type: "Point", coordinates: [0, 0] },
  });
  const getOptionLabel = (option: string | OptionObject) =>
    (option as OptionObject).place;
  const onSelectValue = (val: OptionObject) => setSelectedOption(val);

  //----- Profile Image updator function
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
      setIsDpUploading(true);
      const uploadedUrl = await uploadImages([filesInput[0]]);
      const newDp = String(uploadedUrl[0]);
      if (!newDp) {
        dispatch(
          notifierActions.error("Something went wrong while uploading image !")
        );
        return;
      }
      const dataV = { image: newDp };
      const isUpdated = await changeProfileImage(dataV, token);
      if (!isUpdated) {
        dispatch(
          notifierActions.error(
            "Something went wrong while updating profile image !"
          )
        );
        return;
      }
      dispatch(userDataActions.addUserData(isUpdated?.user));
      setIsDpUploading(false);
      dispatch(
        notifierActions.success("Successfully uploaded profile image !")
      );
    } catch (err: any) {
      setIsDpUploading(false);
      dispatch(notifierActions.somethingWentWrong());
      console.error(err?.message);
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
        dispatch(notifierActions.success(`OTP Verified Successfully !`));
        setShowOtpField(false);
        setOtpVerified(true);
      }
    } catch (err: any) {
      setOtpVerified(false);
      console.error(err?.message);
    }
  };

  // ---- Location finder using MAPBOX

  // Get the coordinates of the location
  const getLocation = async () => {
    navigator.geolocation.getCurrentPosition(async function (position) {
      if (position)
        // setLocation({
        //   type: "Point",
        //   coordinates: [position.coords.longitude, position.coords.latitude],
        // });
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
            place: `${placeSplitArr[0]}, ${placeSplitArr[1]},  ${
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

  // Verify all data before API call
  const verifiyData = () => {
    const nameInput = nameRef.current?.value;
    const emailInput = emailRef.current?.value;
    const phone = phoneRef.current?.value;
    const place = selectedOption?.place;
    const location = selectedOption?.location;

    const name = String(nameInput).trim();
    const email = String(emailInput).trim();

    const isName = lengthChecker(name, 2, 50);
    const isEmail = validateEmail(email);
    const isLocation = location && Boolean(location?.coordinates[0] !== 0);
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
      const updatedUser = await editPersonal(token, dataV);
      if (!updatedUser) {
        dispatch(
          notifierActions.error("Something went wrong while updating profile !")
        );
        return;
      }
      dispatch(userDataActions.addUserData(updatedUser));
      dispatch(notifierActions.success("Successfully updated profile !"));
      setIsEditable(false);
    } catch (err: any) {
      dispatch(
        notifierActions.error("Something went wrong while updating profile !")
      );
      console.error(err?.message);
    }
  };

  return (
    <>
      <TabHeader invertColor header="Personal Details" />
      <Box
        bgcolor={COLOR["H1d-ui-bg"]}
        display={"flex"}
        flexDirection={"column"}
        borderRadius={3}
        marginY={2}
      >
        {/* ---Avatar------ */}
        <Stack alignItems={"center"} marginY={2} gap={2}>
          {isProfileOwner && (
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
          )}
          {!isProfileOwner && (
            <Avatar sx={{ height: 124, width: 124 }} src={user?.image || ""}>
              {user.name || "Username"}
            </Avatar>
          )}
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
          position={"relative"}
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
                  <Button
                    disabled={!sendOtpButton || !isEditable || !isProfileOwner}
                    onClick={handleOtpButton}
                  >
                    Send OTP
                  </Button>
                </InputAdornment>
              ),
            }}
          />

          {/* OTP-FIELD */}
          {showOtpField && isProfileOwner && (
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

          <Autocomplete
            id="mapbox"
            getOptionLabel={getOptionLabel}
            disablePortal
            freeSolo
            disabled={!isEditable}
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
                  disabled={!isEditable}
                  error={!locationVerified}
                  helperText={!locationVerified && "Couldn't find location !"}
                  InputProps={{
                    ...InputProps,

                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          disabled={!isEditable}
                          onClick={getLocation}
                        >
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

          {/* Save button */}

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
      {/* -------Recaptcha Div-------- */}
      <div id="verify-otp"></div>
    </>
  );
};
