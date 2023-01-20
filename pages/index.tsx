import { useRouter } from "next/router";
import { Feed, Layout } from "../components/common";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function Home() {
  // const router = useRouter();
  // const isAuth = useSelector((state: any) => state?.auth?.isAuth);

  // useEffect(() => {
  //   if (!isAuth) router.push("/auth/signin");
  // }, [isAuth, router]);

  return (
    <Layout>
      <Feed />
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  console.log(req?.cookies);
  return {
    props: {},
  };
}
