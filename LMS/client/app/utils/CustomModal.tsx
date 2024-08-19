import { Box, Modal } from "@mui/material";
import React, { FC } from "react";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  component: FC<any>;
  activeItem: any;
  route: string;
  setRoute?: (route: string) => void;
};

const CustomModal: FC<Props> = ({
  open,
  setOpen,
  component: Component,
  setRoute,
}) => {
  return (
    <>
      <div className="p-4 min-h-screen">
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="flex items-center justify-center p-4"
        >
          <Box
            className="relative max-w-[450px] w-full bg-white dark:bg-slate-900 rounded-md shadow p-4 outline-none overflow-y-auto no-scrollbar max-h-[90vh]"
          >
            <Component setOpen={setOpen} setRoute={setRoute} />
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default CustomModal;