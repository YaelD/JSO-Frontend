import Fab from '@mui/material/Fab';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { useState, useContext } from 'react';
import TextField from '@mui/material/TextField';
import { Box, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { InterviewContext } from '../contexts/PositionContexts';
import DialogContentText from '@mui/material/DialogContentText';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

function InterviewDatePicker({ isEditMode, date, handleChangeInterview }) {
  const [value, setValue] = useState(date);

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

export default function InterviewInfoPopup({ openPopup, handleClosePopup, interview, index, isNewInterview }) {
  const [interviewValue, setInterviewValue] = useState(interview);
  const [isEditMode, setEditMode] = useState(isNewInterview);
  const [file, setFile] = useState();
  const changeInterview = useContext(InterviewContext);
  let isDisabled = !isNewInterview && !isEditMode;

  const handleEditClick = () =>{
    setEditMode(true);
  };

  function handleSave(event){
    changeInterview(interviewValue, index);
    if(isNewInterview){
      setInterviewValue(interview);
    }
    setEditMode(isNewInterview); //if it is new interview it will always set to true and if not it will always set to false
    handleClosePopup(event);

    //here create post request with fetch

    // event.preventDefault()
    // const url = 'http://localhost:3000/uploadFile';
    // const formData = new FormData();
    // formData.append('file', file);
    // formData.append('fileName', file.name);
    // const config = {
    //   headers: {
    //     'content-type': 'multipart/form-data',
    //   },
    // };
    // axios.post(url, formData, config).then((response) => {
    //   console.log(response.data);
    // });
  }

  function handleCancel(event){
    setInterviewValue(interview);
    setEditMode(isNewInterview);
    handleClosePopup(event);
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


  function handleChangeFile(event) {
    setFile(event.target.files[0]);
  }

  function handleDownloadFile(){
    const fileURL = window.URL.createObjectURL(file);
    // Setting various property values
    let alink = document.createElement('a');
    alink.href = fileURL;
    alink.download = file.name;
    alink.click();
  }
  

  return (
    <div>
    <form onSubmit={handleSave}>
      <Dialog open={openPopup} onClose={handleClosePopup} fullWidth maxWidth="sm">
        <DialogActions>
        {!isNewInterview && 
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
        }
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
          <Box sx={{display:"flex"}} >
          <Button variant="contained" component="label" disabled={isDisabled}>
            Upload File
            <input type="file" hidden onChange={handleChangeFile}/>
          </Button>
          {file && 
            <Button
              variant="text"
              startIcon={<FileDownloadIcon />}
              disabled={isDisabled}
              sx={{ml:2, mt:2}}
              onClick={handleDownloadFile}
            >
              {file?.name}
            </Button>
          }
          </Box>
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
          <Button onClick={handleSave} disabled={!isEditMode} type="submit">Save</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </DialogActions>
      </Dialog>
      </form>
    </div>
  );
}