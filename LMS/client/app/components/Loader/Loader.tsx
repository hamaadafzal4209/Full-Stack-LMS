"use client"
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

type Props = {};

const Loader = (props: Props) => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    </div>
  );
};

export default Loader;
