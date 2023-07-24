import { useMemo } from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Button, Stack } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';



export default function Header() {
    const location = useLocation()

    const isUserLoggedIn = useMemo(() => {
        const currPage = location.pathname;
        return (
            currPage.includes("jobs") || currPage.includes("/") || currPage.includes("todos")
        )
    }, [location]);

    return (
        <>
            <AppBar
                color="default"
                position="fixed"
                elevation={0}
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
            >
                <Toolbar sx={{}}>
                    <Box
                        component="img"
                        sx={{
                            height: 64,
                        }}
                        alt="Your logo."
                        src={"/images/JSO.png"}
                    />
                    <Stack direction="row" sx={{ justifyContent: "flex-end", width: "100%" }}>
                        {isUserLoggedIn ?
                            (
                                <Button component={Link} to="/">
                                    Logout
                                </Button>

                            ) : (
                                <>
                                    <Button component={Link} to="/signin">
                                        SignIn
                                    </Button>
                                    <Button component={Link} to="/signup">
                                        SignUp
                                    </Button>
                                </>
                            )}
                    </Stack>
                </Toolbar>
            </AppBar>
        </>
    );
}