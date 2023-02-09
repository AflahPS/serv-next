import React from "react";
import { DataTable } from "../../ui";
import { COLUMNS, ROWS } from "../../constants";

export const ProjectTable = () => {
  return <DataTable rows={ROWS} columns={COLUMNS} />;
};
