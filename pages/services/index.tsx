/* eslint-disable react-hooks/exhaustive-deps */
import React, { MouseEvent, useEffect } from "react";
import { Layout } from "../../components/common";
import { LinkButton, LoadingCard, TabHeader } from "../../ui";
import { useDispatch } from "react-redux";
import { layoutLoadingActions } from "../../store/layout-loading.slice";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Box,
  CardMedia,
  Grid,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  CardActionArea,
} from "@mui/material";
import { COLOR, SERVICES, USERS } from "../../constants";
import { CheckOutlined, ClearOutlined } from "@mui/icons-material";
import { useRouter } from "next/router";

const Services = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(layoutLoadingActions.finishedLoading());
    return () => {
      dispatch(layoutLoadingActions.finishedLoading());
    };
  }, []);

  const handleCardClick = (event: MouseEvent, id: string) => {
    event.preventDefault();
    router.push(`/services/${id}`);
  };
  return (
    <Layout>
      <Box
        sx={{
          maxWidth: "85%",
          marginX: "auto",
          marginBottom: "16px",
          borderRadius: 3,
        }}
      >
        <TabHeader header="Services" />

        <Grid color={"white"} container spacing={{ xs: 1, md: 2, lg: 3 }}>
          {SERVICES.map((service, index) => (
            <Grid
              item
              xs={12}
              sm={4}
              xl={3}
              // maxHeight={300}
              alignItems={"stretch"}
              // height={200}
              justifyContent={"center"}
              key={index}
            >
              <Card sx={{ display: "flex", height: "100%", borderRadius: 3 }}>
                <CardActionArea
                  onClick={(e) => {
                    handleCardClick(e, service._id);
                  }}
                >
                  <CardMedia
                    component="img"
                    image={service.image}
                    alt={service.title}
                    sx={{
                      height: "150px",
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {service.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {service.caption}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Layout>
  );
};

export default Services;
