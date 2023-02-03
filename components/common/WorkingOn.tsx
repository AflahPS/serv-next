import { Card, CardHeader, CardContent, Typography } from "@mui/material";
import React from "react";
import { COLOR } from "../../constants";

export const WorkingOn = () => {
  return (
    <>
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
    </>
  );
};
