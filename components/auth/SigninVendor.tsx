import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import { AuthHeading, LinkButton, TextFieldCustom } from "../../ui";
import { COLOR } from "../../constants";
import { ChevronRightOutlined } from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/router";

export const SigninVendor = () => {
  const router = useRouter();

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
          main="Sign in As Vendor"
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
            <TextFieldCustom inLabel="Email" type="email" outLabel="Email" />
            <TextFieldCustom
              inLabel="Password"
              type="password"
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
              <LinkButton variant="outlined">Sign In</LinkButton>
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
                <Link href={"/signup/vendor"}>Sign Up</Link>
              </Button>
            </Typography>
            <LinkButton
              variant="outlined"
              onClick={() => router.push("/signin")}
              endIcon={<ChevronRightOutlined />}
            >
              Sign in as user
            </LinkButton>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};
