/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Feed, Layout } from "../components/common";
import { StoreState } from "../store/store";
import { layoutLoadingActions } from "../store/layout-loading.slice";
import { sideNavTabActions } from "../store/sidenav-tab.slice";
import { CreatePost } from "../ui";
import { Box } from "@mui/material";

export default function Home() {
  const role = useSelector((state: StoreState) => state.role.currentUser);

  const dispatch = useDispatch();
  dispatch(sideNavTabActions.push("Posts"));
  useEffect(() => {
    dispatch(layoutLoadingActions.finishedLoading());
  }, []);

  return (
    <Layout>
      <Box maxWidth={"90%"} marginX={"auto"}>
        {role !== "guest" && <CreatePost />}
        <Feed />
      </Box>
    </Layout>
  );
}
