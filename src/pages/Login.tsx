import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAuth } from "../util/auth/AuthContext";
import { Link, useNavigate } from "react-router";

export default function Login() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  // TODO: Display error
  const [error, setError] = useState<string | null>(null);
  const { id, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!!id) navigate("/");
  }, [id]);

  const handleLogin = async () => {
    setIsLoading(true);
    await login({ username, password });
    setIsLoading(false);
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
          <Typography variant="h5">Login as a Trainer</Typography>
          <TextField
            label="Username"
            disabled={isLoading}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ width: "30ch" }}
          />
          <TextField
            label="Password"
            type="password"
            disabled={isLoading}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ width: "30ch" }}
          />
          <Link to="/register">Don't have an account? Register here.</Link>
          <Button
            variant="contained"
            onClick={handleLogin}
            disabled={isLoading}
          >
            Login
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}
