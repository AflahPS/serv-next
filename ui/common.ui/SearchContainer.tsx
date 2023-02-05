import styled from "@emotion/styled";
import { COLOR } from "../../constants";
import { Box } from "@mui/material";

export const SearchContainer = styled(Box)(({ theme }) => ({
  backgroundColor: COLOR["H1d-ui-secondary"],
  color: COLOR["H1d-font-primary"],
  padding: "0 10px",
  display: "flex",
  alignItems: "center",
  borderRadius: 3,
  // width: "40%",
  height: "36px",
  maxWidth: "50%",
  minWidth: "35%",
  position: "relative",
}));
