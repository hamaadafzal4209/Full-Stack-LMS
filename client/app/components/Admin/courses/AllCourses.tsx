import React, { FC, useState } from "react";
import { Box, Button, Modal } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useTheme } from "next-themes";
import Link from "next/link";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import { styles } from "@/app/styles/style";
import { useGetAllCoursesMutation } from "@/app/redux/features/courses/coursesApi";
import Loader from "../../Loader/Loader";
import { format } from "timeago.js";

type Props = {};

const AllCourses: FC<Props> = (Props) => {
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);
  const [courseId, setCourseId] = useState("");

  const [data, { isLoading, error }] = useGetAllCoursesMutation({});

  const columns:any = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.5,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "title",
      headerName: "Course Title",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "ratings",
      headerName: "Ratings",
      flex: 0.5,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "purchased",
      headerName: "Purchased",
      flex: 0.5,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "created_at",
      headerName: "Created At",
      flex: 0.5,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "edit",
      headerName: "Edit",
      flex: 0.4,
      align: "center",
      headerAlign: "center",
      renderCell: (params: any) => (
        <Link
          href={`/admin/edit-course/${params.row.id}`}
          className="flex items-center justify-center"
        >
          <FiEdit2 className="dark:text-white text-black " size={20} />
        </Link>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      flex: 0.5,
      align: "center",
      headerAlign: "center",
      renderCell: (params: any) => (
        <Button
          onClick={() => {
            setOpen(true);
            setCourseId(params.row.id);
          }}
        >
          <AiOutlineDelete
            className="dark:text-white text-black mx-auto"
            size={20}
          />
        </Button>
      ),
    },
  ];

  const rows: any = [];

  {
    data &&
      data.courses.forEach((course: any) =>
        rows.push({
          id: course._id,
          title: course.name, 
          ratings: course.ratings,
          purchased: course.purchased,
          created_at: format(course.createdAt),
        })
      );
  }

  return (
    <div className="w-full">
      {isLoading ? (
        <>
          <Loader />
        </>
      ) : (
        <Box m="20px">
          <Box
            m="40px 0 0 0"
            height="80vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
                outline: "none",
              },
              "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-sortIcon": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-row": {
                color: theme === "dark" ? "#fff" : "#000",
                borderBottom:
                  theme === "dark"
                    ? "1px solid #ffffff30!important"
                    : "1px solid #ccc!important",
              },
              "& .MuiTablePagination-root": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none!important",
                display: "flex",
                justifyContent: "center",
              },
              "& .name-column--cell": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
                borderBottom: "none",
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: theme === "dark" ? "#1F2A40" : "#F2F0F0",
              },
              "& .MuiDataGrid-footerContainer": {
                color: theme === "dark" ? "#fff" : "#000",
                borderTop: "none",
                backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
              },
              "& .MuiCheckbox-root": {
                color:
                  theme === "dark" ? `#b7ebde !important` : `#000 !important`,
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `#fff !important`,
              },
            }}
          >
            <DataGrid
              checkboxSelection
              rows={rows}
              columns={columns}
              autoHeight
              className="w-full lg:w-auto"
            />
          </Box>
          {open && (
            <Modal
              open={open}
              onClose={() => setOpen(false)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
                <h1 className={`${styles.title} text-center`}>
                  Are you sure you want to delete this course?
                </h1>
                <div className="flex w-full items-center justify-between mb-6 mt-4">
                  <Button
                    className={`${styles.button} !w-[120px] h-[30px] bg-[#47d097] text-sm`}
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className={`${styles.button} !w-[120px] h-[30px] bg-[#d63f3f] text-sm`}
                  >
                    Delete
                  </Button>
                </div>
              </Box>
            </Modal>
          )}
        </Box>
      )}
    </div>
  );
};

export default AllCourses;
