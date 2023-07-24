import { useState } from 'react';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Stack from '@mui/material/Stack';
import Network from '../components/Network';
import Toolbar from '@mui/material/Toolbar';
import { Button, Container } from '@mui/material';
import { ProcessStatus } from '../utils/position';
import PositionInfo from '../components/PositionInfo';
import HomeAssignments from '../components/HomeAssignments';
import { useLocation, useNavigate } from 'react-router-dom';
import PositionTodoList from '../components/PositionTodoList';
import PositionInterviews from '../components/PositionInterviews';
import { usePostNewPosition, usePutNewPosition } from '../utils/apiCalls';
import QuestionsForInterviewers from '../components/QuestionsForInterviewers';


function TabPanel({ children, value, index }) {
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
  const { postNewPosition } = usePostNewPosition();
  const { putPosition } = usePutNewPosition();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function handleSave() {
    if (!position.id) {
      postNewPosition(position);
    }
    else {
      putPosition(position);
    }
    navigate(-1); //go back to the previous url
  }

  function handleCancel() {
    navigate(-1);
  }

  function handleClosePosition() {
    position.positionInfo.status = ProcessStatus.Closed;
    putPosition(position);
    navigate(-1);
  }

  return (
    <Box sx={{ width: '100%', }}>
      <Toolbar />
      <Stack position="fixed" direction="row"
        sx={{
          borderBottom: 1, opacity: 1, width: "100%", pr: 5, pl: 5, backgroundColor: "white",
          zIndex: (theme) => theme.zIndex.drawer + 1
        }}>
        <Tabs value={value} onChange={handleChange} variant="scrollable" sx={{ width: "100%" }}>
          <Tab label="Position info" />
          <Tab label="Interviews" />
          <Tab label="Questions for interviewers" />
          <Tab label="Home assignments" />
          <Tab label="Network" />
          <Tab label="TODO List" />
        </Tabs>
        <Stack spacing={2} direction="row" sx={{ justifyContent: "flex-end", alignItems: "center", overflow: "visible" }}>
          <Button variant="contained" size="small" onClick={handleSave} >save</Button>
          <Button variant="contained" size="small" onClick={handleCancel} >cancel</Button>
          <Button variant="contained" color="error" size="small" onClick={handleClosePosition} >Close</Button>

        </Stack>
      </Stack>
      <Toolbar />
      <TabPanel value={value} index={0}>
        <PositionInfo position={position} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <PositionInterviews position={position} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <QuestionsForInterviewers position={position} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <HomeAssignments position={position} />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <Network position={position} />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <PositionTodoList position={position} />
      </TabPanel>
    </Box>
  );
}