import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


export default function Header(){
    return(
        <>
            <AppBar
                position="static"
                color="default"
                elevation={0}
                sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
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
                    <Button href="#" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
                        Jobs
                    </Button>
                    <Button href="#" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
                        networking
                    </Button>
                </Toolbar>
            </AppBar>
        </>
    );
}