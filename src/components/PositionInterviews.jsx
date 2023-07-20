import { useState } from 'react';
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import AddIcon from '@mui/icons-material/Add';
import { Interview } from '../utils/position';
import { CardActionArea } from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import DeleteIcon from '@mui/icons-material/Delete';
import InterviewInfoPopup from './InterviewInfoPopup';
import { InterviewContext } from '../contexts/PositionContexts';


function InterviewCard({ interview, handleDeleteInterview }){
    const [openPopupForEdit, setOpenPopupForEdit] = useState(false);

    const handleOpenPopup = () => {
        setOpenPopupForEdit(true);
    };
  
    const handleClosePopup = () => {
        setOpenPopupForEdit(false);
    };

    return (
        <Card sx={{ width: 275 }} >
            <CardHeader
                action={
                    <IconButton aria-label="delete" name="deleteButton"
                        onClick={(event)=>{
                            handleDeleteInterview(interview);
                        }}>
                        <DeleteIcon />
                    </IconButton>
                }
                subheader={interview.date.toLocaleDateString()}
            />
            <CardActionArea onClick={handleOpenPopup}>
                <CardContent>
                    <Typography variant="h6" component="div" sx={{maxLines: 2, maxHeight: 50}}>
                        {interview.title} 
                    </Typography>
                </CardContent>
            </CardActionArea>
            <InterviewInfoPopup 
                openPopup = {openPopupForEdit}
                handleClosePopup = {handleClosePopup}
                interview={interview}
                isNewInterview={false}
            />
        </Card>
    );
}


export default function PositionInterviews({ position }) {
    const [openNewPopup, setOpenNewPopup] = useState(false);
    const [interviewsValue, setInterviewsValue] = useState(position.interviews);

    function handleAddingNewInterview(newInterview){
        const newInterviews = [...interviewsValue, newInterview];
        setInterviewsValue(newInterviews);
        position.interviews = newInterviews;
    }

    function handleUpdateInterview(interviewToUpdate){
        const newInterviews = interviewsValue.map((interview)=>{
            if(interview.id === interviewToUpdate.id){
                return interviewToUpdate;
            }
            else{
                return interview;
            }
        });
        setInterviewsValue(newInterviews);
        position.interviews = newInterviews;
    }

    function handleDeleteInterview(interviewToDelete){
        const newInterviews = interviewsValue.filter((interview)=>{
            return(interview.id !== interviewToDelete.id);  
        });
        setInterviewsValue(newInterviews);
        position.interviews = newInterviews;
    }


    function onChangeInterviews(interview, operation){
        switch(operation){
            case "Add":
                handleAddingNewInterview(interview);
                break;
            case "Update":
                handleUpdateInterview(interview);
                break;
            default:
                break;
        }
    }

    const handleAddingInterview = () => {
        setOpenNewPopup(true);
    };
  
    const handleCloseNewPopup = (event, reason) => {
        if(reason && reason === "backdropClick"){
            return;
        }
        setOpenNewPopup(false);
    };

    return(
        <Box>
            <Fab color="primary" aria-label="add" sx={{mb:5}} size="medium" onClick={handleAddingInterview}>
                <AddIcon />
            </Fab>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {interviewsValue.map((interview, index) => {
                    return(
                        <Grid item xs={2} sm={4} md={4} key={interview.id}>
                            <InterviewContext.Provider value={onChangeInterviews}>
                                <InterviewCard 
                                    interview={interview}
                                    handleDeleteInterview={handleDeleteInterview}
                                />
                            </InterviewContext.Provider>
                        </Grid>
                    );
                })}
            </Grid>
            <InterviewContext.Provider value={onChangeInterviews}>
            <InterviewInfoPopup 
                openPopup = {openNewPopup}
                handleClosePopup = {handleCloseNewPopup}
                interview={new Interview()}
                isNewInterview={true}
            />
            </InterviewContext.Provider>
        </Box>
    );
}