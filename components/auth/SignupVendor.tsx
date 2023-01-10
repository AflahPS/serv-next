import { Box, Button, Divider, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import { AuthHeading, PrimaryButton, TextFieldCustom } from "../../ui";
import { COLOR } from "../../constants";
import { ChevronRightOutlined } from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/router";

export const SignupVendor = () => {
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
            <TextFieldCustom inLabel="Full Name" outLabel="Name" />
            <TextFieldCustom inLabel="Email" outLabel="Email" />
            <TextFieldCustom inLabel="Password" outLabel="Password" />
            <TextFieldCustom inLabel="Repeat Password" outLabel="Password" />
            <PrimaryButton
              sx={{ marginLeft: "auto", marginRight: "12px", marginY: "12px" }}
              text="Sign Up"
            />
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
                <Link href={"/signin/vender"}>Sign In</Link>
              </Button>
            </Typography>
            <PrimaryButton
              onClick={() => router.push("/signup/vendor")}
              text="Sign up as vendor"
              endIcon={<ChevronRightOutlined />}
            />
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};
