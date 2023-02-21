import React from "react";
import Header from "./Header";
import SideBar from "./SideBar";
import Box from '@mui/material/Box';
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import Toolbar from '@mui/material/Toolbar';
import positions from "../testData/position";
import PositionPage from "../pages/PositionPage";
import CssBaseline from '@mui/material/CssBaseline';
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
          {/* <PendingProcesses /> */}
          <PositionPage position={positions[0]}/>
          {/* TODO: here will be the content of the page */}
        </Box>
      </Box>
    </>
  );
}

export default App;
