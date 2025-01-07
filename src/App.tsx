import { Box, Stack } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        background: "linear-gradient(45deg, #6bdcfe 30%, #5398ff 90%)",
      }}
    >
      <BrowserRouter>
        <Stack>
          <Navbar />
          <Box
            sx={{
              margin: "0 auto",
              maxWidth: "1200px",
              padding: "1rem",
            }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </Box>
        </Stack>
      </BrowserRouter>
    </Box>
  );
}
