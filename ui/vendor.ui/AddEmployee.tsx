import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewEmployee, getFollowers } from "../../APIs";
import { StoreState } from "../../store";
import { Stack } from "@mui/system";
import { TextFieldCustom2 } from "../common.ui";
import { Autocomplete, Button, Typography } from "@mui/material";
import { AddOutlined } from "@mui/icons-material";
import { Employee, User } from "../../types";
import { notifierActions } from "../../store/notifier.slice";

interface Props {
  setEmployees: React.Dispatch<React.SetStateAction<Employee[]>>;
  employees: Employee[];
}

export const AddEmployee: React.FC<Props> = ({ setEmployees, employees }) => {
  const dispatch = useDispatch();
  const [followers, setFollowers] = useState<User[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<User>();

  const currentUser = useSelector((state: StoreState) => state.user.data);
  const token = useSelector((state: StoreState) => state.jwt.token);

  const getAndSetFollowers = async () => {
    try {
      const followers = await getFollowers(currentUser._id);
      if (!followers) return setFollowers([]);
      setFollowers(followers);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getAndSetFollowers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkIfAlreadyEmployee = (
    employees: Employee[],
    user: User
  ): boolean => {
    const foundUser = employees.find((e) => e.emp?._id === user._id);
    console.log(foundUser);
    return !!foundUser;
  };

  const handleAddEmployee = async () => {
    try {
      if (checkIfAlreadyEmployee(employees, selectedEmployee as User)) {
        return dispatch(
          notifierActions.info("Selected user is already your employee")
        );
      }
      const isSuccess = await addNewEmployee(
        selectedEmployee?._id as string,
        token
      );
      if (!isSuccess) return dispatch(notifierActions.somethingWentWrong());
      setEmployees((prev) => [
        ...prev,
        {
          _id: Date.now(),
          emp: selectedEmployee as User,
          joined: new Date(Date.now()),
          projects: [],
        },
      ]);
    } catch (err) {
      console.log(err);
      dispatch(notifierActions.somethingWentWrong());
    }
  };

  return (
    <Stack direction={"row"} gap={3} paddingX={2} marginTop={3}>
      <Autocomplete
        multiple={false}
        onChange={(event: any, value: any) => {
          setSelectedEmployee(value);
        }}
        value={selectedEmployee}
        limitTags={2}
        id="multiple-limit-tags"
        options={followers}
        getOptionLabel={(option) => option.name}
        // defaultValue={""}
        renderInput={(params) => (
          <TextFieldCustom2
            {...params}
            variant="outlined"
            label="Add employees from you follower list..."
            // size="small"
            placeholder="Clients"
          />
        )}
        sx={{ width: { xs: "100%", md: "93%" } }}
      />
      <Button
        variant="outlined"
        size="small"
        endIcon={<AddOutlined />}
        onClick={handleAddEmployee}
      >
        <Typography variant="button">{`Add Employee`}</Typography>
      </Button>
    </Stack>
  );
};
