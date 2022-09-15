import { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import ReqForm from "./ReqForm.tsx";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  height: "85%",
  bgcolor: "#FFF5DD",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflow: "scroll",
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
      <Grid item>
        <Modal
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <ReqForm closeModal={handleClose} />
            </Box>
          </Fade>
        </Modal>
      </Grid>
    </Grid>
  );
}
