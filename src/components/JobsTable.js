import Menu from "@mui/material/Menu";
import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import { useMemo, useState } from 'react';
import { styled } from '@mui/material/styles';
import MenuItem from "@mui/material/MenuItem";
import TableRow from '@mui/material/TableRow';
import { TableSortLabel } from '@mui/material';
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
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
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

function TableHeader({handleRequestSort, order, handleChangePositionStatus}){
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClickStatus = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (status) => {
    setAnchorEl(null);
    handleChangePositionStatus(status);
  };

  return(
    <TableRow>
      {tableCells.map((cell)=>{
        return(
          <StyledTableCell key={cell} align="left">
          {cell}
          {cell === "Creation date" && 
          <TableSortLabel active={true} onClick={handleRequestSort} direction={order}/>
          }
          {cell === "Status" && <TableSortLabel active={true} onClick={handleClickStatus} direction={'desc'}/>}
          </StyledTableCell>
        ); 
      })}
      <StatusMenu anchor={anchorEl} handleClose={handleClose} />
    </TableRow>
  );
}

function StatusMenu({anchor, handleClose}){
  
  const [selectedIndex, setSelectedIndex] = useState(0);
  const open = Boolean(anchor);


  const handleMenuOptionsStatusClick = (event, index) => {
    setSelectedIndex(index);
    handleClose(options[index]);
  };

  const options = [
    "All positions",
    "pending process",
    "open process",
    "closed process"
  ];

  return(
    <Menu
      id="lock-menu"
      anchorEl={anchor}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        "aria-labelledby": "lock-button",
        role: "listbox"
      }}
    >
      {options.map((option, index) => (
        <MenuItem
          key={option}
          selected={index === selectedIndex}
          onClick={(event) => handleMenuOptionsStatusClick(event, index)}
        >
          {option}
        </MenuItem>
      ))}
    </Menu>
  );
}

const tableCells = [
  "Creation date",
  "Company Name",
  "Position",
  "Connections",
  "Status",
  "Step",
  "Actions"
];

function TableRows({positionsValues, handleDeleteClick}){

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

  return (
    <>
    {positionsValues.map((position)=>{
      const processStep = getPositionStep(position.positionInfo.steps);
      const positionDate = position.positionInfo.date;
      return(
        <StyledTableRow key={position.id}>
          <StyledTableCell sx={{width: 0.2, paddingLeft: 2}} align="left">{positionDate.toLocaleDateString('en-GB')}</StyledTableCell>
          <StyledTableCell sx={{width: 0.2, paddingLeft: 2}} align="left">{position.positionInfo.companyName}</StyledTableCell>
          <StyledTableCell sx={{width: 0.15}} align="left">{position.positionInfo.role}</StyledTableCell>
          <StyledTableCell sx={{width: 0.15, paddingLeft: 2}} align="left">{position.positionInfo.connections}</StyledTableCell>
          <StyledTableCell sx={{width: 0.15, paddingLeft: 2}} align="left">{position.positionInfo.status}</StyledTableCell>
          <StyledTableCell sx={{width: 0.2}} align="left">{processStep}</StyledTableCell>
          <StyledTableCell align="left" sx={{width: 0.2, paddingRight: 5}}>
            <ActionCellContent position = {position} handleDeleteClick={handleDeleteClick} />
          </StyledTableCell>
        </StyledTableRow>
      );
    })}
    </>  
  );
}

function ActionCellContent({position, handleDeleteClick}){
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

export default function JobsTable() {
  const [order, setOrder] = useState('asc');
  const [filterStatus, setFilterStatus] = useState("All positions");
  const {positions, isPositionsLoaded} = useGetAllPositions();
  const {deletePosition, deletedPosition} = useDeletePosition();
  const sortedPositions = useMemo(()=>
    filterAndSortPositions(positions, filterStatus), 
    [order, isPositionsLoaded, filterStatus]
  );

  function handleChangePositionStatus(newStatus){
    setFilterStatus(newStatus);
  }

  function handleDeleteClick(position){
    deletePosition(position);
  }

  const handleRequestSort = (event) => {
    const isAsc = order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
  };

  function filterAndSortPositions(positions, status){
    let filteredPositions = positions.slice();
    if(status !== "All positions"){
      filteredPositions = filteredPositions.filter((currPosition)=>{
        return currPosition.positionInfo.status === status
      });
    }
    const sortedPositions = filteredPositions.sort((obj1, obj2) => {
      if(order === 'desc'){
        return obj2.positionInfo.date - obj1.positionInfo.date;
      }
      else{
        return obj1.positionInfo.date - obj2.positionInfo.date;
      }
    });
    return sortedPositions;
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table" stickyHeader={true}>
        <TableHead>
          <TableHeader
            handleRequestSort={handleRequestSort}
            order={order}
            handleChangePositionStatus={handleChangePositionStatus}
          />
        </TableHead>
        <TableBody>
          <TableRows positionsValues={sortedPositions} handleDeleteClick={handleDeleteClick}/>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

