import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

export default function Login() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async () => {
    setIsLoading(true);
  };

  const handleRegister = async () => {
    setIsLoading(true);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "75vh",
      }}
    >
      <Paper
        sx={{
          borderRadius: "1rem",
          background: "#ffffff",
        }}
      >
        <Stack
          component="form"
          spacing={2}
          sx={{
            px: 12,
            py: 7,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h5">Trainer Login</Typography>
          <TextField
            label="Username"
            disabled={isLoading}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ width: "30ch" }}
          />
          <TextField
            label="Password"
            disabled={isLoading}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ width: "30ch" }}
          />
          <Stack direction="row" spacing={3}>
            <Button
              variant="contained"
              onClick={handleLogin}
              disabled={isLoading}
            >
              Login
            </Button>
            <Button
              variant="outlined"
              onClick={handleRegister}
              disabled={isLoading}
            >
              Register
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
}
