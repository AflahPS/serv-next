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

interface Props {
  header: string;
  value: string;
}

const VendorCardStat: React.FC<Props> = ({ header, value }) => {
  return (
    <Stack>
      <Typography align="center" variant="h6" fontSize={"18px"}>
        {header}
      </Typography>
      <Typography align="center" variant="caption">
        {value}
      </Typography>
    </Stack>
  );
};

export const VendorCard: React.FC<{ user: User }> = ({ user }) => {
  const router = useRouter();

  const isAuth = useSelector((state: StoreState) => state.auth.isAuth);

  const [openModal, setOpenModal] = useState(false);

  const handleBook = () => {
    setOpenModal(true);
  };

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
          </Stack>
          {/* <Box
            // maxHeight={"120px"}
            // sx={{
            //   overflowWrap: "break-word",
            //   wordWrap: "break-word",
            //   whiteSpace: "pre-wrap",
            //   textOverflow: "ellipsis",
            // }}
            paddingY={1}
          >
            <Typography variant="body2" color="text.secondary">
              {`${vendor.about.slice(0, 130)}...`}
            </Typography>
          </Box> */}
          <Stack gap={1}>
            <Box
              width={"100%"}
              display={"flex"}
              justifyContent={"space-around"}
            >
              <VendorCardStat
                header={`${user?.followers?.length} +`}
                value="Follows"
              />
              <VendorCardStat
                header={`${user?.vendor?.experience} Yr +`}
                value="Experience"
              />
              <VendorCardStat
                header={`${user?.vendor?.projects?.length} +`}
                value="Projects"
              />
            </Box>
            <Box
              width={"100%"}
              display={"flex"}
              justifyContent={"space-around"}
            >
              <VendorCardStat
                header={`${user?.vendor?.employees?.length} +`}
                value="Employees"
              />
              <VendorCardStat header="1 +" value="Posts" />
              {/* <VendorCardStat header="80+" value="Posts" /> */}
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
