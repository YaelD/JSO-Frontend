import * as React from 'react';
import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import { styled } from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import TableContainer from '@mui/material/TableContainer';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { useDeletePosition, useGetAllPositions } from '../utils/apiCalls';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


export default function JobsTable() {
  const {deletePosition, deletedPosition} = useDeletePosition();

  const tableCells = [
    "Creation date",
    "Company Name",
    "Position",
    "Connections",
    "Status",
    "Step",
    "Actions"
  ];


  function handleDeleteClick(position){
    deletePosition(position);
  }

  function TableHeader(){
    return(
      <TableRow>
        {tableCells.map((cell)=>{
          return(
            <StyledTableCell key={cell} align="left">{cell}</StyledTableCell>
          ); 
        })}
      </TableRow>
    );
  }

  function getPositionStep(steps){
    let currStep;
    if(steps?.length > 0){
      currStep = steps.find(step => step.isCompletedStep === false);
      if(!currStep){
        return "Finished Steps";
      }
    }
    if(!currStep){
      return "None";
    }
    return currStep.step;
  }

  function TableRows(){
    const positionsValues = useGetAllPositions();
    console.log(positionsValues);
    return (
      <>
      {positionsValues.map((position)=>{
        console.log(position);
        const processStep = getPositionStep(position.positionInfo.steps);
        const positionDate = position.positionInfo.date;
        return(
          <StyledTableRow key={position.id}>
            <StyledTableCell sx={{width: 0.2, paddingLeft: 2}} align="left">{positionDate.toLocaleDateString('en-GB')}</StyledTableCell>
            <StyledTableCell sx={{width: 0.2, paddingLeft: 1}} align="left">{position.positionInfo.companyName}</StyledTableCell>
            <StyledTableCell sx={{width: 0.2}} align="left">{position.positionInfo.role}</StyledTableCell>
            <StyledTableCell sx={{width: 0.2, paddingLeft: 1}} align="left">{position.positionInfo.connections}</StyledTableCell>
            <StyledTableCell sx={{width: 0.2, paddingLeft: 1}} align="left">{position.positionInfo.status}</StyledTableCell>
            <StyledTableCell sx={{width: 0.2}} align="left">{processStep}</StyledTableCell>
            <StyledTableCell align="left" sx={{width: 0.2, paddingRight: 5}}>
              <ActionCellContent position = {position} />
            </StyledTableCell>
          </StyledTableRow>
        );
      })}
      </>  
    );
  }

  function ActionCellContent({position}){
    return(
      <Stack direction="row" spacing={1}>
        <IconButton component={Link} to={`/positions/${position.id}`} state={position}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={()=>{handleDeleteClick(position)}}>
          <DeleteIcon />
        </IconButton>
      </Stack>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table" stickyHeader={true}>
        <TableHead>
          <TableHeader />
        </TableHead>
        <TableBody>
          <TableRows />
        </TableBody>
      </Table>
    </TableContainer>
  );
}

