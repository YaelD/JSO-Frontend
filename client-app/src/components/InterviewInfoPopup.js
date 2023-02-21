import Fab from '@mui/material/Fab';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { useState, useContext } from 'react';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { InterviewContext } from '../contexts/InterviewContext';
import DialogContentText from '@mui/material/DialogContentText';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

function InterviewDatePicker({ isEditMode, date, handleChangeInterview }) {
  const [value, setValue] = useState(date);

  console.log(String(value));
  console.log(JSON.stringify(value));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        name="date"
        label="Date"
        value={value}
        inputFormat="DD/MM/YYYY"
        disabled={isEditMode ? false : true}
        onChange={(newValue) => {
          setValue(newValue);
          handleChangeInterview(newValue);
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

export default function InterviewInfoPopup({ open, handleClose, interview, index, isNewInterview }) {
  const [interviewValue, setInterviewValue] = useState(interview);
  const [isEditMode, setEditMode] = useState(isNewInterview);


  const changeInterview = useContext(InterviewContext);

  const handleEditClick = () =>{
    setEditMode(true);
  };

  function handleSave(event){
    changeInterview(interviewValue, index);
    if(isNewInterview){
      setInterviewValue(interview);
    }
    setEditMode(isNewInterview); //if it is new interview it will always set to true and if not it will always set to false
    handleClose(event);
  }

  function handleCancel(event){
    setInterviewValue(interview);
    setEditMode(isNewInterview);
    handleClose(event);
  }

  function handleChangeInterview(event){
    const {name, value} = event.target;
    setInterviewValue((prevInterviewValue)=>{
      const newInterview = {
        ...prevInterviewValue,
        [name]:value
      }
      return newInterview;
    });
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogActions>
          <Fab 
            color="primary"
            aria-label="edit"
            size='small'
            disabled={isEditMode}
            sx={{mt:1, mr:1}}
            onClick={handleEditClick}
          >
            <EditIcon />
          </Fab>
        </DialogActions>
        <DialogTitle>
          <TextField
            name={"title"}
            variant="standard"
            value={interviewValue.title}
            placeholder="Title"
            margin="dense"
            fullWidth
            disabled={!isEditMode}
            onChange={handleChangeInterview}
          />
        </DialogTitle>
        <InterviewDatePicker isEditMode={isEditMode} date={interviewValue.date} handleChangeInterview={handleChangeInterview}/>
        <DialogContent>
          <DialogContentText sx={{mt:2}}>
            Conclusions:
          </DialogContentText>
          <TextField
            name={"conclusions"}
            multiline
            rows={10}
            value={interviewValue.conclusions}
            fullWidth
            disabled={!isEditMode}
            onChange={handleChangeInterview}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSave} disabled={!isEditMode}>Save</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}