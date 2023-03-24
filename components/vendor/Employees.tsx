import React, { useEffect, useState } from "react";
import { AddEmployee, EmployeeTable } from "../../ui";
import { getEmployeesOfVendor } from "../../APIs";
import { Employee } from "../../types";
import { useStore } from "../../customHooks";

export const Employees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  const { token } = useStore();
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
