import React from "react";
import { nest } from "../../../utils";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  CardActionArea,
  CardMedia,
  Grid,
} from "@mui/material";
import { Layout } from "../../../components/common";
import { COLOR, VENDORS } from "../../../constants";
import { TabHeader } from "../../../ui";
import { Service, Vendor } from "../../../types";
import { useRouter } from "next/router";

const ServiceId: React.FC<{ vendors: Vendor[] }> = ({ vendors }) => {
  console.log({ vendors });
  const router = useRouter();
  return (
    <Layout>
      <Card
        sx={{
          backgroundColor: COLOR["H1d-ui-bg"],
          maxWidth: "80%",
          marginX: "auto",
          marginBottom: "16px",
          boxShadow: 8,
          borderRadius: 3,
        }}
      >
        <TabHeader header="Vendors" />

        <Grid color={"white"} container spacing={{ xs: 1, md: 2, lg: 3 }}>
          {Array.isArray(vendors) &&
            vendors.length > 0 &&
            vendors.map((v, index) => (
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
                <Card
                  onClick={() => {
                    router.push(`/profile/${v.user._id}`);
                  }}
                  sx={{ display: "flex", height: "100%", borderRadius: 3 }}
                >
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      image={v.user.image}
                      alt={v.user.name}
                      sx={{
                        height: "150px",
                        width: "100%",
                        objectFit: "cover",
                      }}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {v.user.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {v.about}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Card>
    </Layout>
  );
};

async function getVendors(id: string) {
  try {
    const { data } = await nest({
      url: `service/vendor/${id}`,
      method: "GET",
    });
    if (data.status === "success") {
      return data;
    }
  } catch (err: any) {
    console.log(err?.message);
  }
}

async function getAllServices() {
  try {
    const { data } = await nest({
      url: "/service",
      method: "GET",
    });
    if (data.status === "success") {
      return data?.services;
    }
  } catch (err: any) {
    console.log(err?.message);
  }
}

export async function getStaticPaths() {
  const services = await getAllServices();
  return {
    paths: services.map((service: Service) => {
      return {
        params: {
          serviceId: service._id,
        },
      };
    }),
    fallback: false,
  };
}

export async function getStaticProps(context: any) {
  // Fetch data from the server or API
  try {
    const serviceId = context.params.serviceId;
    const vendorData = await getVendors(serviceId);

    return {
      props: vendorData,
      revalidate: 1800,
    };
  } catch (err: any) {
    console.log(err.message);
  }
}

export default ServiceId;
