import { Box, Stack } from "@mui/material";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Pokemon from "./pages/Pokemon";
import Login from "./pages/Login";
import { AuthProvider } from "./util/auth/AuthContext";

export default function App() {
  return (
    <Box
      sx={{
        maxWidth: "100vw",
        minHeight: "100vh",
        background: "linear-gradient(45deg, #6bdcfe 30%, #5398ff 90%)",
        backgroundAttachment: "fixed",
        overflowX: "hidden",
      }}
    >
      <BrowserRouter>
        <AuthProvider>
          <Stack>
            <Navbar />
            <Box
              sx={{
                margin: "0 auto",
                "margin-top": "4rem",
                maxWidth: "1250px",
                padding: "1rem",
              }}
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/pokemon/:id" element={<Pokemon />} />
                <Route path="login" element={<Login />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </Box>
          </Stack>
        </AuthProvider>
      </BrowserRouter>
    </Box>
  );
}
