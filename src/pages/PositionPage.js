import { useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { Button, Container } from '@mui/material';
import PositionInfo from '../components/PositionInfo';
import PositionInterviews from '../components/PositionInterviews';
import QuestionsForInterviewers from '../components/QuestionsForInterviewers';
import HomeAssignments from '../components/HomeAssignments';
import Network from '../components/Network';
import Stack from '@mui/material/Stack';
import positions from '../testData/positionsData';
import { useLocation, useNavigate } from 'react-router-dom';

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

export default function PositionPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [value, setValue] = useState(0);

  const position = location.state;
  console.log(position);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function handleSave(){
    const currPositions = positions;
    if(!currPositions.has(position)){
      currPositions.set(position.id, position);
    }
    navigate(-1); //go back to the previous url
  }

  function handleCancel(){
    navigate(-1);
  }

  return (
    <Box sx={{ width: '100%', m: 10 }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', width:"100%" }}>
        <Stack spacing={2} direction="row" sx={{ justifyContent: "flex-end" }}>
          <Button variant="contained" onClick={handleSave}>save</Button>
          <Button variant="contained" onClick={handleCancel}>cancel</Button>
        </Stack>
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
          position={position}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <PositionInterviews 
          position={position}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        <QuestionsForInterviewers 
          position={position}
        />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <HomeAssignments 
          position={position}
        />
      </TabPanel>
      <TabPanel value={value} index={5}>
      </TabPanel>
      <TabPanel value={value} index={6}>
        <Network
          position={position}
        />
      </TabPanel>
    </Box>
  );
}