import React, { useEffect } from "react";
import { Layout } from "../../components/common";
import { useDispatch } from "react-redux";
import { Card } from "@mui/material";
import { COLOR } from "../../constants";
import { sideNavTabActions, layoutLoadingActions } from "../../store";

import { ChatComp } from "../../components";

const Chat = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(layoutLoadingActions.finishedLoading());
    dispatch(sideNavTabActions.push("Messages"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <Card
        sx={{
          backgroundColor: COLOR["H1d-ui-bg"],
          width: "90%",
          marginX: "auto",
          marginBottom: "16px",
          boxShadow: 8,
          borderRadius: 3,
        }}
      >
        {/* ROOT CONTAINER */}
        <ChatComp />
      </Card>
    </Layout>
  );
};

export default Chat;
