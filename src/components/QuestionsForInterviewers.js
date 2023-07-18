import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import Accordion from '@mui/material/Accordion';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import DialogTitle from '@mui/material/DialogTitle';
import { QuestionsAndAnswer } from '../utils/position';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Box, Container, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import DialogContentText from '@mui/material/DialogContentText';



function PopupEditQuestionAndAnswer({ questionAndAnswer, handleCloseEditPopup, openEditPopup, onUpdateQuestion }){
    const [questionAndAnswerValue, setQuestionAndAnswerValue] = useState(questionAndAnswer);

    function handleChangeQuestionAndAnswer(event){
        const {name, value} = event.target;
        setQuestionAndAnswerValue((prevQuestionAndAnswerValue)=>{
          const newQuestionAndAnswer = {
            ...prevQuestionAndAnswerValue,
            [name]:value
          }
          return newQuestionAndAnswer;
        });
    }

    function handleSave(){
        onUpdateQuestion(questionAndAnswerValue);
        handleCloseEditPopup();
    }

    function handleCancel(){
        setQuestionAndAnswerValue(questionAndAnswer);
        handleCloseEditPopup();
    }

    return(
      <Dialog open={openEditPopup} onClose={handleCloseEditPopup} fullWidth maxWidth="sm">
        <DialogTitle>
          <TextField
            name={"question"}
            variant="standard"
            value={questionAndAnswerValue.question}
            placeholder="Enter question"
            margin="dense"
            fullWidth
            onChange={handleChangeQuestionAndAnswer}
          />
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{mt:2}}>
            Answer:
          </DialogContentText>
          <TextField
            name={"answer"}
            multiline
            rows={5}
            value={questionAndAnswerValue.answer}
            fullWidth
            onChange={handleChangeQuestionAndAnswer}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSave} disabled={!questionAndAnswerValue.question}>Save</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </DialogActions>
      </Dialog>
    );
}

function AccordionItem({ questionAndAnswer, onDeleteQuestion, onUpdateQuestion }){
    const [openEditPopup, setOpenEditPopup] = useState(false);

    return(
        <Accordion key={questionAndAnswer.id}>
            <Box sx={{ display: "flex" }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel2a-header"
                    sx={{ flexGrow: 1 }}
                >
                    <Typography>{questionAndAnswer.question}</Typography>
                </AccordionSummary>
                <Box>
                    <IconButton onClick={()=>{
                        setOpenEditPopup(true);
                    }}>
                        <EditIcon />
                    </IconButton>

                    <IconButton onClick={()=>{
                        onDeleteQuestion(questionAndAnswer);
                    }}>
                        <DeleteIcon />
                    </IconButton>
                </Box>
            </Box>
            <AccordionDetails>
                <Typography>
                    {questionAndAnswer.answer}
                </Typography>
            </AccordionDetails>
            <PopupEditQuestionAndAnswer
                questionAndAnswer={questionAndAnswer}
                handleCloseEditPopup={()=>{
                    setOpenEditPopup(false);
                }}
                openEditPopup={openEditPopup}
                onUpdateQuestion={onUpdateQuestion}
            />
        </Accordion>
    );
}

export default function QuestionsForInterviewers({ position }) {
    const [questionsAndAnswersValue, setQuestionsAndAnswers] = useState(position.questionsAndAnswers); // Is it necessary to add it? it works also with updating only the position 
    const [questionValue, setQuestionValue] = useState("");

    function handleDeleteQuestion(questionToDelete){
        const newQuestionsAndAnswers = questionsAndAnswersValue.filter((question)=>{
            return(question.id !== questionToDelete.id);  
        });
        setQuestionsAndAnswers(newQuestionsAndAnswers);
        position.questionsAndAnswers = newQuestionsAndAnswers;
    }

    function handleUpdateQuestion(questionToUpdate){
        const newQuestionsAndAnswers = questionsAndAnswersValue.map((question)=>{
            if(question.id === questionToUpdate.id){
                return questionToUpdate;
            }
            else{
                return question;
            }
        });
        setQuestionsAndAnswers(newQuestionsAndAnswers);
        position.questionsAndAnswers = newQuestionsAndAnswers;
    }

    function handleQuestionChange(event){
        setQuestionValue(event.target.value);
    }

    function handleAddingQuestion(){
        setQuestionValue('');
        const newQuestionAndAnswer = new QuestionsAndAnswer(questionValue, "");
        const newQuestionsAndAnswers = [...questionsAndAnswersValue, newQuestionAndAnswer];
        setQuestionsAndAnswers(newQuestionsAndAnswers);
        position.questionsAndAnswers = newQuestionsAndAnswers;
    }

    return (
        <div>
            <Container sx={{ display: 'flex', p: 1, mb:4}}>
                <TextField
                    autoFocus
                    multiline
                    maxRows={4}
                    value={questionValue}
                    variant="filled"
                    fullWidth
                    sx={{mr:2}}
                    onChange={handleQuestionChange}
                    placeholder={"+ Add question"}
                />
                <Button variant="contained" startIcon={<AddIcon />}
                onClick={handleAddingQuestion} disabled={questionValue === "" && true}>Add</Button>
            </Container>
            {questionsAndAnswersValue.map((questionAndAnswer, index)=>{
                return(
                    <AccordionItem 
                            key={questionAndAnswer.id} questionAndAnswer={questionAndAnswer}
                            onDeleteQuestion={handleDeleteQuestion} onUpdateQuestion={handleUpdateQuestion}
                    />
                );
            })}
        </div>
    );
}