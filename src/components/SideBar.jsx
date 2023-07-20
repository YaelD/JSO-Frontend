import { useState } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import WorkIcon from '@mui/icons-material/Work';
import PeopleIcon from '@mui/icons-material/People';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import { Link as RouterLink, useLocation } from 'react-router-dom';


function SideBarItem({ handleListItemClick, item, isSelected}) {

  const location = useLocation();

  return (
      <ListItemButton
          sx={{pl: item.isInsideSubList === true ? 5 : 2 }}
          component={RouterLink} to={item.path ?? location.pathname}
          onClick={handleListItemClick} selected={isSelected === item.text}
      >
          <ListItemIcon>
              {item.icon}
          </ListItemIcon>
      <ListItemText primary={item.text} />
      
      </ListItemButton>
  );
}

const drawerWidth = 240;

class SideBarButtons {
  constructor(text, icon, path) {
    this.text = text;
    this.icon = icon;
    this.path = path;
  }
}


export default function SideBar() {

  const [isSelected, setIsSelected] = useState("Jobs");

  
  const ListOfButtons = [
    new SideBarButtons("Jobs", <WorkIcon />, "jobs"),
    new SideBarButtons("TODOs", <PeopleIcon />, "todos"),
  ];

  function handleListItemClick(itemText){
    setIsSelected(itemText);
  }

  function renderItem(item, index){
    return(
      <SideBarItem 
        handleListItemClick={()=>{handleListItemClick(item.text);}}
        item={item}
        isSelected={isSelected}
        key={item.text}
      />
    );
  }

  function renderListItems(list){
    return(
      list.map((item, index) => {
        return (
          <div key={item.text}>
          {renderItem(item, index)}
          </div>
        );
      })
    );
  }

  return (
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {renderListItems(ListOfButtons)}
          </List>          
        </Box>
      </Drawer>
  );
}
