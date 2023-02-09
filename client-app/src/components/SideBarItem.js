import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

export default function SideBarItem({ icon, handleListItemClick, text, isExtended, isInsideSubList}) {

    return (
        <ListItemButton 
            onClick={handleListItemClick}
            sx={{pl: isInsideSubList === true ? 5 : 2 }}
        >
            <ListItemIcon>
                {icon}
            </ListItemIcon>
        <ListItemText primary={text} />
        {text === "Processes" ? (isExtended ? <ExpandLess /> : <ExpandMore />) : null}
        
        </ListItemButton>
    );
}