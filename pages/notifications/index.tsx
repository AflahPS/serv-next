import React, { useEffect } from "react";
import { Layout, Notifications } from "../../components/common";
import { TabHeader } from "../../ui";
import { useDispatch } from "react-redux";
import { layoutLoadingActions } from "../../store/layout-loading.slice";
import { Card } from "@mui/material";
import { COLOR } from "../../constants";

const Index = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(layoutLoadingActions.finishedLoading());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        <TabHeader header="Notifications" />
        <Notifications />
      </Card>
    </Layout>
  );
};

export default Index;
