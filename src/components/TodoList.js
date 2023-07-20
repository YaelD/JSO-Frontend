import List from "@mui/material/List";
import { IconButton } from '@mui/material';
import ListItem from "@mui/material/ListItem";
import Checkbox from "@mui/material/Checkbox";
import DeleteIcon from '@mui/icons-material/Delete';
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";


export default function TodoList({ todoList, handleDeleteTodo, handleToggle, isCompletedTasks}){
    const newTodoList = todoList.filter((todo)=>{
        return todo.isCompleted === isCompletedTasks;
    })
    
    return(
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
            {newTodoList.map((todo) => {
                return (
                    <ListItem
                        key={todo.id}
                        
                        secondaryAction={
                            <IconButton edge="end" aria-label="deleteTodo" sx={{mr: 1}} onClick={()=>{handleDeleteTodo(todo)}}>
                                <DeleteIcon />
                            </IconButton>
                        }
                        sx={{textDecoration : todo.isCompleted && "line-through"}}
                        disablePadding
                    >
                        <ListItemButton
                            onClick={()=>{
                            console.log("Clicked");
                            handleToggle(todo);}
                            }
                            dense
                        >
                        <ListItemIcon>
                            <Checkbox
                                edge="start"
                                checked={todo.isCompleted}
                                disableRipple
                            />
                        </ListItemIcon>
                        <ListItemText id={todo.id} primary={todo.todo} />
                        </ListItemButton>
                    </ListItem>
                );
            })}
        </List>
    );
}