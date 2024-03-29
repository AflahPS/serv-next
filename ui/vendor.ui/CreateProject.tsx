import React, { useEffect, useState } from "react";
import { LocationOnOutlined, SendOutlined } from "@mui/icons-material";
import {
  Autocomplete,
  Card,
  CardHeader,
  CircularProgress,
  Divider,
  IconButton,
  InputAdornment,
  MenuItem,
  Typography,
} from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { Box, Stack } from "@mui/system";
import { useDispatch } from "react-redux";
import { geoCordsAutoComplete, geoLocator, lengthChecker } from "../../utils";
import { LinkButton, StyledTextField } from "..";
import { COLOR, PROJ_STATUSES } from "../../constants";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { notifierActions } from "../../store";
import { Employee, Project, User } from "../../types";
import { createProject, getEmployeesOfVendor, getFollowers } from "../../APIs";
import { useStore } from "../../customHooks";

interface OptionObject {
  place: string;
  location: {
    type: "Point";
    coordinates: number[];
  };
}

interface Props {
  extraSx?: {};
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
}

export const CreateProject: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const { token, currentUser } = useStore();

  // FORM STATES
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [employees, setEmployees] = useState([]);
  const [client, setClient] = useState("");
  const [status, setStatus] = useState("");
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [place, setPlace] = useState("");
  const [location, setLocation] = useState({
    type: "Ponit",
    coordinates: [0, 0],
  });

  // EMPLOYEES MANAGEMENT
  const [allEmployees, setAllEmployees] = useState<Employee[]>([]);
  const getAndSetEmployees = async () => {
    try {
      const employees = await getEmployeesOfVendor(token);
      if (employees) setAllEmployees(employees);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getAndSetEmployees();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // FOLLOWERS MANAGEMENT
  const [followers, setFollowers] = useState<User[]>([]);
  const getAndSetFollowers = async () => {
    try {
      const followers = await getFollowers(currentUser._id);
      if (!followers) return setFollowers([]);
      setFollowers(followers);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getAndSetFollowers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [options, setOptions] = useState<OptionObject[]>([]);
  const [selectedOption, setSelectedOption] = useState<OptionObject>({
    place: "",
    location: { type: "Point", coordinates: [0, 0] },
  });

  const [locationVerified, setLocationVerified] = useState(true);

  // ---- Location finder using MAPBOX ------ //
  // Get the coordinates of the location by ICON click
  const getLocation = async () => {
    navigator.geolocation.getCurrentPosition(async function (position) {
      if (position)
        var loc = await geoLocator(
          position.coords.longitude,
          position.coords.latitude
        );
      if (!loc) return setLocationVerified(false);
      // setPlace(loc);
      setSelectedOption({
        place: loc,
        location: {
          type: "Point",
          coordinates: [position.coords.longitude, position.coords.latitude],
        },
      });
      setLocationVerified(true);
    });
  };

  // Get the coordinates of the location AutoCompleted
  useEffect(() => {
    const gatherSuggestions = async (place: string) => {
      try {
        const suggestions = await geoCordsAutoComplete(place);
        const suggArr = suggestions?.features?.map((el: any) => {
          const placeSplitArr = el?.place_name.split(",");

          return {
            place: `${placeSplitArr[0]}, ${
              placeSplitArr[placeSplitArr.length - 1]
            }`,
            location: el?.geometry,
          };
        });
        if (suggArr) {
          setOptions(suggArr);
          return;
        }
        setOptions([]);
        setLocationVerified(false);
      } catch (err) {
        console.error(err);
      }
    };
    gatherSuggestions(place);
  }, [place]);

  // MISC Functions
  const getOptionLabel = (option: string | OptionObject) =>
    (option as OptionObject).place;

  const onSelectValue = (val: OptionObject) => setSelectedOption(val);

  const handleStartDateChange = (newValue: Dayjs | null) => {
    setStartDate(newValue);
  };
  const handleEndDateChange = (newValue: Dayjs | null) => {
    setEndDate(newValue);
  };

  function showInvalidField(field: string) {
    dispatch(notifierActions.error(`Invalid data for the field ${field}`));
  }

  // Data validations
  const [loading, setLoading] = useState(false);
  const verifyData = () => {
    try {
      setLoading(true);
      const tagged = employees?.map((tag: any) => tag._id);

      let returnObj = {};

      if (!lengthChecker(title, 2, 50)) {
        showInvalidField(`'Project Title'`);
        return false;
      }
      returnObj = Object.assign(returnObj, { title });

      if (caption) returnObj = Object.assign(returnObj, { caption });

      if (tagged.length > 0)
        returnObj = Object.assign(returnObj, { employees: tagged });

      if (client) returnObj = Object.assign(returnObj, { client });

      if (
        !status ||
        !["pending", "running", "completed", "cancelled", "failed"].includes(
          status
        )
      ) {
        showInvalidField(`'Status'`);
        return false;
      }
      returnObj = Object.assign(returnObj, { status });

      if (!startDate || +startDate.valueOf() < +dayjs().valueOf()) {
        showInvalidField(`'Start Date'`);
        return false;
      }
      returnObj = Object.assign(returnObj, {
        startDate: startDate.toISOString(),
      });

      if (
        !endDate ||
        +endDate.valueOf() < +dayjs().valueOf() ||
        +endDate.valueOf() < +startDate.valueOf()
      ) {
        showInvalidField(`'End Date'`);
        return false;
      }
      returnObj = Object.assign(returnObj, { endDate: endDate.toISOString() });
      if (!locationVerified) {
        showInvalidField(`'Location'`);
        return false;
      }
      returnObj = Object.assign(returnObj, { place, location });
      return returnObj;
    } catch (error) {
      console.error(error);
    }
  };

  const clearFields = () => {
    setTitle("");
    setCaption("");
    setClient("");
    setStatus("");
    setStartDate(null);
    setEndDate;
    setPlace("");
    setLocation({
      type: "Ponit",
      coordinates: [0, 0],
    });
    setEmployees([]);
  };

  // Making the API request
  const handlePost = async () => {
    try {
      if (loading) return;
      const dataV = verifyData();
      if (!dataV) {
        setLoading(false);
        return;
      }
      const addedProject = await createProject(dataV, token);
      if (!addedProject) return dispatch(notifierActions.somethingWentWrong());
      setLoading(false);
      clearFields();
      props.setProjects((prev) => [...prev, addedProject?.project]);
      dispatch(notifierActions.success("success"));
    } catch (err: any) {
      setLoading(false);
      dispatch(notifierActions.somethingWentWrong());
      console.error(err?.message);
    }
  };

  return (
    <Card
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
            {/* TITLE */}
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

            {/* DESCRIPTION */}

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

            {/* EMPLOYEES */}

            <Autocomplete
              multiple
              onChange={(event: any, value: any) => {
                setEmployees(value);
              }}
              value={employees}
              limitTags={2}
              id="multiple-limit-employees"
              options={allEmployees.map((e) => e.emp)}
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
                {followers.map((user) => (
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
                label="Status *"
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
                label="Start Date *"
                inputFormat="DD/MM/YYYY"
                value={startDate}
                onChange={handleStartDateChange}
                renderInput={(params) => (
                  <StyledTextField size="small" fullWidth {...params} />
                )}
              />

              {/* END DATE */}

              <DesktopDatePicker
                label="End Date *"
                inputFormat="DD/MM/YYYY"
                value={endDate}
                onChange={handleEndDateChange}
                renderInput={(params) => (
                  <StyledTextField size="small" fullWidth {...params} />
                )}
              />
            </Box>

            {/* LOCATION */}

            <Autocomplete
              id="mapbox"
              getOptionLabel={getOptionLabel}
              disablePortal
              freeSolo
              size="small"
              options={options}
              // loading={l}
              popupIcon={null}
              value={selectedOption}
              onChange={(event: any, newValue: any) => {
                onSelectValue(newValue);
              }}
              onInputChange={(event, newInputValue) => {
                setPlace(newInputValue);
              }}
              renderInput={({ InputProps, ...params }) => {
                return (
                  <StyledTextField
                    {...params}
                    label={"Location"}
                    fullWidth
                    size="small"
                    error={!locationVerified}
                    helperText={!locationVerified && "Couldn't find location !"}
                    InputProps={{
                      ...InputProps,

                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={getLocation}>
                            <LocationOnOutlined />
                          </IconButton>
                          {InputProps.endAdornment}
                        </InputAdornment>
                      ),
                    }}
                  />
                );
              }}
              renderOption={(props, option, state) => {
                const label = getOptionLabel(option);
                return (
                  <li {...props}>
                    <Typography variant="body2" color="text.secondary">
                      {label}
                    </Typography>
                  </li>
                );
              }}
            />
          </LocalizationProvider>
        </Box>
      </Stack>

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
    </Card>
  );
};
