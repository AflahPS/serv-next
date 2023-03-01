import { Box, Typography } from "@mui/material";
import { COLOR } from "../../constants";

interface Props {
  header: string;
  invertColor?: boolean;
}

export const TabHeader: React.FC<Props> = (props) => {
  const { invertColor, header } = props;
  return (
    <Box
      borderRadius={3}
      marginBottom={{ xs: 1, lg: 2 }}
      height={{ xs: 32, sm: 40, md: 48, lg: 64 }}
      display={"flex"}
      alignItems={"center"}
      paddingX={{ xs: 2, sm: 3, lg: 4 }}
      bgcolor={invertColor ? COLOR["H1d-ui-bg"] : COLOR["H1d-ui-primary"]}
    >
      <Typography
        variant="h5"
        fontSize={{ xs: "16px", md: "18px", lg: "24px" }}
        fontWeight={600}
        align="left"
        color={invertColor ? COLOR["H1d-ui-primary"] : COLOR["H1d-ui-bg"]}
      >
        {header}
      </Typography>
    </Box>
  );
};
