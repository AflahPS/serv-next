import { Box, Skeleton, Avatar } from "@mui/material";
import React from "react";
import { COLOR } from "../../constants";

export const LoadingCard: React.FC<{ extraSx?: {} }> = (props) => {
  return (
    <Box
      sx={{
        backgroundColor: COLOR["H1d-ui-bg"],
        // maxWidth: "80%",
        marginX: "auto",
        marginBottom: "16px",
        boxShadow: 8,
        borderRadius: 3,
        ...props.extraSx,
      }}
    >
      <Box display={"flex"} padding={3} gap={1}>
        <Skeleton variant="circular">
          <Avatar />
        </Skeleton>
        <Skeleton width="100%"></Skeleton>
      </Box>
      <Skeleton variant="rectangular" width="100%">
        <div style={{ paddingTop: "57%" }} />
      </Skeleton>
    </Box>
  );
};
