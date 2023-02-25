import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  IconButton,
  TextFieldProps,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import { AuthHeading, LinkButton, TextFieldCustom2 } from "../../ui";
import { COLOR } from "../../constants";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  facebookAuth,
  firebaseAuth,
  googleAuth,
  lengthChecker,
  nest,
  validateEmail,
} from "../../utils";
import { authActions } from "../../store/auth.slice";
import { jwtActions } from "../../store/jwt.slice";
import { roleActions } from "../../store/role.slice";
import { userDataActions } from "../../store/user-data.slice";
import { sideNavTabActions } from "../../store/sidenav-tab.slice";
import { AxiosError } from "axios";
import { notifierActions } from "../../store/notifier.slice";
import { initializeSocket, signinUser, signinWithProvider } from "../../APIs";
import { Socket } from "socket.io-client";
import { socketActions } from "../../store/socket.slice";
import { onlineUsersActions } from "../../store/onlineUsers.slice";
import { FacebookOutlined } from "@mui/icons-material";
import GoogleIcon from "@mui/icons-material/Google";
import { signInWithPopup } from "firebase/auth";

interface Props {
  isAdmin?: boolean;
}

export const Signin: React.FC<Props> = ({ isAdmin }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const socket = useRef<Socket>();

  const [emailVeriied, setEmailVeriied] = useState(true);
  const [passwordVeriied, setPasswordVeriied] = useState(true);

  const emailRef = useRef<TextFieldProps>(null);
  const passwordRef = useRef<TextFieldProps>(null);

  const userSigninSuccessDeclare = (data: any) => {
    dispatch(notifierActions.successfullySignedIn());
    dispatch(authActions.login()); // login the user
    dispatch(jwtActions.setToken(data?.token)); // set the token
    localStorage.setItem("token", data?.token);
    dispatch(
      data?.user?.role === "vendor" ? roleActions.vendor() : roleActions.user()
    ); // set the role
    dispatch(userDataActions.addUserData(data?.user)); // set the user data
    socket.current = initializeSocket();
    socket.current.emit("new-user-add", data?.user?._id);
    socket.current.on("get-users", (activeUsers) =>
      dispatch(onlineUsersActions.setUsers(activeUsers))
    );
    dispatch(socketActions.setSocket(socket.current));
    dispatch(sideNavTabActions.push("Posts")); //If this is user or vendor
  };

  const adminSigninSuccessDeclare = (data: any) => {
    dispatch(notifierActions.successfullySignedIn());
    dispatch(authActions.login()); // login the user
    dispatch(jwtActions.setToken(data?.token)); // set the token
    localStorage.setItem("token", data?.token);
    dispatch(
      data?.user.role === "admin"
        ? roleActions.admin()
        : data?.user.role === "super-admin"
        ? roleActions.superAdmin()
        : roleActions.guest()
    ); // set the role
    dispatch(userDataActions.addUserData(data?.user)); // set the user data
    socket.current = initializeSocket();
    socket.current.emit("new-user-add", data?.user?._id);
    socket.current.on("get-users", (activeUsers) =>
      dispatch(onlineUsersActions.setUsers(activeUsers))
    );
    dispatch(socketActions.setSocket(socket.current));
    dispatch(sideNavTabActions.push("Dashboard")); //If the user is admin
  };

  const errorSafetyNet = (err: any) => {
    let errorResponeMessage = "";
    if (err instanceof AxiosError) {
      if (Array.isArray(err.response?.data?.message)) {
        // If the response is from backend validation
        errorResponeMessage = err.response?.data?.message[0];
      } else {
        errorResponeMessage = err.response?.data?.message;
      }
      dispatch(notifierActions.error(errorResponeMessage));
      return console.log({ errMessage: err?.response?.data?.message });
    }
    console.log(err?.message);
    dispatch(notifierActions.somethingWentWrong());
  };

  const verifyData = () => {
    const emailInput = emailRef.current?.value;
    const passwordInput = passwordRef.current?.value;
    const email = String(emailInput).trim();
    const password = String(passwordInput).trim();
    const isEmail = validateEmail(email);
    const isPassword = lengthChecker(password, 6, 50);

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

  const handleSigninUser = async (event: any): Promise<void> => {
    event.preventDefault();
    const dataV = verifyData();
    if (!dataV) return;
    try {
      const data = await signinUser(dataV);
      if (!data) {
        dispatch(notifierActions.somethingWentWrong());
        return;
      }
      userSigninSuccessDeclare(data);
      router.push("/");
    } catch (err: any) {
      errorSafetyNet(err);
    }
  };

  const handleSigninAdmin = async (event: any): Promise<void> => {
    event.preventDefault();
    const dataV = verifyData();
    if (!dataV) return;
    try {
      const data = await signinUser(dataV);
      if (!data) {
        dispatch(notifierActions.somethingWentWrong());
        return;
      }
      adminSigninSuccessDeclare(data);
      router.push("/admin");
    } catch (err: any) {
      errorSafetyNet(err);
    }
  };

  const handleSigninWithProvider = async (provider: "google" | "facebook") => {
    try {
      const data =
        provider === "google"
          ? await signInWithPopup(firebaseAuth, googleAuth)
          : await signInWithPopup(firebaseAuth, facebookAuth);
      if (data?.user) {
        const user = data.user;
        const userData = {
          name: user.displayName,
          email: user.email,
          image: user?.photoURL,
          phone: user?.phoneNumber,
          provider,
          idToken: await user.getIdToken(),
        };

        const signedUser = await signinWithProvider(userData);
        console.log(
          "🚀 ~ file: Signin.tsx:187 ~ handleSigninWithProvider ~ signedUser:",
          signedUser
        );
        if (signedUser.status === "success") {
          userSigninSuccessDeclare(signedUser);
          router.push("/");
          return;
        }
        dispatch(
          notifierActions.error("Authentication failed ! Please try again !")
        );
      }
      dispatch(
        notifierActions.error("Authentication failed, Please try again !")
      );
      // console.log({ googleData: data });
    } catch (err: any) {
      if (
        (err?.message as string).includes(
          "auth/account-exists-with-different-credential"
        )
      ) {
        dispatch(
          notifierActions.warning(
            "Email associated with the account has already been registered !"
          )
        );
      }
      console.log(err.message);
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
          main={!isAdmin ? "SIGN IN" : "SIGN IN ADMIN"}
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
              <LinkButton
                onClick={!isAdmin ? handleSigninUser : handleSigninAdmin}
                variant="outlined"
              >
                Sign In
              </LinkButton>
            </Stack>
          </Box>
          {!isAdmin && (
            <>
              <Box
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"space-around"}
                height={"18%"}
              >
                {/* <Typography color={"red"} textAlign={"center"} variant="body2">
                  {errMessage}
                </Typography> */}
                <Typography sx={{ color: COLOR["H1d-font-primary"] }}>
                  {"Sign in with   "}
                  <IconButton
                    color="info"
                    onClick={() => {
                      handleSigninWithProvider("google");
                    }}
                  >
                    <GoogleIcon />
                  </IconButton>
                  <IconButton
                    color="info"
                    onClick={() => {
                      handleSigninWithProvider("facebook");
                    }}
                  >
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
              </Box>
            </>
          )}
        </Box>
      </Stack>
    </Box>
  );
};
