import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import GenericForm from "./GenericForm.tsx";
import Modal from "@mui/material/Modal";
import { useState } from "react";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Fin() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Grid
      container
      direction="column"
      justifyContent="space-around"
      alignItems="center"
      sx={{ height: "100vh" }}
      wrap="nowrap"
    >
      <Grid item>
        <Button
          sx={{
            backgroundColor: "orange",
            color: "black",
            fontSize: "1.1rem",
            borderRadius: "10px",
            fontWeight: 900,
          }}
          onClick={handleOpen}
        >
          Fill a new Budget Request
        </Button>
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <GenericForm fields={["a", "b", "c"]} />
      </Modal>
    </Grid>
  );
}
