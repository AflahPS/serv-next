import React, { useContext, useRef, useState } from "react";
import {
  Box,
  Button,
  Divider,
  TextFieldProps,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import { useDispatch } from "react-redux";
import Link from "next/link";

import {
  notifierActions,
  onlineUsersActions,
  sideNavTabActions,
  userDataActions,
  roleActions,
  jwtActions,
  authActions,
} from "../../store";
import { AuthHeading, LinkButton, TextFieldCustom2 } from "../../ui";
import { SocketContext, lengthChecker, validateEmail } from "../../utils";
import { COLOR } from "../../constants";
import { useRouter } from "next/router";
import { SignupUserReturn, initializeSocket, signupUser } from "../../APIs";
import { ActiveUser } from "../../types";

export const Signup = () => {
  const router = useRouter();
  const { setSocket } = useContext(SocketContext);
  const dispatch = useDispatch();

  const nameRef = useRef<TextFieldProps>(null);
  const emailRef = useRef<TextFieldProps>(null);
  const passwordRef = useRef<TextFieldProps>(null);
  const repeatPasswordRef = useRef<TextFieldProps>(null);

  const [nameVerified, setNameVerified] = useState(true);
  const [emailVerified, setEmailVerified] = useState(true);
  const [passwordVerified, setPasswordVerified] = useState(true);
  const [repeatPasswordVerified, setRepeatPasswordVerified] = useState(true);

  const [errMessage, setErrMessage] = useState("");

  const verifiyData = () => {
    const nameInput = nameRef.current?.value;
    const emailInput = emailRef.current?.value;
    const passwordInput = passwordRef.current?.value;
    const repeatPasswordInput = repeatPasswordRef.current?.value;

    const name = String(nameInput).trim();
    const email = String(emailInput).trim();
    const password = String(passwordInput).trim();
    const repeatPassword = String(repeatPasswordInput).trim();

    const isName = lengthChecker(name, 2, 50);
    const isEmail = validateEmail(email);
    const isPassword = lengthChecker(password, 2, 20);
    const isRepeatPassword = password === repeatPassword;

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
    if (!isPassword) {
      setPasswordVerified(false);
      return false;
    }
    setPasswordVerified(true);
    if (!isRepeatPassword) {
      setRepeatPasswordVerified(false);
      return false;
    }
    setRepeatPasswordVerified(true);

    return {
      name,
      email,
      password,
      repeatPassword,
    };
  };

  const signupDeclare = (data: SignupUserReturn) => {
    dispatch(authActions.login());
    dispatch(jwtActions.setToken(data?.token));
    dispatch(roleActions.user());
    dispatch(userDataActions.addUserData(data?.user));
    dispatch(sideNavTabActions.push("Posts"));
    const newSocket = initializeSocket();
    newSocket?.emit("new-user-add", data?.user?._id);
    newSocket?.on("get-users", (activeUsers: ActiveUser[]) => {
      dispatch(onlineUsersActions.setUsers(activeUsers));
    });
    setSocket(newSocket);
    dispatch(notifierActions.success("Successfully signed up !"));
  };

  const handleSignup = async (event: any): Promise<void> => {
    try {
      event.preventDefault();
      setErrMessage("");
      // Verifies & Validates the data
      const dataV = verifiyData();
      if (!dataV) return;
      // Make the API request
      const data = await signupUser(dataV);
      signupDeclare(data);
      router.push("/auth/signup/checkpoint");
    } catch (error: any) {
      if (error?.response) {
        let errorResponeMessage = "";
        if (Array.isArray(error?.response?.data?.message)) {
          errorResponeMessage = error?.response?.data?.message[0];
        } else {
          errorResponeMessage = error?.response?.data?.message;
        }
        setErrMessage(errorResponeMessage);
        return console.error({ errMessage: error?.response?.data?.message });
      }
      setErrMessage("Something went wrong ! Please try again.");
    }
  };

  return (
    <Box
      sx={{ flex: { xs: 1, md: 2 } }}
      bgcolor="black"
      height={"100vh"}
      minWidth={"34%"}
    >
      <Stack height={"100%"} paddingY={3} paddingX={5}>
        <AuthHeading main="Sign Up" />
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
            gap={4}
            width={"100%"}
          >
            <TextFieldCustom2
              type="text"
              inputRef={nameRef}
              label="Full Name"
              fullWidth
              size="small"
              error={!nameVerified}
              helperText={
                !nameVerified ? "Provide a valid name (Min: 2, Max: 50) !" : ""
              }
              onChange={() => {
                setNameVerified(true);
              }}
            />
            <TextFieldCustom2
              type="email"
              inputRef={emailRef}
              label="Email"
              fullWidth
              size="small"
              error={!emailVerified}
              helperText={!emailVerified ? "Provide a valid email !" : ""}
              onChange={() => {
                setEmailVerified(true);
              }}
            />
            <TextFieldCustom2
              type="password"
              inputRef={passwordRef}
              label="Password"
              fullWidth
              size="small"
              error={!passwordVerified}
              helperText={
                !passwordVerified
                  ? "Provide a valid password (Min: 8, Max: 20) !"
                  : ""
              }
              onChange={() => {
                setPasswordVerified(true);
              }}
            />
            <TextFieldCustom2
              type="password"
              inputRef={repeatPasswordRef}
              label="Repeat Password"
              fullWidth
              size="small"
              error={!repeatPasswordVerified}
              helperText={
                !repeatPasswordVerified ? "Password does not match !" : ""
              }
              onChange={() => {
                setRepeatPasswordVerified(true);
              }}
            />
            <LinkButton
              onClick={handleSignup}
              variant="outlined"
              sx={{ marginLeft: "auto", marginRight: "12px", marginY: "16px" }}
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
            display="flex"
            flexDirection={"column"}
            justifyContent="space-around"
            width={"100%"}
          >
            <Typography sx={{ color: COLOR["H1d-font-primary"] }}>
              Already have an account ?
              <Button sx={{ color: COLOR["H1d-ui-primary"] }}>
                <Link href={"/auth/signin"}>Sign In</Link>
              </Button>
            </Typography>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};
