import { useState } from 'react';
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import AddIcon from '@mui/icons-material/Add';
import { CardActionArea } from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import DeleteIcon from '@mui/icons-material/Delete';
import InterviewInfoPopup from './InterviewInfoPopup';
import { InterviewContext } from '../contexts/PositionContexts';


function InterviewCard({ interview, index }){
    const [openPopupForEdit, setOpenPopupForEdit] = useState(false);

    const handleOpenPopup = () => {
        setOpenPopupForEdit(true);
    };
  
    const handleClosePopup = () => {
        setOpenPopupForEdit(false);
    };

    return (
        <Card sx={{ width: 275 }} >
            <CardActionArea onClick={handleOpenPopup}>
            <CardHeader
                action={
                    <IconButton aria-label="delete" name="deleteButton" onClick={(event)=>{
                        alert("card deleted");
                        event.stopPropagation();
                        }}>
                        <DeleteIcon />
                    </IconButton>
                }
                subheader={interview.date}
            />
                <CardContent>
                    <Typography variant="h6" component="div">
                        {interview.title} 
                    </Typography>
                </CardContent>
            </CardActionArea>
        <InterviewInfoPopup 
            openPopup = {openPopupForEdit}
            handleClosePopup = {handleClosePopup}
            interview={interview}
            index={index}
            isNewInterview={false}
        />
        </Card>
    );
}


export default function PositionInterviews({ interviews, handlePositionChange }) {
    const [openNewPopup, setOpenNewPopup] = useState(false);
    const [interviewsValue, setInterviewsValue] = useState(interviews);

    function onChangeInterviews(newInterview, index){
        const newInterviews = [...interviewsValue];
        newInterviews[index] = newInterview;
        setInterviewsValue(newInterviews);
        handlePositionChange(newInterviews,"interviews");
    }

    function createInterview(date, title, conclusions){
        return { date, title, conclusions };
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
                        <Grid item xs={2} sm={4} md={4} key={index}>
                            <InterviewContext.Provider value={onChangeInterviews}>
                                <InterviewCard 
                                    interview={interview}
                                    index={index}
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
                interview={createInterview()}
                index={interviewsValue.length}
                isNewInterview={true}
            />
            </InterviewContext.Provider>
        </Box>
    );
}