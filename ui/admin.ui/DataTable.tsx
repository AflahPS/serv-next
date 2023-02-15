import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export const DataTable: React.FC<{ columns: GridColDef[]; rows: any[] }> = ({
  columns,
  rows,
}) => {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);

  const [dataTableRef] = useAutoAnimate();

  const handleChangeRowsPerPage = (pageSize: number) => {
    setRowsPerPage(pageSize);
  };

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  return (
    <Box
      sx={{
        // maxWidth: "85%",
        width: "100%",
        marginX: "auto",
        marginBottom: "16px",
        borderRadius: 3,
        height: "85vh",
        background:
          "linear-gradient(180deg, rgba(0,0,0,1) 8%, rgba(52,50,46,0) 18%)",
      }}
      bgcolor={"black"}
    >
      <DataGrid
        rows={rows}
        rowHeight={65}
        columns={columns}
        pageSize={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25, 100]}
        onPageSizeChange={handleChangeRowsPerPage}
        onPageChange={handlePageChange}
        page={page}
        // disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
        getRowId={(row) => row?._id!}
        rowSpacingType="margin"
      />
    </Box>
  );
};
