import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ px: 5, py: 2 }}>
        <Typography
          variant="h5"
          noWrap
          component="div"
          sx={{ display: { xs: "none", sm: "block" } }}
        >
          PokéManager
        </Typography>
      </AppBar>
    </Box>
  );
}
