import {
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  MenuItem,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import React, { ChangeEvent, useRef, useState } from "react";
import {
  AuthHeading,
  LinkButton,
  TextFieldCustom2,
  LabelCustom,
} from "../../ui";
import { ChevronRightOutlined, LocationOnOutlined } from "@mui/icons-material";
import Link from "next/link";
import { geoCords, geoLocator } from "../../utils";

export const SignupVendor = () => {
  const aboutRef = useRef<any>();
  const serviceRef = useRef();

  const [place, setPlace] = useState("");
  const [location, setLocation] = useState({ lat: 0, lon: 0 });

  const getLocation = async () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLocation({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });
    });
    const loc: any = await geoLocator(location.lat, location.lon);
    setPlace(loc);
    console.log(loc);
  };

  const gatherPLace = async () => {
    const cords = await geoCords(place);
    if (cords) setLocation({ lat: cords[0], lon: cords[1] });
  };

  const handleVerifyButton = (event: any) => {};
  const handleMobileVerification = (event: any) => {};

  return (
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
            <LabelCustom variant="h6">Service Category/Profession</LabelCustom>
            <TextFieldCustom2
              inputRef={serviceRef}
              size="small"
              fullWidth
              select
            >
              <MenuItem value={"painter"}>Painter</MenuItem>
              <MenuItem value={"driver"}>Driver</MenuItem>
              <MenuItem value={"masonry"}>Masonry</MenuItem>
            </TextFieldCustom2>

            <LabelCustom variant="h6">Location</LabelCustom>
            <TextFieldCustom2
              size="small"
              fullWidth
              onChange={(e: any) => {
                setPlace(e?.target?.value);
              }}
              onBlur={gatherPLace}
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

            <LabelCustom variant="h6">Phone</LabelCustom>
            <TextFieldCustom2
              size="small"
              fullWidth
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
                    <Button onClick={handleVerifyButton}>Verify</Button>
                  </InputAdornment>
                ),
              }}
            />

            <LabelCustom variant="h6">About Me</LabelCustom>
            <TextFieldCustom2
              inputRef={aboutRef}
              size="small"
              fullWidth
              multiline
              rows={2}
            />

            <LinkButton
              variant="outlined"
              sx={{ marginLeft: "auto", marginRight: "12px", marginY: "12px" }}
            >
              Sign Up
            </LinkButton>
          </Box>

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
  );
};
