import { Box, Card, CardContent, Typography, Avatar } from "@mui/material";
import React from "react";
import { COLOR } from "../../constants";

export const ChatMessageComp: React.FC<{
  isAuthor?: boolean;
  text: string;
  date: string;
  refer: any;
}> = ({ isAuthor, date, text, refer }) => {
  return (
    <Box
      ref={refer}
      alignSelf={isAuthor ? "end" : "start"}
      display={"flex"}
      alignItems={"center"}
      gap={1}
    >
      {!isAuthor && <Avatar></Avatar>}
      <Card
        sx={{
          borderRadius: 3,
          backgroundColor: COLOR["H1d-ui-secondary"],
        }}
      >
        <CardContent>
          <Typography variant="body2">{text}</Typography>
          <Typography
            fontSize={10}
            fontWeight={100}
            color={COLOR["H1d-font-primary"]}
            variant="caption"
          >
            {date}
          </Typography>
        </CardContent>
      </Card>
      {isAuthor && <Avatar></Avatar>}
    </Box>
  );
};
