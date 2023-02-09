import React from "react";
import { ROWS, COLUMNS } from "../../constants";
import { DataTable } from "../../ui";

export const PostTable = () => {
  return <DataTable rows={ROWS} columns={COLUMNS} />;
};
