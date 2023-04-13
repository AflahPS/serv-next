import { Box, Card, CardContent, Typography, Avatar } from "@mui/material";
import React, { FC } from "react";
import { COLOR } from "../../constants";

interface Props {
  isAuthor?: boolean;
  text: string;
  date: string;
  refer: any;
  avatar?: string;
}

export const ChatMessageComp: FC<Props> = (props) => {
  const { isAuthor, date, text, refer, avatar } = props;
  return (
    <Box
      ref={refer}
      alignSelf={isAuthor ? "end" : "start"}
      display={"flex"}
      alignItems={"center"}
      gap={1}
    >
      {!isAuthor && <Avatar src={avatar}></Avatar>}
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
      {isAuthor && <Avatar src={avatar}></Avatar>}
    </Box>
  );
};
