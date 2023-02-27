import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Avatar,
  Box,
  Button,
  IconButton,
  Alert,
  Snackbar,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { User, Vendor } from "../../types";
import { Stack } from "@mui/system";
import {
  AccountBoxOutlined,
  BookmarkBorderOutlined,
} from "@mui/icons-material";
import { MakeAppoModal } from "./MakeAppoModal";
import { useSelector } from "react-redux";
import { StoreState } from "../../store";
import Link from "next/link";
import { COLOR } from "../../constants";

interface PropsStat {
  header: string;
  value: string;
}

const VendorCardStat: React.FC<PropsStat> = ({ header, value }) => {
  return (
    <Stack>
      <Typography align="center" variant="h6" fontSize={"16px"}>
        {header}
      </Typography>
      <Typography align="center" variant="caption">
        {value}
      </Typography>
    </Stack>
  );
};

interface Props {
  user: User & { distance?: number };
}

export const VendorCard: React.FC<Props> = ({ user }) => {
  const router = useRouter();

  const isAuth = useSelector((state: StoreState) => state.auth.isAuth);

  const [openModal, setOpenModal] = useState(false);

  const handleBook = () => {
    setOpenModal(true);
  };

  const followers = `${user?.followers?.length || 0} +`;
  const experience = `${user?.vendor?.experience || "-"} Yr +`;
  const projects = `${user?.vendor?.projects?.length || 0} +`;
  const employees = `${user?.vendor?.employees?.length || 1} +`;
  const posts = `1 +`;
  const distance = isNaN(user?.distance!)
    ? `- km away`
    : `${Math.floor(user?.distance! / 1000)} km away`;

  return (
    <Card
      sx={{
        display: "flex",
        height: "100%",
        borderRadius: 3,
      }}
    >
      <CardActionArea>
        <CardContent
          sx={{
            background:
              "linear-gradient(180deg, rgba(10,113,115,.7) 0%, rgba(52,50,46,0) 28%)",
          }}
        >
          {/* Avatar and titles */}

          <Stack alignItems={"center"} marginBottom={2}>
            <IconButton
              onClick={() => {
                router.push(`/profile/${user._id}`);
              }}
            >
              <Avatar sx={{ height: "92px", width: "92px" }} src={user.image}>
                {user.name}
              </Avatar>
            </IconButton>
            <Typography
              onClick={() => {
                router.push(`/profile/${user._id}`);
              }}
              sx={{ margin: 0 }}
              gutterBottom
              variant="h6"
              component="h6"
            >
              {user.name}
            </Typography>
            <Typography
              sx={{ margin: 0 }}
              gutterBottom
              variant="subtitle2"
              component="p"
            >
              {user.place}
            </Typography>
            {user?.distance && (
              <Typography
                sx={{ margin: 0 }}
                gutterBottom
                variant="subtitle1"
                component="p"
                color={COLOR["H1d-ui-primary"]}
              >
                {distance}
              </Typography>
            )}
          </Stack>

          {/* Stats */}

          <Stack gap={1}>
            <Box
              width={"100%"}
              display={"flex"}
              justifyContent={"space-around"}
            >
              <VendorCardStat header={followers} value="Follows" />
              <VendorCardStat header={experience} value="Experience" />
              <VendorCardStat header={projects} value="Projects" />
            </Box>
            <Box
              width={"100%"}
              display={"flex"}
              justifyContent={"space-around"}
            >
              <VendorCardStat header={employees} value="Employees" />
              <VendorCardStat header={posts} value="Posts" />
            </Box>
            <Box width={"100%"}></Box>
          </Stack>
          <Stack width={"100%"} gap={1} marginTop={1} paddingX={2}>
            {/* HIRE BUTTON */}

            <Button
              // size="small"
              variant="outlined"
              color="success"
              startIcon={<BookmarkBorderOutlined />}
              fullWidth
              disabled={!isAuth}
              onClick={handleBook}
            >
              Hire
            </Button>

            {/* LOGIN REDIRECT */}
            {!isAuth && (
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                gap={1}
              >
                <Typography
                  display={"inline"}
                  variant="caption"
                >{`Please `}</Typography>
                <Link href={"/auth/signin"}>
                  <Typography
                    display={"inline"}
                    variant="subtitle2"
                    color={"rgba(10,113,115,1)"}
                  >{`SIGN IN `}</Typography>
                </Link>
                <Typography
                  display={"inline"}
                  variant="caption"
                >{`to hire !`}</Typography>
              </Box>
            )}

            {/* PROFILE BUTTON */}
            <Button
              fullWidth
              color="primary"
              variant="outlined"
              startIcon={<AccountBoxOutlined />}
              onClick={() => {
                router.push(`/profile/${user?._id}`);
              }}
            >
              Profile
            </Button>
          </Stack>

          {/* APPOINTMENT MODAL */}

          <MakeAppoModal
            user={user}
            openModal={openModal}
            setOpenModal={setOpenModal}
          />
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
