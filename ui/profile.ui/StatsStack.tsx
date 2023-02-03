import { Stack, Box, Typography } from "@mui/material";
import { COLOR } from "../../constants";

export const StatStack: React.FC<{ name: string; stat: string }> = (props) => {
  return (
    <Stack height={"100%"}>
      <Box flex={1}>
        <Typography
          align="center"
          variant="body2"
          fontWeight={900}
          color={COLOR["H1d-font-primary"]}
        >
          {props.name}
        </Typography>
      </Box>
      <Box flex={1}>
        <Typography
          align="center"
          fontWeight={300}
          variant="body2"
          color={COLOR["H1d-font-primary"]}
        >
          {props.stat}
        </Typography>
      </Box>
    </Stack>
  );
};
