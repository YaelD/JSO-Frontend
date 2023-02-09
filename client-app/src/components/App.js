import React from "react";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Header from "./Header";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import SideBar from "./SideBar";
import PendingProcesses from "../pages/PendingProcesses";

function App() {
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Header />
        <SideBar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <PendingProcesses />
          {/* TODO: here will be the content of the page */}
        </Box>
      </Box>
    </>
  );
}

export default App;
