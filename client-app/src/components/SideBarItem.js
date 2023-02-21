import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

export default function SideBarItem({ item, handleListItemClick, isExtended}) {

    return (
        <ListItemButton
            onClick={handleListItemClick}
            sx={{pl: item.isInsideSubList === true ? 5 : 2 }}
        >
            <ListItemIcon>
                {item.icon}
            </ListItemIcon>
        <ListItemText primary={item.text} />
        {item.text === "Processes" ? (isExtended ? <ExpandLess /> : <ExpandMore />) : null}
        
        </ListItemButton>
    );
}