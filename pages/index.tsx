import { useState } from "react";
import { useSelector } from "react-redux";
import useSWR from "swr";
import { Feed, Layout } from "../components/common";
import { nest } from "../utils";
import { CreatePost, LoadingCard } from "../ui";
import { Alert, Snackbar } from "@mui/material";
import { StoreState } from "../store";

export default function Home() {
  const role = useSelector((state: StoreState) => state.role.currentUser);
  const token = useSelector((state: StoreState) => state.jwt.token);

  // For Error snackbar
  const [open, setOpen] = useState(true);
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  // For fetching posts from backend
  const fetcher = async () => {
    const res = await nest({
      url: Boolean(token) ? "/post/user" : "/post",
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return res.data;
  };
  const { data, error } = useSWR("posts", fetcher);

  return (
    <Layout>
      {role === "guest" && <CreatePost extraSx={{ maxWidth: "80%" }} />}
      {data && <Feed posts={data.posts} />}{" "}
      {!data && (
        <>
          <LoadingCard extraSx={{ maxWidth: "80%" }} />
          <LoadingCard extraSx={{ maxWidth: "80%" }} />
          <LoadingCard extraSx={{ maxWidth: "80%" }} />
          <LoadingCard extraSx={{ maxWidth: "80%" }} />
        </>
      )}
      {error && (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            Something went wrong !
          </Alert>
        </Snackbar>
      )}
    </Layout>
  );
}
