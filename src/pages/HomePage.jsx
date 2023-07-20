import React from "react";
import SideBar from "../components/SideBar"
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import positions from "../testData/positionsData";


export default function HomePage(){

    const p= positions;
    return(
        <>
        <SideBar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Toolbar />
            <Outlet />
            <Footer sx={{ mt: 5, mb: 5 }}/>
        </Box>
        </>
    );
}