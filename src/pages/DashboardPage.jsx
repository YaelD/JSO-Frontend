import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import TodoList from "../components/TodoList";
import { useGetAllPositions } from "../utils/apiCalls";
import JobsTable from "../components/JobsTable";
import { useMemo } from "react";
import { createAllTodos } from "../utils/utilities";

function Calendar() {
    return (<Paper sx={{ backgroundColor: "white" }}>
        <Typography variant="h1" sx={{ overflow: "hidden" }}>
            lorem ipusum
            bla bla bla
        </Typography>
    </Paper>)
}


function DashBoard() {

    const { positions, isPositionsLoaded } = useGetAllPositions();

    console.log(positions);
    const todos = useMemo(() => {
        return createAllTodos(positions);
    }, [positions]);
    console.log(todos);


    return (
        <Grid spacing={2}
            container
            direction="row"
            justifyContent="center"
        >
            <Grid item xs={7} >
                <Typography>
                    TodoList
                </Typography>
                <TodoList todoList={todos} isCompletedTasks={false} />
            </Grid>

            <Grid item xs={5} >
                <Typography>
                    Calendar
                </Typography>
                <Calendar />
            </Grid>
            <Grid item xs={12} >
                <Typography>
                    Current Positions
                </Typography>
                <JobsTable positions={positions.slice(0, 3)} />
            </Grid>

        </Grid>
    );
}


function DashBoardPage() {

    return (
        <DashBoard />
    );

}

export default DashBoardPage