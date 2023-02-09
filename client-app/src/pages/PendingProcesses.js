import * as React from 'react';
import JobsTable from '../components/JobsTable';
import Footer from '../components/Footer';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

export default function PendingProcesses(){

    function handleAddPosition(){
        //TODO: render an empty position page
    }

    return (
        <>
            <Button 
                variant="contained"
                color='info'
                startIcon={<AddIcon />}
                sx={{marginBottom: 3}}
                onClick={handleAddPosition}
            >
                Add Position
            </Button>
            <JobsTable />
            <Box>
                <Footer sx={{ mt: 5, mb: 5 }}/>
            </Box>
        </>
    );
}