import React, { useEffect, useState } from "react";
import { nest } from "../../../utils";
import { Card, Grid } from "@mui/material";
import { Layout } from "../../../components/common";
import { COLOR } from "../../../constants";
import { LocationAutocomplete, TabHeader, VendorCard } from "../../../ui";
import { User } from "../../../types";
import { useRouter } from "next/router";
import { getVendorsByServiceId } from "../../../APIs";

interface LocationObject {
  type: "Point";
  coordinates: number[];
}

const initialOption: LocationObject = {
  type: "Point",
  coordinates: [0, 0],
};

interface Props {
  users: User[];
  serviceId: string;
}

const ServiceId: React.FC<Props> = (props) => {
  const { users, serviceId } = props;
  const [userArr, setUserArr] = useState<User[]>([]);
  const [location, setLocation] = useState<LocationObject>(initialOption);

  const getAndSetVendors = async (location: LocationObject) => {
    try {
      if (!location.coordinates[0]) return;
      const lnglat = `${location.coordinates[0]},${location.coordinates[1]}`;
      const vendors = await getVendorsByServiceId(serviceId, lnglat);
      if (!vendors?.users) return;
      setUserArr(vendors.users);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getAndSetVendors(location);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, serviceId]);

  useEffect(() => {
    setUserArr(users);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const router = useRouter();
  return (
    <Layout>
      <Card
        sx={{
          backgroundColor: COLOR["H1d-ui-bg"],
          maxWidth: "85%",
          marginX: "auto",
          marginBottom: "16px",
          paddingBottom: "16px",
          boxShadow: 8,
          borderRadius: 3,
        }}
      >
        <TabHeader header="Vendors" />
        <LocationAutocomplete setLocation={setLocation} />

        <Grid color={"white"} container spacing={{ xs: 1, md: 2, lg: 3 }}>
          {Array.isArray(userArr) &&
            userArr.length > 0 &&
            userArr.map((user, index) => (
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

//// For Server-side-rendering ////

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
    console.error(err?.message);
  }
}

export async function getServerSideProps(context: any) {
  // Fetch data from the server or API
  try {
    const serviceId: string = context.params.serviceId;
    const vendorData = await getVendors(serviceId);
    return {
      props: {
        users: vendorData?.users,
        serviceId,
      },
    };
  } catch (err: any) {
    console.error(err.message);
  }
}

export default ServiceId;
