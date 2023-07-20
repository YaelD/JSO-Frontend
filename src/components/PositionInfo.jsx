import { useState } from 'react';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { Container, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import PositionStatusStepper from './PositionStatusStepper';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Grid from '@mui/material/Grid';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';

function PositionDatePicker({ date, handleChangePositionDate }) {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        name="date"
        label="Creation date"
        value={dayjs(date)}
        inputFormat="DD/MM/YYYY"
        onChange={(newValue) => {
          handleChangePositionDate(newValue?.toDate() || new Date())

        }}
        disableFuture={true}
        renderInput={(params) => {
          return (
            <TextField {...params} />
          );
        }}
      />
    </LocalizationProvider>
  );
}


function TechnologyStack({ position, onChangeTechStack }) {
  const [techStackArr, setTechStackArr] = useState(position.techStack);

  return (
    <Autocomplete multiple options={[]} freeSolo value={techStackArr}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => {
          return option != null &&
            <Chip
              variant="outlined"
              label={option}
              {...getTagProps({ index })}
            />
        })
      }
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          placeholder="Tech stack"
          sx={{ width: "80ch" }}
        />
      )}
      onChange={(e, value, reason) => {
        if (reason === "createOption") {
          setTechStackArr((prevArr) => {
            return [...prevArr, e.target.value]
          })
        }
        else if (reason === "removeOption") {
          setTechStackArr(value)
        }
      }}
      onBlur={() => { onChangeTechStack(techStackArr) }}
    />
  )

}

export default function PositionInfo({ position }) {
  const [positionInfoValue, setPositionInfoValue] = useState(position.positionInfo);
  function handlePositionInfoChange(event) {
    const { name, value } = event.target;
    setPositionInfoValue((prevPositionValue) => {
      const newInfo = {
        ...prevPositionValue,
        [name]: value
      }
      position.positionInfo = newInfo;
      return position.positionInfo;
    });
  }

  function handleChangePositionTechStack(newTechStack) {
    setPositionInfoValue((prevInterviewValue) => {
      const newPositionInfo = {
        ...prevInterviewValue,
        techStack: newTechStack
      }
      position.positionInfo = newPositionInfo;
      return position.positionInfo;
    });

  }

  function handleChangePositionDate(newDate) {
    setPositionInfoValue((prevInterviewValue) => {
      const newPositionInfo = {
        ...prevInterviewValue,
        date: newDate
      }
      position.positionInfo = newPositionInfo;
      return position.positionInfo;
    });
  }

  return (
    <Container >
      <Grid container spacing={2} sx={{ width: "100%" }}>
        <Grid item xs={12} >
          <PositionStatusStepper position={position} />
        </Grid>
        <Grid item xs={12} >
          <Typography fontWeight="bold" variant='h6' align='left' >
            Position info
          </Typography>
        </Grid>
        <Grid item>
          <TextField
            name="role"
            value={positionInfoValue?.role}
            variant="outlined"
            onChange={handlePositionInfoChange}
            placeholder='Role'
          />
        </Grid>
        <Grid item>
          <TextField
            name="companyName"
            value={positionInfoValue?.companyName}
            variant="outlined"
            onChange={handlePositionInfoChange}
            placeholder='Company'

          />
        </Grid>
        <Grid item>
          <PositionDatePicker date={positionInfoValue.date} handleChangePositionDate={handleChangePositionDate} />
        </Grid>
        <Grid item xs={12} >
          <TextField
            name="positionLink"
            value={positionInfoValue?.positionLink}
            variant="outlined"
            type={"url"}
            onChange={handlePositionInfoChange}
            placeholder='Position Link'
            sx={{ width: "60ch" }}
          />
        </Grid>
        <Grid item xs={12} >
          <Typography fontWeight="bold" variant='h6' align='left' >
            About the position/company:
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <TextField
            name="about"
            value={positionInfoValue?.about}
            multiline
            rows={4}
            sx={{ width: "75ch" }}
            onChange={handlePositionInfoChange}
          />

        </Grid>
        <Grid item xs={12} >
          <Typography fontWeight="bold" variant='h6' align='left' >
            The technological stack of the company/position:
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TechnologyStack position={positionInfoValue} onChangeTechStack={handleChangePositionTechStack} />
        </Grid>

      </Grid>
    </Container>
  );
}