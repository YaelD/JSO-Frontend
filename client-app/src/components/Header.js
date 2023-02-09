import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function Header(){
    
    return(
        <>
            <AppBar
                color="default"
                position="fixed"
                elevation={0}
                // sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
            >
                <Toolbar sx={{ flexWrap: 'wrap' }}>
                    <Box
                        component="img"
                        sx={{
                        height: 64,
                        }}
                        alt="Your logo."
                        src={"/images/JSO.png"}
                    />
                    <Typography sx={{ flexGrow: 1 }}>
                    </Typography>
                </Toolbar>
            </AppBar>
        </>
    );
}