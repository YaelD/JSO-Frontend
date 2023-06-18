import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Typography } from '@mui/material';
import PositionStatusStepper from './PositionStatusStepper';


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
      <PositionStatusStepper position={position} />
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