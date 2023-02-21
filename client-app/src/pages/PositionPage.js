import { useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { Container } from '@mui/material';
import PositionInfo from '../components/PositionInfo';
import PositionInterviews from '../components/PositionInterviews';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Container fixed maxWidth='lg'>
            {children}
          </Container> 
        </Box>
      )}
    </>
  );
}


export default function PositionPage({position}) {
  const [value, setValue] = useState(0);
  const [positionValue, setPositionValue] = useState(position);
  console.log(positionValue.positionInfo);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function handlePositionChange(newPositionData, positionSectionToUpdate){
    setPositionValue((prevPositionValue)=>{
      return({
        ...prevPositionValue,
        [positionSectionToUpdate]:newPositionData
      })
    })
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', width:"100%" }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Position info" wrapped />
          <Tab label="Interviews" wrapped />
          <Tab label="Interviews practice" wrapped />
          <Tab label="Questions for interviewers" wrapped />
          <Tab label="Home assignments" wrapped />
          <Tab label="Rating" wrapped />
          <Tab label="Network" wrapped />
          <Tab label="TODO List" wrapped />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <PositionInfo 
          positionInfo={positionValue.positionInfo}
          handlePositionChange={handlePositionChange}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <PositionInterviews 
          interviews={positionValue.interviews}
          handlePositionChange={handlePositionChange}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </Box>
  );
}