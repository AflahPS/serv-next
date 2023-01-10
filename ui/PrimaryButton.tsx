import { Button } from "@mui/material";
import React, { ReactNode } from "react";

export const PrimaryButton = (props: {
  text: string;
  endIcon?: ReactNode;
  startIcon?: ReactNode;
  sx?: {};
  onClick?: () => void;
}) => {
  return (
    <Button
      onClick={props.onClick}
      variant="outlined"
      endIcon={props.endIcon}
      startIcon={props.startIcon}
      sx={props.sx}
    >
      {props.text}
    </Button>
  );
};
