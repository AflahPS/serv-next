import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import { COLOR } from "../../constants";

const DetailPair: React.FC<{ title: string; value: string }> = ({
  title,
  value,
}) => {
  return (
    <Stack gap={1} padding={1} direction={"row"} flexWrap={"wrap"}>
      <Box flex={2}>
        <Typography variant="h6" color={COLOR["H1d-font-primary"]}>
          {title}
        </Typography>
      </Box>
      <Box flex={3}>
        <Typography variant="h6" color={COLOR["H1d-font-primary"]}>
          : {value}
        </Typography>
      </Box>
    </Stack>
  );
};

export const Dashboard = () => {
  return (
    <>
      {/* @Parent Container BOX */}
      <Box>
        {/* @Avatar + Details BOX */}
        <Box display={"flex"} width={"100%"} marginY={3}>
          {/* @Avatar box */}
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            flex={1}
          >
            <Avatar
              src="https://images.pexels.com/photos/34534/people-peoples-homeless-male.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              sx={{ height: "175px", width: "175px" }}
            ></Avatar>
          </Box>
          {/* Details BOX  */}
          <Box
            display={"flex"}
            bgcolor={COLOR["H1d-ui-bg"]}
            borderRadius={3}
            flex={2}
          >
            {/* Details left STACK */}
            <Stack bgcolor={"transparent"} flex={1}>
              <DetailPair title="Name" value="Anzar" />
              <DetailPair title="Service" value="Masonry" />
              <DetailPair title="Place" value="Kottakkal" />
              <DetailPair title="Experience" value="3 Years" />
            </Stack>

            {/* Details right STACK */}

            <Stack bgcolor={"transparent"} flex={1}>
              <DetailPair title="Projects" value="24" />
              <DetailPair title="Employees" value="1" />
              <DetailPair title="Available" value="Everyday" />
            </Stack>
          </Box>
        </Box>

        {/* Buttons Stack  */}

        <Stack
          direction={"row"}
          width={"100%"}
          display={"flex"}
          justifyContent={"space-around"}
        >
          <Button variant="outlined" color="uiPrimary">
            <Typography variant="h6" color={COLOR["H1d-font-primary"]}>
              Make an Appointment
            </Typography>
          </Button>
          <Button variant="outlined" color="uiPrimary">
            <Typography variant="h6" color={COLOR["H1d-font-primary"]}>
              Follow
            </Typography>
          </Button>
        </Stack>
      </Box>
    </>
  );
};
