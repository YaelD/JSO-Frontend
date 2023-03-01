import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { Box } from '@mui/material';

export default function Network({ networkConnections, handlePositionChange }) {
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
    {networkConnections.map((connection)=>{
        return(
            <>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                <Avatar alt={connection.name}/>
                </ListItemAvatar>
                <ListItemText sx={{display:"flex"}}
                primary={
                    <React.Fragment>
                    <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body1"
                        color="text.primary"
                    >
                        {connection.name}
                    </Typography>
                    <br/>
                    <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.secondary"
                    >
                        {connection.role}
                    </Typography>
                    </React.Fragment>
                }
                secondary={
                    <React.Fragment>
                    <Box sx={{ml:10}}>
                        <Link href={connection.linkToLinkedin}>Linkedin profile</Link>
                        <Typography></Typography>
                    </Box>
                    {/* <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.secondary"
                    >
                        Software Developer
                    </Typography>
                    <br/> */}
                    
                    {/* {" — I'll be in your neighborhood doing errands this…"} */}
                    </React.Fragment>
                }
                />
            </ListItem>
            <Divider variant="inset" component="li" />
            </>
        );
    })}
    </List>
  );
}