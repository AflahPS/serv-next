import React from "react";
import { Layout, ProfileComplete } from "../../components";
import { nest } from "../../utils";
import { User } from "../../types";
import { Typography } from "@mui/material";
import { COLOR } from "../../constants";

const UserProfile: React.FC<{ user: User }> = ({ user }) => {
  if (!user)
    return (
      <Layout>
        <Typography variant="h4" color={COLOR["H1d-font-primary"]}>
          Sorry, seems like there is no user with these details...
        </Typography>
      </Layout>
    );
  return (
    <Layout>
      <ProfileComplete user={user} />;
    </Layout>
  );
};

export default UserProfile;

export async function getServerSideProps(ctx: any) {
  try {
    const userId = ctx.params?.userId;

    if (!userId) return { props: { user: null } };
    const { data } = await nest({
      url: `/user/single/${userId}`,
      method: "GET",
    });
    console.log("🚀 ~ file: [userId].tsx:34 ~ getServerSideProps ~ data", data);
    if (data.status === "success") {
      return {
        props: data,
      };
    }
  } catch (err: any) {
    console.log(err?.message);
    return { props: { user: null } };
  }
}
