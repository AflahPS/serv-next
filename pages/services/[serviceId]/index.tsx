import React from "react";
import { nest } from "../../../utils";
import { Card, CardHeader, CardContent, Typography } from "@mui/material";
import { Layout } from "../../../components/common";
import { COLOR } from "../../../constants";

const serviceId = () => {
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
        <CardHeader title="We are really sorry !" />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Our team is currently working on this feature. Please stay tuned ...
          </Typography>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default serviceId;

async function getVendors(id = null) {
  try {
    const { data } = await nest({
      url: `service/vendor/${id}`,
      method: "GET",
    });

    return data?.vendors;
  } catch (err: any) {
    console.log(err?.message);
  }
}

// export async function getStaticPaths() {
//   const services = await nest()
//   return {
//     paths: meetups.map((meet) => {
//       return {
//         params: {
//           meetupId: meet.id,
//         },
//       };
//     }),
//     fallback: false,
//   };
// }

// export async function getStaticProps(context) {
//   // Fetch data from the server or API
//   try {
//     const meetupId = context.params.meetupId;
//     const meetupsData = await getMeetups(meetupId);
//     return {
//       props: {
//         meetupsData: meetupsData[0],
//       },
//     };
//   } catch (err) {
//     console.log(err.message);
//   }
// }
