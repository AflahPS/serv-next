import React from "react";
import { nest } from "../../../utils";
import { Card, Grid } from "@mui/material";
import { Layout } from "../../../components/common";
import { COLOR } from "../../../constants";
import { TabHeader, VendorCard } from "../../../ui";
import { User, Vendor } from "../../../types";
import { useRouter } from "next/router";

const ServiceId: React.FC<{ users: User[] }> = ({ users }) => {
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
          {Array.isArray(users) &&
            users.length > 0 &&
            users.map((user, index) => (
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
                <VendorCard user={user} />
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

export async function getServerSideProps(context: any) {
  // Fetch data from the server or API
  try {
    const serviceId = context.params.serviceId;
    const vendorData = await getVendors(serviceId);

    return {
      props: vendorData,
    };
  } catch (err: any) {
    console.log(err.message);
  }
}

export default ServiceId;
