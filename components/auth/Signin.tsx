import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  TextFieldProps,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import { AuthHeading, LinkButton, TextFieldCustom } from "../../ui";
import { COLOR } from "../../constants";
import { ChevronRightOutlined } from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/router";
import { nest } from "../../utils";
import { authActions } from "../../store/auth.slice";

export const Signin = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const emailRef = useRef<TextFieldProps>(null);
  const passwordRef = useRef<TextFieldProps>(null);

  const handleSignin = async (event: any): Promise<void> => {
    event.preventDefault();
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    try {
      const res = await nest({
        url: "auth/signin",
        method: "POST",
        data: {
          email,
          password,
        },
      });
      console.log({ res });

      if (res.status === 200) {
        dispatch(authActions.login());
        router.push("/");
      }
    } catch (err: any) {
      if (err?.response) {
        console.log({ errMessage: err.response.data.message });
      }
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
            gap={2}
            width={"100%"}
          >
            <TextFieldCustom
              inputRef={emailRef}
              type="email"
              inLabel="Email"
              outLabel="Email"
            />
            <TextFieldCustom
              inputRef={passwordRef}
              type="password"
              inLabel="Password"
              outLabel="Password"
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
                <Link href={"/signup"}>Sign Up</Link>
              </Button>
            </Typography>
            <LinkButton
              variant="outlined"
              onClick={() => {
                router.push("/signin/vendor");
              }}
              endIcon={<ChevronRightOutlined />}
            >
              Sign in as vendor
            </LinkButton>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};
function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}
