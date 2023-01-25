import { InputAdornment, TextField, Typography, styled } from "@mui/material";
import React from "react";
import { COLOR } from "../../constants";

export const TextFieldCustom = (props: {
  inLabel?: string;
  outLabel?: string;
  moreStyle?: {};
  inputRef?: any;
  type?: string;
  endIcon?: string;
  select?: boolean;
}) => {
  const styles = {
    backgroundColor: COLOR["H1d-ui-secondary"],
    input: {
      color: COLOR["H1d-font-primary"],
    },
    borderRadius: "10px",
    ...props.moreStyle,
  };
  return (
    <>
      <Typography
        variant="h6"
        fontSize={16}
        alignSelf={"start"}
        sx={{ color: COLOR["H1d-font-primary"] }}
      >
        {props.outLabel}
      </Typography>
      <TextField
        type={props.type}
        inputRef={props.inputRef}
        size="small"
        InputLabelProps={{
          style: {
            color: COLOR["H1d-ui-primary"],
          },
        }}
        fullWidth
        select={props.select}
        label={props.inLabel}
        variant="outlined"
        sx={styles}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">{props.endIcon}</InputAdornment>
          ),
        }}
      />
    </>
  );
};
