import { Modal, Grid, Box } from "@mui/material";

const CustomEmptyModal = ({
  open,
  onClose,
  isScrollable = false,
  isSmall = false,
  children,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "background.default",
        }}
        className={`${isSmall === true ? "w-2/5" : "w-[95%]"}  ${
          isScrollable === true ? "h-[95%] overflow-scroll" : ""
        } px-3 rounded-lg border border-neutral-700`}
      >
        {children}
      </Box>
    </Modal>
  );
};

export default CustomEmptyModal;
