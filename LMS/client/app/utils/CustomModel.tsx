import { Box, Modal } from "@mui/material";
import React, { FC } from "react";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  component: any;
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
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white darl:bg-slate-900 shadow p-4 outline-none"
        sx={{
          width: "auto",
          maxWidth: "600px",
          bgcolor: "background.paer",
          borderRadius: 2,
        }}
      >
        <Component setOpen={setOpen} setRoute={setRoute} />
      </Box>
    </Modal>
  );
};

export default CustomModel;
