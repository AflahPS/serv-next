import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { CheckOutlined } from "@mui/icons-material";
import { LinkButton, TabHeader } from "../../ui";
import { USERS } from "../../constants";

export const Friends = () => {
  return (
    <Box sx={{ boxShadow: 8, borderRadius: 3 }}>
      <TabHeader header="Friends" />
      <Grid color={"white"} container spacing={{ xs: 1, md: 2, lg: 3 }}>
        {USERS.map((_, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            xl={4}
            height={200}
            maxWidth={"80%"}
            justifyContent={"center"}
            key={index}
          >
            <Card sx={{ display: "flex", height: "100%", borderRadius: 3 }}>
              <CardMedia
                component="img"
                sx={{
                  width: "35%",
                  objectFit: "cover",
                }}
                image={_.image}
                alt="Live from space album cover"
              />
              <CardContent
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Typography component="div" variant="h6">
                  {_.name}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  component="div"
                >
                  95 Friends
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  component="div"
                >
                  12 Mutual Friends
                </Typography>
                <LinkButton
                  variant="outlined"
                  startIcon={<CheckOutlined color="success" />}
                >
                  Following
                </LinkButton>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
