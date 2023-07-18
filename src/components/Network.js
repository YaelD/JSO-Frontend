import { useState } from 'react';
import Fab from '@mui/material/Fab';
import List from '@mui/material/List';
import Link from '@mui/material/Link';
import Dialog from '@mui/material/Dialog';
import Avatar from '@mui/material/Avatar';
import { Box, Button } from '@mui/material';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import ListItem from '@mui/material/ListItem';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import ListItemText from '@mui/material/ListItemText';
import { NetworkConnection } from '../utils/position';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import FormControlLabel from '@mui/material/FormControlLabel';
import DialogContentText from '@mui/material/DialogContentText';



function ConnectionPopup({ connection, handleClosePopup, handleChangeConnections, openPopup, isNewConnection }){
    const [connectionValue, setConnectionValue] = useState(connection);
    const [checked, setChecked] = useState(connection.appliedMe);

    function handleChangeCheckboxValue(event){
        setChecked(event.target.checked);
        setConnectionValue((prevConnectionValue)=>{
            const newConnection = {
              ...prevConnectionValue,
              appliedMe:event.target.checked
            }
            return newConnection;
          });
      };

    function handleChangeConnectionValue(event){
        const {name, value} = event.target;
        setConnectionValue((prevConnectionValue)=>{
          const newConnection = {
            ...prevConnectionValue,
            [name]:value
          }
          return newConnection;
        });
    }

    function handleSave(){
        if(isNewConnection){
            handleChangeConnections("Add", connectionValue);
            setConnectionValue(new NetworkConnection());
        } else {
            handleChangeConnections("Update", connectionValue);
        }
        handleClosePopup();
    }

    function handleCancel(){
        setConnectionValue(connection);
        handleClosePopup();
    }

    return(
      <Dialog open={openPopup} onClose={handleClosePopup} fullWidth maxWidth="sm">
        <DialogTitle>
        Create a contact:
        </DialogTitle>
        <DialogContent>
            <DialogContentText sx={{mt:2}}>
                Name:
            </DialogContentText>
            <TextField
                name={"name"}
                variant="standard"
                value={connectionValue.name}
                margin="dense"
                fullWidth
                required
                onChange={handleChangeConnectionValue}
            />
            <DialogContentText sx={{mt:3}}>
                role:
            </DialogContentText>
            <TextField
                name={"role"}
                multiline
                maxRows={2}
                value={connectionValue.role}
                fullWidth
                required
                onChange={handleChangeConnectionValue}
            />
            <DialogContentText sx={{mt:3}}>
                Link to Linkedin profile:
            </DialogContentText>
            <TextField
                name={"linkToLinkedin"}
                multiline
                maxRows={2}
                value={connectionValue.linkToLinkedin}
                fullWidth
                required
                onChange={handleChangeConnectionValue}
            />
            <DialogContentText sx={{mt:2}}>
                <FormControlLabel 
                control={
                <Checkbox
                    checked={checked}
                    onChange={handleChangeCheckboxValue}
                    inputProps={{ 'aria-label': 'controlled' }}
                />} 
                label="Applied the CV" 
            />
            </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSave} disabled={
            !connectionValue.name || !connectionValue.linkToLinkedin || !connectionValue.role
          }>Save</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </DialogActions>
      </Dialog>
    );
}

function ConnectionListItem({connection, handleChangeConnections}){
    const [openPopup, setOpenPopup] = useState(false);

    function handleListItemClick(){
        setOpenPopup(true);
    }

    function handleLinkClick(event){
        event.stopPropagation();
    }

    function handleDeleteBtnClick(event){
        event.stopPropagation();
        handleChangeConnections("Delete", connection);
    }

    return(
        <>
        <ListItem 
            alignItems="flex-start"
            onClick={handleListItemClick}
            secondaryAction={
              <IconButton edge="end" aria-label="delete">
                <DeleteIcon onClick={handleDeleteBtnClick}/>
              </IconButton>
            }
            sx={{width:0.8}}
        >
            <ListItemAvatar>
                <Avatar alt={connection.name}/>
            </ListItemAvatar>
            <ListItemText sx={{display:"flex"}}
            primary={
                <>
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
                </>
            }
            />
            <ListItemText sx={{display:"flex"}} 
            secondary={
                <>
                    <Link onClick={handleLinkClick} href={connection.linkToLinkedin}>Linkedin profile</Link>
                    <br/>
                    <Typography 
                        sx={{ display: 'flex' }}
                        component="span"
                        variant="body2"
                        color="text.secondary"
                    >
                    applied my CV: {String(connection.appliedMe)}</Typography>
                </>
            }
            />
        </ListItem>
        <ConnectionPopup
                connection={connection}
                handleClosePopup={()=>{
                    setOpenPopup(false);
                }}
                handleChangeConnections={handleChangeConnections}
                openPopup={openPopup}
                isNewConnection={false}
            />
        </>
    );
}

export default function Network({ position }) {
    const [networkConnectionsValue, setNetworkConnectionsValue] = useState(position.networkConnections);
    const [openPopup, setOpenPopup] = useState(false);

    function handleAddClick(){
        setOpenPopup(true);
    }

    function handleAddNewConnection(newConnection){
        const newConnections = [...networkConnectionsValue, newConnection];
        setNetworkConnectionsValue(newConnections);
        position.networkConnections = newConnections;
    }

    function handleDeleteConnection(connectionToDelete){
        const newConnections = networkConnectionsValue.filter((connection)=>{
            return(connection.id !== connectionToDelete.id);  
        });
        setNetworkConnectionsValue(newConnections);
        position.networkConnections = newConnections;
    }

    function handleEditConnection(connectionToUpdate){
        const newConnections = networkConnectionsValue.map((connection)=>{
            if(connection.id === connectionToUpdate.id){
                return connectionToUpdate;
            }
            else{
                return connection;
            }
        });
        setNetworkConnectionsValue(newConnections);
        position.networkConnections = newConnections;
    }

    function handleChangeConnections(operation, connection){
        switch(operation){
            case "Add":
                handleAddNewConnection(connection);
                break;
            case "Update":
                handleEditConnection(connection);
                break;
            case "Delete":
                handleDeleteConnection(connection);
                break;
            default:
                break;
        }

    }

    return (
        <Box>
            <Fab color="primary" aria-label="add" sx={{mb:5}} size="medium" onClick={handleAddClick}>
                <AddIcon />
            </Fab>
            <List sx={{ width: '100%'}}>
                {networkConnectionsValue.map((connection)=>{
                return(
                    <div key={connection.id}>
                    <ConnectionListItem 
                        connection={connection}
                        handleChangeConnections={handleChangeConnections}
                    />
                    <Divider variant="inset" component="li" sx={{width:0.8}}/>
                    </div>
                );
            })}
            </List>
            <ConnectionPopup
                connection={new NetworkConnection()}
                handleClosePopup={()=>{
                    setOpenPopup(false);
                }}
                handleChangeConnections={handleChangeConnections}
                openPopup={openPopup}
                isNewConnection={true}
            />
        </Box>

    );
}