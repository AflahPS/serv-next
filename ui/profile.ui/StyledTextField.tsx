import styled from "@emotion/styled";
import { TextField } from "@mui/material";
import React from "react";
import { COLOR } from "../../constants";

export const StyledTextField = styled(TextField)({
  backgroundColor: COLOR["H1d-ui-secondary"],
  input: {
    color: COLOR["H1d-font-primary"],
  },
  borderRadius: "10px",
  marginTop: 12,
  marginBottom: 12,
});
