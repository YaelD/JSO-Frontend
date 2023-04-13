import * as React from 'react';
import JobsTable from '../components/JobsTable';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import { Position } from '../utils/position';

export default function PendingProcesses(){

    return (
        <>
            <Button 
                variant="contained"
                color='info'
                startIcon={<AddIcon />}
                sx={{marginBottom: 3}}
                component={Link}
                to="/positions/new-position"
                state={new Position()}
            >
                Add Position
            </Button>
            <JobsTable />
        </>
    );
}