import { Button, Box, Stack } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import { useAuth } from "../util/auth/AuthContext";
import { useNavigate } from "react-router";

export default function Navbar() {
  const { id, logout } = useAuth();
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate("/");
  };

  const navigateToLogin = () => {
    navigate("/login");
  };

  const navigateToTeam = () => {
    navigate("/team");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ px: 5, py: 2, bgcolor: "#aebdf550" }}>
        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
          <Typography
            variant="h5"
            noWrap
            component="div"
            onClick={navigateToHome}
            sx={{ color: "#000000", cursor: "pointer" }}
          >
            PokéManager
          </Typography>
          <Stack
            direction="row"
            spacing={3}
            sx={{ color: "#000000", alignItems: "center" }}
          >
            <Button onClick={navigateToHome} sx={{ color: "#000000" }}>
              Home
            </Button>
            <Box sx={{ width: "2px", height: "100%", bgcolor: "#000000" }} />
            <Button
              onClick={navigateToTeam}
              disabled={!id}
              sx={{ color: "#000000" }}
            >
              Team
            </Button>
          </Stack>
          {id ? (
            <Button variant="contained" onClick={logout}>
              Logout
            </Button>
          ) : (
            <Button variant="contained" onClick={navigateToLogin}>
              Login
            </Button>
          )}
        </Stack>
      </AppBar>
    </Box>
  );
}
