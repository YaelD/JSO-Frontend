import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Collapse from '@mui/material/Collapse';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import WorkOffIcon from '@mui/icons-material/WorkOff';
import WorkIcon from '@mui/icons-material/Work';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import SideBarItem from './SideBarItem';
import PeopleIcon from '@mui/icons-material/People';


const drawerWidth = 240;

class SideBarButtons {
  constructor(text, icon, subMenuButtons, isInsideSubList) {
    this.text = text;
    this.icon = icon;
    this.subMenuButtons = subMenuButtons;
    this.isInsideSubList = isInsideSubList;
  }
}


export default function SideBar() {

  const [isExtended, setIsExtended] = React.useState(true);

  const nestedListOfButtons = [
    new SideBarButtons("Pending", <WorkHistoryIcon />, null, true),
    new SideBarButtons("Open", <WorkIcon />, null, true),
    new SideBarButtons("Closed", <WorkOffIcon />, null, true),
  ];
  
  const ListOfButtons = [
    new SideBarButtons("Processes", <BusinessCenterOutlinedIcon />, nestedListOfButtons, false),
    new SideBarButtons("Networking", <PeopleIcon />, null, false),
  ];

//TODO: here need to render the corresponding page content according the button that was clicked
  function handleListItemClick(page){
    if(page === "Processes"){
      setIsExtended(!isExtended);
    }
    console.log(page);
  }

  function renderItem(item, index){
    return(
      <SideBarItem 
        handleListItemClick={()=>{handleListItemClick(item.text);}}
        icon={item.icon}
        text={item.text}
        isExtended={isExtended}
        key={item.text}
        isInsideSubList={item.isInsideSubList}
      />
    );
  }

  function renderListItems(list){
    return(
      list.map((item, index) => {
        return (
          <>
          {renderItem(item, index)}
          {item.subMenuButtons !== null && renderSubListItems(item.subMenuButtons)}
          </>
        );
      })
    );
  }

  function renderSubListItems(subMenuItems){
    return (
      <>
        <Collapse in={isExtended} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {subMenuItems.map((item, index) => {
              return (
                <>
                  {renderItem(item, index)}
                </> 
              );
            })}
          </List>
        </Collapse>
      </>
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
