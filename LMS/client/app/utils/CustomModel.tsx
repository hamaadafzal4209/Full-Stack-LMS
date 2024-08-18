import { Box, Modal, Typography } from "@mui/material";
import React, { FC } from "react";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  component: FC<any>;
  activeItem: any;
  route: string;
  setRoute?: (route: string) => void;
};

const CustomModel: FC<Props> = ({
  open,
  setOpen,
  component: Component,
  setRoute,
}) => {
  return (
    <>
      <Modal 
      className="p-4"
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 max-w-[450px] w-full bg-white dark:bg-slate-900 rounded-md shadow p-4 outline-none"
        >
          <Component setOpen={setOpen} setRoute={setRoute} />
        </Box>
      </Modal>
    </>
  );
};

export default CustomModel;
