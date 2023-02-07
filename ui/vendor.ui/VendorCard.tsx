import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Avatar,
  Box,
  Button,
  IconButton,
} from "@mui/material";
import router, { useRouter } from "next/router";
import React from "react";
import { Vendor } from "../../types";
import { Stack } from "@mui/system";
import {
  AccountBoxOutlined,
  BookmarkBorderOutlined,
  PersonAddAlt1Outlined,
} from "@mui/icons-material";

const VendorCardStat: React.FC<{ header: string; value: string }> = ({
  header,
  value,
}) => {
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

export const VendorCard: React.FC<{ vendor: Vendor }> = ({ vendor }) => {
  const router = useRouter();

  const handleBook = () => {};

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
                router.push(`/profile/${vendor.user._id}`);
              }}
            >
              <Avatar
                sx={{ height: "92px", width: "92px" }}
                src={vendor.user.image}
              >
                {vendor.user.name}
              </Avatar>
            </IconButton>
            <Typography
              onClick={() => {
                router.push(`/profile/${vendor.user._id}`);
              }}
              sx={{ margin: 0 }}
              gutterBottom
              variant="h6"
              component="h6"
            >
              {vendor.user.name}
            </Typography>
            <Typography
              sx={{ margin: 0 }}
              gutterBottom
              variant="subtitle2"
              component="p"
            >
              {vendor.user.place}
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
                header={`${vendor.user?.followers?.length} +`}
                value="Follows"
              />
              <VendorCardStat
                header={`${vendor?.experience} Yr +`}
                value="Experience"
              />
              <VendorCardStat
                header={`${vendor?.projects?.length} +`}
                value="Projects"
              />
            </Box>
            <Box
              width={"100%"}
              display={"flex"}
              justifyContent={"space-around"}
            >
              <VendorCardStat
                header={`${vendor?.employees?.length} +`}
                value="Employees"
              />
              <VendorCardStat header="1 +" value="Posts" />
              {/* <VendorCardStat header="80+" value="Posts" /> */}
            </Box>
            <Box width={"100%"}></Box>
          </Stack>
          <Stack width={"100%"} gap={1} marginTop={1} paddingX={2}>
            <Button
              // size="small"
              variant="outlined"
              color="success"
              startIcon={<BookmarkBorderOutlined />}
              fullWidth
              onClick={handleBook}
            >
              Book
            </Button>
            <Button
              fullWidth
              color="primary"
              variant="outlined"
              startIcon={<AccountBoxOutlined />}
              onClick={() => {
                router.push(`/profile/${vendor.user?._id}`);
              }}
            >
              Profile
            </Button>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
