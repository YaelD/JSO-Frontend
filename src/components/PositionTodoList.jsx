import { useState } from "react";
import TodoList from "./TodoList";
import { Todo } from "../utils/position";
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import { Container, Typography } from '@mui/material';

export default function PositionTodoList({position}) {
    const [todoText, setTodoText] = useState("");
    const [todoList, setTodoList] = useState(position.todoList);

    const handleToggle = (todo) => {
        todo.isCompleted = !todo.isCompleted;
        const newArray = [...todoList];
        setTodoList(newArray);
    }

    function handleTodoChange(event){
        setTodoText(event.target.value);
    }

    function handleAddNewTodo(){
        if(todoText !== ""){
            const newTodoList = [new Todo(todoText), ...todoList];
            setTodoList(newTodoList);
            setTodoText("");
            position.todoList = newTodoList;
        }
    }

    function handleDeleteTodo(todo){
        const indexInTodoList = todoList.indexOf(todo);
        const newTodoList = [...todoList];
        newTodoList.splice(indexInTodoList, 1);
        setTodoList(newTodoList);
        position.todoList = newTodoList;
    }

    return (
        <>
            <Container sx={{ display: 'flex', p: 1, mb:4}}>
                <TextField
                    autoFocus
                    multiline
                    maxRows={4}
                    value={todoText}
                    variant="filled"
                    fullWidth
                    sx={{mr:2}}
                    onChange={handleTodoChange}
                    placeholder={"+ Add Todo"}
                />
                <Button variant="contained" onClick={handleAddNewTodo} startIcon={<AddIcon />}>Add</Button>
            </Container>
            <Typography variant="h6" sx={{mb:1}}>Active Tasks:</Typography>
            <TodoList todoList={todoList} handleDeleteTodo={handleDeleteTodo} handleToggle={handleToggle} isCompletedTasks={false} />
            <Typography variant="h6" sx={{mt:4, mb:1}}>Completed Tasks:</Typography>
            <TodoList todoList={todoList} handleDeleteTodo={handleDeleteTodo} handleToggle={handleToggle} isCompletedTasks={true}/>
        </>
    );
}