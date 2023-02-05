import React, { useState } from "react";
import { LocationOnOutlined, SendOutlined } from "@mui/icons-material";
import {
  Alert,
  Autocomplete,
  Card,
  CardHeader,
  CircularProgress,
  Divider,
  IconButton,
  InputAdornment,
  MenuItem,
  Snackbar,
  Typography,
} from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { Box, Stack } from "@mui/system";
import { useSelector } from "react-redux";
import { geoCords, geoLocator, nest } from "../../utils";
import { LinkButton, StyledTextField } from "..";
import { COLOR, PROJ_STATUSES, USERS } from "../../constants";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export const CreateProject: React.FC<{ extraSx?: {} }> = (props) => {
  const [title, setTitle] = useState("");
  const [client, setClient] = useState("");
  const [status, setStatus] = useState("");
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [place, setPlace] = useState("");
  const [location, setLocation] = useState({
    type: "Ponit",
    coordinates: [0, 0],
  });
  const [employees, setEmployees] = useState([]);
  const [errMessage, setErrMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [caption, setCaption] = useState("");

  const [locationVerified, setLocationVerified] = useState(true);

  const token = useSelector((state: any) => state.jwt?.token);

  const [open, setOpen] = useState(false);
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  // ---- Location finder using MAPBOX

  // Get the coordinates of the location
  const getLocation = async () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      if (position)
        setLocation({
          type: "Point",
          coordinates: [position.coords.longitude, position.coords.latitude],
        });
    });
    const loc: any = await geoLocator(
      location.coordinates[0],
      location.coordinates[1]
    );
    if (!loc) return setLocationVerified(false);
    setPlace(loc);
    setLocationVerified(true);
  };

  // Get location if user typed a location
  const gatherPLace = async (place: string) => {
    const cords = await geoCords(place);
    if (!cords) {
      setLocationVerified(false);
      return console.log("Coordinates not found");
    }
    if (cords)
      setLocation({ type: "Point", coordinates: [cords[0], cords[1]] });
  };

  const handleStartDateChange = (newValue: Dayjs | null) => {
    setStartDate(newValue);
  };
  const handleEndDateChange = (newValue: Dayjs | null) => {
    setStartDate(newValue);
  };

  const verifyData = async () => {
    try {
      setLoading(true);

      const tagged = employees.map((tag: any) => tag._id);

      const captionInput = caption;
      if (captionInput.length < 2) {
        setErrMessage("Please write something about this post !");
        return false;
      }

      return {
        caption: captionInput,
        tagged,
      };
    } catch (error) {
      console.log(error);
    }
  };

  const handlePost = async () => {
    try {
      const data = await verifyData();
      console.log("🚀 ~ file: CreatePost.tsx:131 ~ handlePost ~ data", data);
      if (!data) {
        setLoading(false);
        return;
      }
      const res = await nest({
        method: "POST",
        url: "project",
        data,
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      if (res.data?.status === "success") {
        setLoading(false);
        setOpen(true);
        setCaption("");
        setEmployees([]);
        setErrMessage("");
      }
    } catch (err: any) {
      setLoading(false);
      setErrMessage(err.message || "Something went wrong !");
      console.log(err?.message);
    }
  };

  return (
    <Card
      onClick={() => {
        setErrMessage("");
      }}
      sx={{
        boxShadow: 8,
        borderRadius: 3,
        marginX: "auto",
        merginY: 3,
        paddingX: 3,
        paddingBottom: 3,
        marginBottom: "16px",
        backgroundColor: COLOR["H1d-ui-bg"],
        ...props.extraSx,
      }}
    >
      <CardHeader
        titleTypographyProps={{ textAlign: "center" }}
        title="Create Project"
      />
      <Divider variant="fullWidth" />
      <Stack height={"35%"} paddingX={4} paddingY={2}>
        <Box>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StyledTextField
              label="Project Title *"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              placeholder="Title to identify this project"
              fullWidth
              size="small"
            ></StyledTextField>

            <StyledTextField
              label="Description"
              value={caption}
              onChange={(e) => {
                setCaption(e.target.value);
              }}
              multiline
              maxRows={3}
              placeholder="Short description about the project..."
              fullWidth
            ></StyledTextField>
            <Autocomplete
              multiple
              onChange={(event: any, value: any) => {
                setEmployees(value);
              }}
              value={employees}
              limitTags={2}
              id="multiple-limit-employees"
              options={USERS}
              getOptionLabel={(option) => option.name}
              defaultValue={[]}
              renderInput={(params) => (
                <StyledTextField
                  {...params}
                  variant="outlined"
                  label="Employees Involved"
                  size="small"
                  placeholder="Eployee"
                />
              )}
              sx={{ width: "100%" }}
            />

            <Box
              display={"flex"}
              flexDirection={{ xs: "column", sm: "row" }}
              justifyContent={"center"}
              gap={1}
            >
              {/* CLIENTS */}

              <StyledTextField
                value={client}
                onChange={(e) => {
                  setClient(e.target.value);
                }}
                select
                defaultValue={""}
                label="Client"
                size="small"
                fullWidth
                sx={{ minWidth: 98 }}
              >
                {USERS.map((user) => (
                  <MenuItem key={user._id} value={user._id}>
                    {user.name}
                  </MenuItem>
                ))}
              </StyledTextField>

              {/* STATUS */}

              <StyledTextField
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
                select
                defaultValue={""}
                label="Status"
                size="small"
                fullWidth
                sx={{ minWidth: 98 }}
              >
                {PROJ_STATUSES.map((status) => (
                  <MenuItem key={status.value} value={status.value}>
                    {status.title}
                  </MenuItem>
                ))}
              </StyledTextField>
            </Box>
            <Box
              display={"flex"}
              flexDirection={{ xs: "column", sm: "row" }}
              justifyContent={"center"}
              gap={1}
            >
              {/* START DATE */}

              <DesktopDatePicker
                label="Start Date"
                inputFormat="DD/MM/YYYY"
                value={startDate}
                onChange={handleStartDateChange}
                renderInput={(params) => (
                  <StyledTextField size="small" fullWidth {...params} />
                )}
              />

              {/* END DATE */}

              <DesktopDatePicker
                label="End Date"
                inputFormat="DD/MM/YYYY"
                value={endDate}
                onChange={handleEndDateChange}
                renderInput={(params) => (
                  <StyledTextField size="small" fullWidth {...params} />
                )}
              />
            </Box>

            {/* LOCATION */}

            <StyledTextField
              size="small"
              fullWidth
              label="Location"
              error={!locationVerified}
              // defaultValue={user.place}
              helperText={
                !locationVerified
                  ? "Sorry, Couldn't locate you. Try the pin icon after 10 seconds or type your location properly."
                  : ""
              }
              onChange={(e: any) => {
                setLocationVerified(true);
                setPlace(e?.target?.value);
              }}
              onBlur={() => {
                gatherPLace(place);
              }}
              value={place}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={getLocation}>
                      <LocationOnOutlined />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* COST

            <StyledTextField
              value={cost}
              fullWidth
              onChange={(e) => {
                setCost(e.target.value);
              }}
              type={"number"}
              defaultValue={""}
              label="Cost"
              size="small"
              sx={{ minWidth: 98 }}
            ></StyledTextField> */}
          </LocalizationProvider>
        </Box>
      </Stack>

      {/* <Stack sx={{ flexDirection: { xs: "column", md: "row" } }} paddingX={3}>
        <Stack gap={3} justifyContent={"space-around"} flex={1}> */}
      {/* STATUS */}

      {/* </Stack>
      </Stack> */}

      <Box
        flex={1}
        display={"flex"}
        justifyContent={"end"}
        marginRight={2}
        marginY={3}
      >
        <LinkButton
          variant="contained"
          color="uiBgLight"
          className="bg-H1d-ui-secondary"
          endIcon={
            loading ? (
              <CircularProgress color="inherit" size={18} />
            ) : (
              <SendOutlined />
            )
          }
          onClick={handlePost}
        >
          Post
        </LinkButton>
      </Box>
      <Typography
        color={"red"}
        marginTop={2}
        textAlign={"center"}
        variant="body2"
      >
        {errMessage}
      </Typography>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Successfully created new post !
        </Alert>
      </Snackbar>
    </Card>
  );
};
