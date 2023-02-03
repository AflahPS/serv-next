import React, { useEffect } from "react";
import { Layout } from "../../components/common";
import { LoadingCard } from "../../ui";
import { useDispatch } from "react-redux";
import { layoutLoadingActions } from "../../store/layout-loading.slice";
import { Card, CardHeader, CardContent, Typography } from "@mui/material";
import { COLOR } from "../../constants";

const Chat = () => {
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

export default Chat;
