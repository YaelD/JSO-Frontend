import { useState } from 'react';
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import AddIcon from '@mui/icons-material/Add';
import { CardActionArea } from '@mui/material';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import InterviewInfoPopup from './InterviewInfoPopup';
import { InterviewContext } from '../contexts/InterviewContext';


function InterviewCard({ interview, index }){
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    return (
        <Card sx={{ width: 275 }} >
            <CardActionArea onClick={handleClickOpen}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {interview.date}
                    </Typography>
                    <Typography variant="h6" component="div">
                        {interview.title} 
                    </Typography>
                </CardContent>
            </CardActionArea>
        <InterviewInfoPopup 
            open = {open}
            handleClose = {handleClose}
            interview={interview}
            index={index}
            isNewInterview={false}
        />
        </Card>
    );
}


export default function PositionInterviews({ interviews, handlePositionChange }) {
    const [open, setOpen] = useState(false);
    const [interviewsValue, setInterviewsValue] = useState(interviews);

    function onChangeInterviews(newInterview, index){
        const newInterviews = [...interviewsValue];
        newInterviews[index] = newInterview;
        console.log(newInterviews); //TODO: check if line 63 works on indexes that doesn't exist in the array
        setInterviewsValue(newInterviews);
        handlePositionChange(newInterviews,"interviews");
    }

    function createInterview(date, title, conclusions){
        return { date, title, conclusions };
    }

    const handleAddingInterview = () => {
        setOpen(true);
    };
  
    const handleClose = (event, reason) => {
        if(reason && reason === "backdropClick"){
            return;
        }
        setOpen(false);
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
                open = {open}
                handleClose = {handleClose}
                interview={createInterview()}
                index={interviewsValue.length}
                isNewInterview={true}
            />
            </InterviewContext.Provider>
        </Box>
    );
}