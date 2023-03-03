import React, { useEffect, useState } from "react";

import { AddEmployee, EmployeeTable } from "../../ui";
import { Autocomplete } from "@mui/material";
import { doSearch, getEmployeesOfVendor, getFollowers } from "../../APIs";
import { Employee, User } from "../../types";
import { useSelector } from "react-redux";
import { StoreState } from "../../store";

export const Employees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  const token = useSelector((state: StoreState) => state.jwt.token);

  const getAndSetEmployees = async () => {
    try {
      const employees = await getEmployeesOfVendor(token);
      if (employees) setEmployees(employees);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getAndSetEmployees();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <AddEmployee employees={employees} setEmployees={setEmployees} />
      <EmployeeTable employees={employees} setEmployees={setEmployees} />
    </>
  );
};
