import React from "react";
import Header from "../components/Header";
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Outlet } from "react-router-dom";


const themeLight = createTheme ({
    palette: {
      background: {
        default: "#e3e2de"
      }
    }
  });
  

export default function RootPage(){
    return(
        <>
            <ThemeProvider theme={themeLight}>
                <Box sx={{ display: 'flex' }}>
                    <CssBaseline />
                    <Header />
                    <Outlet />
                </Box>
            </ThemeProvider>
        </>
    );
}
