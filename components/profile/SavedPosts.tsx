import { Box } from "@mui/material";
import { TabHeader } from "../../ui";
import { Feed } from "../common";

export const SavedPosts = () => {
  return (
    <Box
      sx={{
        boxShadow: 8,
        borderRadius: 3,
      }}
    >
      <TabHeader invertColor header="Saved Posts" />
      <Feed savedPost={true} />
    </Box>
  );
};
