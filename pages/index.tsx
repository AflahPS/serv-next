import { Feed, Layout } from "../components/common";

export default function Home() {
  // const router = useRouter();
  // const isAuth = useSelector((state: any) => state?.auth?.isAuth);

  // useEffect(() => {
  //   if (!isAuth) router.push("/signin");
  // }, [isAuth, router]);

  return (
    <Layout>
      <Feed />
    </Layout>
  );
}
