import { useState } from 'react';
import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import Stepper from '@mui/material/Stepper';
import StepLabel from '@mui/material/StepLabel';
import TextField from '@mui/material/TextField';
import { Container, Typography } from '@mui/material';



function PositionStatusStepper() {
  const steps = [
    'Select master blaster campaign settings',
    'Create an ad group',
    'Create an ad',
  ];

  return (
    <Box sx={{ width: '100%', margin:5, mb:8}}>
      <Stepper activeStep={1} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}

export default function PositionInfo({ position }) {
  console.log(position);

  const [positionInfoValue, setPositionInfoValue] = useState(position.positionInfo);
  
  function handlePositionInfoChange(event){
    const {name, value} = event.target;
    setPositionInfoValue((prevPositionValue)=>{
      const newInfo = {
        ...prevPositionValue,
        [name]:value
      }
      position.positionInfo = newInfo;
      return position.positionInfo;
    });
  }

  return (
    <Box
      noValidate
      autoComplete="off"
    >
      <PositionStatusStepper />
      <Container sx={{display: "flex", alignItems:"baseline"}} fixed>
        <Typography sx={{mr:2}}>
            Role: 
          </Typography>
          <TextField
            name="role"
            multiline
            maxRows={4}
            value={positionInfoValue?.role}
            variant="filled"
            sx={{width:"50ch"}}
            onChange={handlePositionInfoChange}
          />
          <Typography sx={{ml:2, mr:2}}>
            Company Name: 
          </Typography>
          <TextField
            name="companyName"
            multiline
            maxRows={4}
            value={positionInfoValue?.companyName}
            variant="filled"
            sx={{width:"50ch"}}
            onChange={handlePositionInfoChange}
          />
      </Container>
      <Container fixed>
        <Typography sx={{mt:5}}>
          Position Link/Description: 
        </Typography>
        <TextField
          name="positionLink"
          multiline
          maxRows={4}
          value={positionInfoValue?.positionLink}
          variant="filled"
          sx={{width:"50ch"}}
          onChange={handlePositionInfoChange}
        />
      </Container>
      <Container fixed>
        <Typography sx={{mt:5}}>
          About the position/company: 
        </Typography>
        <TextField
            name="about"
            value={positionInfoValue?.about}
            multiline
            rows={4}
            sx={{width:"75ch"}}
            onChange={handlePositionInfoChange}
          />
      </Container>
      <Container fixed>
        <Typography sx={{mt:5}}>
          The technological stack of the company/position:
        </Typography>
        <TextField
            name="techStack"
            value={positionInfoValue?.techStack}
            multiline
            rows={4}
            sx={{width:"75ch"}}
            onChange={handlePositionInfoChange}
        />
      </Container>
    </Box>
  );
}