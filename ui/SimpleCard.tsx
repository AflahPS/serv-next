import { ChevronRightOutlined } from "@mui/icons-material";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import React from "react";
import { COLOR } from "../constants";
import Link from "next/link";

export const SimpleCard = (props: {
  head?: string;
  body?: string;
  buttonText?: string;
  href: string;
}) => {
  return (
    <Card
      sx={{
        height: "35%",
        backgroundColor: COLOR["H1d-ui-bg"],
        color: COLOR["H1d-font-primary"],
        borderRadius: "10px",
      }}
    >
      <CardContent className="h-[60%] flex flex-col justify-between">
        <Typography align="center" variant="h5">
          {props.head}
        </Typography>
        <Typography variant="body2">{props.body}</Typography>
      </CardContent>
      <CardActions sx={{ marginY: "auto" }}>
        <Button
          sx={{ marginLeft: "auto", marginRight: "12px" }}
          variant="outlined"
          endIcon={<ChevronRightOutlined />}
        >
          <Link href={props.href}>{props.buttonText}</Link>
        </Button>
      </CardActions>
    </Card>
  );
};
