import {
  Box,
  Button,
  Divider,
  TextFieldProps,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import React, { useRef } from "react";
import { AuthHeading, LinkButton, TextFieldCustom } from "../../ui";
import { COLOR } from "../../constants";
import { ChevronRightOutlined } from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/router";
import { nest } from "../../utils";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth.slice";

export const Signup = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const nameRef = useRef<TextFieldProps>(null);
  const emailRef = useRef<TextFieldProps>(null);
  const passwordRef = useRef<TextFieldProps>(null);
  const repeatPasswordRef = useRef<TextFieldProps>(null);

  const handleSignup = async (event: any): Promise<void> => {
    event.preventDefault();

    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const repeatPassword = repeatPasswordRef.current?.value;

    try {
      const res = await nest({
        url: "auth/signup",
        method: "POST",
        data: {
          name,
          email,
          password,
          repeatPassword,
        },
      });
      if (res.data?.status === "success") {
        dispatch(authActions.login());
        router.push("/");
      }
    } catch (error: any) {
      console.log({ errMessage: error?.response?.data?.message });
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
        <AuthHeading main="Sign Up As User" />
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
            <TextFieldCustom
              type="text"
              inputRef={nameRef}
              inLabel="Name"
              outLabel="Full Name"
            />
            <TextFieldCustom
              type="email"
              inputRef={emailRef}
              inLabel="Email"
              outLabel="Email"
            />
            <TextFieldCustom
              type="password"
              inputRef={passwordRef}
              inLabel="Password"
              outLabel="Password"
            />
            <TextFieldCustom
              type="password"
              inputRef={repeatPasswordRef}
              inLabel="Password"
              outLabel="Repeat Password"
            />
            <LinkButton
              onClick={handleSignup}
              variant="outlined"
              sx={{ marginLeft: "auto", marginRight: "12px", marginY: "12px" }}
            >
              Sign Up
            </LinkButton>
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
              Already have an account ?
              <Button sx={{ color: COLOR["H1d-ui-primary"] }}>
                <Link href={"/signin"}>Sign In</Link>
              </Button>
            </Typography>
            <LinkButton
              variant="outlined"
              onClick={() => {
                router.push("/signup/vendor");
              }}
              endIcon={<ChevronRightOutlined />}
            >
              Sign up as vendor
            </LinkButton>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};
