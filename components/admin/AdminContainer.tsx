import { Box } from "@mui/material";
import React, { PropsWithChildren } from "react";

export const AdminContainer: React.FC<PropsWithChildren> = ({ children }) => {
  return <Box width={"95%"}>{children}</Box>;
};
