import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  IconButton,
  Snackbar,
  TextFieldProps,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import GoogleIcon from "@mui/icons-material/Google";
import { AuthHeading, LinkButton, TextFieldCustom2 } from "../../ui";
import { COLOR } from "../../constants";
import { ChevronRightOutlined, FacebookOutlined } from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/router";
import { lengthChecker, nest, validateEmail } from "../../utils";
import { authActions } from "../../store/auth.slice";
import { jwtActions } from "../../store/jwt.slice";
import { roleActions } from "../../store/role.slice";

export const Signin = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [emailVeriied, setEmailVeriied] = useState(true);
  const [passwordVeriied, setPasswordVeriied] = useState(true);

  const emailRef = useRef<TextFieldProps>(null);
  const passwordRef = useRef<TextFieldProps>(null);

  const [errMessage, setErrMessage] = useState("");

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

  const verifyData = () => {
    const emailInput = emailRef.current?.value;
    const passwordInput = passwordRef.current?.value;

    const email = String(emailInput).trim();
    const password = String(passwordInput).trim();

    const isEmail = validateEmail(email);
    const isPassword = lengthChecker(password, 8, 50);

    if (!isEmail) {
      setEmailVeriied(false);
      return;
    }
    setEmailVeriied(true);

    if (!isPassword) {
      setPasswordVeriied(false);
      return;
    }
    setPasswordVeriied(true);
    return { email, password };
  };

  const handleSignin = async (event: any): Promise<void> => {
    event.preventDefault();
    const data = verifyData();
    if (!data) return;

    try {
      const res = await nest({
        url: "auth/signin",
        method: "POST",
        data,
      });
      if (res.data?.status === "success") {
        setOpen(true);
        dispatch(authActions.login());
        dispatch(jwtActions.setToken(res.data?.token));
        dispatch(roleActions.user());
        router.push("/");
      }
    } catch (err: any) {
      let errorResponeMessage = "";
      if (err?.response) {
        if (Array.isArray(err.response?.data?.message)) {
          errorResponeMessage = err.response?.data?.message[0];
        } else {
          errorResponeMessage = err.response?.data?.message;
        }
        setErrMessage(errorResponeMessage);
        return console.log({ errMessage: err?.response?.data?.message });
      }
      console.log(err?.message);

      setErrMessage("Something went wrong !");
    }
  };

  return (
    <Box
      // flex={2}
      sx={{ flex: { xs: 1, md: 2 } }}
      bgcolor="black"
      height={"100vh"}
      minWidth={"34%"}
    >
      <Stack height={"100%"} paddingY={3} paddingX={5}>
        <AuthHeading
          main="Sign in As User"
          sub="Enter your email address and password to access more."
        />
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
            gap={5}
            width={"100%"}
          >
            <TextFieldCustom2
              inputRef={emailRef}
              error={!emailVeriied}
              helperText={!emailVeriied ? "Incorrect email address !" : ""}
              size="small"
              fullWidth
              type="email"
              label="Email"
              onChange={() => {
                setEmailVeriied(true);
              }}
            />
            <TextFieldCustom2
              inputRef={passwordRef}
              error={!passwordVeriied}
              helperText={
                !passwordVeriied ? "Invalid password ! (Min: 6, Max:20)" : ""
              }
              type="password"
              size="small"
              onChange={() => {
                setPasswordVeriied(true);
              }}
              fullWidth
              label="Password"
            />
            <Stack
              width={"90%"}
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox sx={{ color: COLOR["H1d-font-primary"] }} />
                  }
                  sx={{ color: COLOR["H1d-font-primary"] }}
                  label="Remember me."
                />
              </FormGroup>
              <LinkButton onClick={handleSignin} variant="outlined">
                Sign In
              </LinkButton>
            </Stack>
          </Box>
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"space-around"}
            height={"18%"}
          >
            <Typography color={"red"} textAlign={"center"} variant="body2">
              {errMessage}
            </Typography>
            <Typography sx={{ color: COLOR["H1d-font-primary"] }}>
              {"Sign in with   "}
              <IconButton>
                <GoogleIcon />
              </IconButton>
              <IconButton>
                <FacebookOutlined />
              </IconButton>
            </Typography>
          </Box>
          <Divider color="grey" />
          <Box
            flex={1}
            display="flex"
            flexDirection={"column"}
            justifyContent="space-around"
            width={"100%"}
          >
            <Typography sx={{ color: COLOR["H1d-font-primary"] }}>
              Dont have an account ?
              <Button sx={{ color: COLOR["H1d-ui-primary"] }}>
                <Link href={"/auth/signup"}>Sign Up</Link>
              </Button>
            </Typography>
            <LinkButton
              variant="outlined"
              onClick={() => {
                router.push("/auth/signin/vendor");
              }}
              endIcon={<ChevronRightOutlined />}
            >
              Sign in as vendor
            </LinkButton>
          </Box>
        </Box>
      </Stack>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Successfully signed in !
        </Alert>
      </Snackbar>
    </Box>
  );
};
