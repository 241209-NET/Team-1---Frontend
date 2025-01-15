import { Alert, AlertColor, Snackbar } from "@mui/material";
import { useState } from "react";

type SnackAlertHook = {
  autoHideDuration?: number;
};

export function useSnackAlert(props?: SnackAlertHook) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<AlertColor>("info");

  const handleClose = () => {
    setOpen(false);
  };

  const setAlert = (message: string, severity: AlertColor = "info") => {
    setMessage(message);
    setSeverity(severity);
    setOpen(true);
  };

  const alert = {
    setInfo: (message: string) => setAlert(message, "info"),
    setSuccess: (message: string) => setAlert(message, "success"),
    setWarning: (message: string) => setAlert(message, "warning"),
    setError: (message: string) => setAlert(message, "error"),
  };

  const SnackAlert = () => (
    <Snackbar
      open={open}
      autoHideDuration={props?.autoHideDuration ?? 5000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );

  return { SnackAlert, setAlert, alert, isOpen: open };
}
