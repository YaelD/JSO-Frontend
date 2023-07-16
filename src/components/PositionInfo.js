import { useState } from 'react';
import Box from '@mui/material/Box';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { Container, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import PositionStatusStepper from './PositionStatusStepper';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';


function PositionDatePicker({ date, handleChangePositionDate }) {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        name="date"
        label="Date"
        value={dayjs(date)}
        inputFormat="DD/MM/YYYY"
        onChange={(newValue) => {
          console.log(newValue.toDate());
          handleChangePositionDate(newValue.toDate());
        }}
        disableFuture={true}
        renderInput={(params) => {
          return (
            <TextField 
              {...params}
              sx={{width:250, ml: 3, mt:2}}
            />
          );
        }}
      />
    </LocalizationProvider>
  );
}


export default function PositionInfo({ position }) {
  console.log(position);

  const [positionInfoValue, setPositionInfoValue] = useState(position.positionInfo);
  const obj = Object.values(position);
  console.log(obj.positionInfo);
  
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

  function handleChangePositionDate(newDate){
    setPositionInfoValue((prevInterviewValue)=>{
      const newPositionInfo = {
        ...prevInterviewValue,
        date: newDate
      }
      position.positionInfo = newPositionInfo;
      console.log(newPositionInfo);
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
        <PositionDatePicker sx={{mb:5}} date={positionInfoValue.date} handleChangePositionDate={handleChangePositionDate}/>
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