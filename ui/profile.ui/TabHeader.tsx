import { Box, Typography } from "@mui/material";
import { COLOR } from "../../constants";

export const TabHeader: React.FC<{ header: string }> = (props) => {
  return (
    <Box
      borderRadius={3}
      marginY={2}
      height={64}
      display={"flex"}
      alignItems={"center"}
      paddingX={4}
      bgcolor={COLOR["H1d-ui-primary"]}
    >
      <Typography
        variant="h5"
        fontWeight={600}
        align="left"
        color={COLOR["H1d-ui-bg"]}
      >
        {props.header}
      </Typography>
    </Box>
  );
};
