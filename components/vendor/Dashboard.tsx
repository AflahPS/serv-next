import { Avatar, Box, Stack, Typography } from "@mui/material";
import React from "react";
import { COLOR } from "../../constants";
import { useStore } from "../../customHooks";

const DetailPair: React.FC<{ title: string; value: string }> = ({
  title,
  value,
}) => {
  return (
    <Stack gap={1} padding={1} direction={"row"} flexWrap={"wrap"}>
      <Box flex={2} display={"flex"} alignItems={"center"}>
        <Typography variant="subtitle1" color={COLOR["H1d-font-primary"]}>
          {title}
        </Typography>
      </Box>
      <Box flex={3} display={"flex"} alignItems={"center"}>
        <Typography variant="subtitle2" color={COLOR["H1d-font-primary"]}>
          : {value}
        </Typography>
      </Box>
    </Stack>
  );
};

export const VendorPanel = () => {
  const { currentUser } = useStore();
  return (
    <>
      {/* @Parent Container BOX */}
      <Box>
        {/* @Avatar + Details BOX */}
        <Box display={"flex"} width={"100%"} marginY={2}>
          {/* @Avatar box */}
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            flex={1}
          >
            <Avatar
              src={currentUser?.image}
              sx={{ height: "175px", width: "175px" }}
            >
              {currentUser.name}
            </Avatar>
          </Box>
          {/* Details BOX  */}
          <Box
            display={"flex"}
            bgcolor={COLOR["H1d-ui-bg"]}
            borderRadius={3}
            flex={3}
          >
            {/* Details left STACK */}
            <Stack bgcolor={"transparent"} flex={1}>
              <DetailPair title="Name" value={currentUser.name} />
              <DetailPair
                title="Service"
                value={currentUser?.vendor?.service?.title!}
              />
              <DetailPair title="Place" value={currentUser?.place} />
              <DetailPair
                title="Experience"
                value={`${currentUser.vendor?.experience || "-"} Year(s)`}
              />
            </Stack>

            {/* Details right STACK */}

            <Stack bgcolor={"transparent"} flex={1}>
              <DetailPair
                title="Projects"
                value={currentUser.vendor?.projects?.length?.toString()!}
              />
              <DetailPair
                title="Employees"
                value={`${currentUser.vendor?.employees?.length || "0"}`}
              />
              <DetailPair
                title="Available in"
                value={currentUser.vendor?.workingDays!}
              />
              <DetailPair
                title="Available to"
                value={`${currentUser.vendor?.workRadius!} KMs`}
              />
            </Stack>
          </Box>
        </Box>
      </Box>
    </>
  );
};
