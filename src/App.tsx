import { AppBar, Stack } from "@mui/material";
import { BrowserRouter, Routes } from "react-router";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Stack>
          <AppBar position="static">Hello, world!</AppBar>
          <Routes>
            
          </Routes>
        </Stack>
      </BrowserRouter>
    </>
  );
}
