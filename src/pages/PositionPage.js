import { useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Stack from '@mui/material/Stack';
import Network from '../components/Network';
import { Button, Container } from '@mui/material';
import PositionInfo from '../components/PositionInfo';
import HomeAssignments from '../components/HomeAssignments';
import { useLocation, useNavigate } from 'react-router-dom';
import PositionInterviews from '../components/PositionInterviews';
import QuestionsForInterviewers from '../components/QuestionsForInterviewers';
import { usePostNewPosition, usePutNewPosition } from '../utils/apiCalls';

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
  const {postNewPosition, newPosition} = usePostNewPosition();
  const {putPosition, updatedPosition} = usePutNewPosition();
  console.log(position);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function handleSave(){
    if(!position.id){
      postNewPosition(position);
    }
    else{
      putPosition(position);
    }
    navigate(-1); //go back to the previous url
    console.log(position);
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
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Position info" />
          <Tab label="Interviews" />
          <Tab label="Questions for interviewers" />
          <Tab label="Home assignments" />
          <Tab label="Network" />
          <Tab label="TODO List" />
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
        <QuestionsForInterviewers 
          position={position}
        />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <HomeAssignments 
          position={position}
        />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <Network
          position={position}
        />
      </TabPanel>
      <TabPanel value={value} index={5}>
      </TabPanel>
    </Box>
  );
}