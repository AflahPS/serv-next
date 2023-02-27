import {
  Autocomplete,
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { geoCordsAutoComplete, geoLocator } from "../../utils";
import { StyledTextField } from "..";
import { LocationOnOutlined } from "@mui/icons-material";

interface OptionObject {
  place: string;
  location: {
    type: "Point";
    coordinates: number[];
  };
}

interface LocationObject {
  type: "Point";
  coordinates: number[];
}

type SetLocation = React.Dispatch<React.SetStateAction<LocationObject>>;

export const LocationAutocomplete: FC<{ setLocation: SetLocation }> = ({
  setLocation,
}) => {
  const [place, setPlace] = useState("");
  const [locationVerified, setLocationVerified] = useState(true);

  const [options, setOptions] = useState<OptionObject[]>([]);
  const [selectedOption, setSelectedOption] = useState<OptionObject>({
    place: "",
    location: { type: "Point", coordinates: [0, 0] },
  });
  const getOptionLabel = (option: string | OptionObject) =>
    (option as OptionObject).place;
  const onSelectValue = (val: OptionObject) => setSelectedOption(val);

  // Get the coordinates of the location
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

  useEffect(() => {
    getLocation();
  }, []);

  // To get the place suggestions
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
        console.log(err);
      }
    };
    gatherSuggestions(place);
  }, [place]);

  const handleChange = (event: any, newValue: any) => {
    onSelectValue(newValue);
  };

  useEffect(() => {
    setLocation(selectedOption?.location);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOption]);

  return (
    <Autocomplete
      id="mapbox"
      getOptionLabel={getOptionLabel}
      disablePortal
      fullWidth
      freeSolo
      size="small"
      options={options}
      popupIcon={null}
      value={selectedOption}
      onChange={handleChange}
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
        console.log(state);
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
  );
};
