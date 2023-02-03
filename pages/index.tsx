/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useSWR from "swr";
import { Feed, Layout } from "../components/common";
import { axiosThrowerByMessage, nest } from "../utils";
import { Alert, Snackbar, Typography } from "@mui/material";
import { StoreState } from "../store";
import { layoutLoadingActions } from "../store/layout-loading.slice";
import { sideNavTabActions } from "../store/sidenav-tab.slice";
import { COLOR } from "../constants";
import { CreatePost } from "../ui";

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
    try {
      const res = await nest({
        url: Boolean(token) ? "/post/user" : "/post",
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      return res.data;
    } catch (err: any) {
      return axiosThrowerByMessage(err, "Post not found !!", () => []);
    }
  };
  const { data, error } = useSWR("posts", fetcher);

  const dispatch = useDispatch();
  dispatch(sideNavTabActions.push("Posts"));
  useEffect(() => {
    dispatch(layoutLoadingActions.finishedLoading());
  }, []);

  return (
    <Layout>
      {role === "vendor" && <CreatePost extraSx={{ maxWidth: "80%" }} />}
      {data && <Feed posts={data.posts} />}
      {/* If he doesn't have any posts yet */}

      {Array.isArray(data) && data.length === 0 && (
        <Typography
          variant="h5"
          color={COLOR["H1d-font-primary"]}
          align="center"
          margin={3}
        >
          Nothing posted yet !
        </Typography>
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
