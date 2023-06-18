import { useState } from 'react';
import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Dialog from '@mui/material/Dialog';
import { Typography } from '@mui/material';
import Stepper from '@mui/material/Stepper';
import ListItem from '@mui/material/ListItem';
import AddIcon from '@mui/icons-material/Add';
import StepLabel from '@mui/material/StepLabel';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import { ProcessStep } from '../utils/position';
import { lightBlue } from '@mui/material/colors';
import IconButton from "@mui/material/IconButton";
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from "@mui/icons-material/Delete";
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';


function CurrentStep({ currStep }){
  const [stepValue, setStepValue] = useState(currStep.step);

  function handleChangeStep(event){
    setStepValue(event.target.value)
  }

  function handleSaveStep(){
    currStep.step = stepValue;
  }

  return(
      <TextField
        variant="standard"
        value={stepValue}
        margin="dense"
        fullWidth
        onChange={handleChangeStep}
        onBlur={handleSaveStep}
      />
  );
}

function SimpleDialog({ steps, onClose, open, handleAddStep, handleDeleteStep }) {

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open} fullWidth maxWidth="xs">
      <DialogTitle>Process Steps</DialogTitle>
      <List sx={{ pt: 0 }}>
        {steps.map((step) => {
          return(
            <ListItem key={step.id}
              secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={() => {handleDeleteStep(step.id)}}>
                  <DeleteIcon />
                </IconButton>
              }
            >
              <CurrentStep currStep = {step} />
            </ListItem>
          );
        })}
        <ListItem>
          <ListItemButton
            autoFocus
            onClick={handleAddStep}
          >
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: lightBlue[500] }}>
                <AddIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Add step"/>
          </ListItemButton>
        </ListItem>
      </List>
    </Dialog>
  );
}

export default function PositionStatusStepper({ position }) {
  const [open, setOpen] = useState(false);
  const [steps, setSteps] = useState(position.positionInfo.steps);
  const [activeStep, setActiveStep] = useState(steps ? steps.findIndex(step => step.isCompletedStep === false) : 0);
  console.log(activeStep);
  function getActiveStepIndex(){
    const currSteps = position.positionInfo.steps;
    let activeStepIndex = 0;
    if(currSteps.length > 0){
      activeStepIndex = currSteps.findIndex(step => step.isCompletedStep === false);
    }
    return activeStepIndex;
  }

  const totalSteps = () => {
    return steps.length;
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleComplete(){
    position.positionInfo.steps[activeStep].isCompletedStep = true;
    if(activeStep !== totalSteps()){
      setActiveStep(activeStep + 1);
    }
  }

  function handleAddStep(){
    const newStep = new ProcessStep("", false);
    const newStepsArr = [...steps, newStep];
    setSteps(newStepsArr);
    position.positionInfo.steps = newStepsArr;
    setActiveStep(getActiveStepIndex());
  }

  function handleDeleteStep(idStepToDelete){
    const newStepsArr = steps.filter(step => {
      return step.id !== idStepToDelete;
    });
    setSteps(newStepsArr);
    position.positionInfo.steps = newStepsArr;
    setActiveStep(getActiveStepIndex());
  }

  return (
    <Box sx={{ width: '100%', margin:5, mb:8}}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((currStep) => (
          <Step key={currStep.id}>
            <StepLabel>{currStep.step}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
        <Button variant="contained" endIcon={<EditIcon />} onClick={handleClickOpen} sx={{ mr: 1 }}>
          Edit
        </Button>
        {activeStep === totalSteps()
        ? <Typography sx={{ marginLeft: "auto" }}>You Finished all the steps!!</Typography>
        : <Button onClick={handleComplete} sx={{ marginLeft: "auto" }}>
            {activeStep === totalSteps() - 1
            ? 'Finish'
            : 'Complete Step'}
          </Button>
        }
      </Box>
        <SimpleDialog
          steps={steps}
          open={open}
          onClose={handleClose}
          handleAddStep={handleAddStep}
          handleDeleteStep={handleDeleteStep}
        />
    </Box>
  );
}