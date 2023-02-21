import * as React from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import positions from '../testData/position';
import { styled } from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import TableContainer from '@mui/material/TableContainer';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

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

  const tableCells = [
    "Company Name",
    "Position",
    "Connections",
    "Status",
    "Actions"
  ];

  function handleEditClick(positionId){
    console.log(positionId);
  }

  function handleViewClick(positionId){
    console.log(positionId);
  }

  function renderTableHead(){
    return(
      <>
          <TableRow>
            {tableCells.map((cell)=>{
              return(
                <StyledTableCell align="left">{cell}</StyledTableCell>
              ); 
            })}
          </TableRow>
      </>
    );
  }

  function renderTableRows(){
    return (
      <>
      {positions.map((position)=>{
        return(
          <StyledTableRow key={position.id}>
            <StyledTableCell sx={{width: 0.2, paddingLeft: 5}} align="left">{position.positionInfo.companyName}</StyledTableCell>
            <StyledTableCell sx={{width: 0.2}} align="left">{position.positionInfo.role}</StyledTableCell>
            <StyledTableCell sx={{width: 0.2, paddingLeft: 4}} align="left">{position.positionInfo.connections}</StyledTableCell>
            <StyledTableCell sx={{width: 0.2}} align="left">{position.positionInfo.status}</StyledTableCell>
            <StyledTableCell align="left" sx={{width: 0.2, paddingRight: 5}}>
              {renderActionCellContent(position)}
            </StyledTableCell>
          </StyledTableRow>
        );
      })}
      </>  
    );
  }

  function renderActionCellContent(position){
    return(
      <Stack direction="row" spacing={1}>
        <IconButton onClick={()=>{handleEditClick(position.id)}}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={()=>{handleViewClick(position.id)}}>
          <VisibilityIcon />
        </IconButton>
      </Stack>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table" stickyHeader={true}>
        <TableHead>
          {renderTableHead()}
        </TableHead>
        <TableBody>
        {renderTableRows()}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

