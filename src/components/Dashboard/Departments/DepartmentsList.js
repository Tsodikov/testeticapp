import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../Title';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid, IconButton, Paper, TableContainer, TablePagination } from '@mui/material';
import { deleteDepartment, departmentSelector, fetchDepartment, setEditingDepartment } from '../../../store/departmentsSlice';
// import { DepartmentsSelector, delDepartment, fetchDepartments, setActiveDepartment } from '../../../store/DepartmentSlice';

const columns = [
    { id: 'department', 
      label: 'Department', 
      minWidth: 160,
      format: (value) => value.toLocaleString('en-US'),
    },
    { id: 'qtnTests', 
      label: 'Tests', 
      minWidth: 80,
      format: (value) => value.toLocaleString('en-US'),
    },
    { id: 'qtnspecilusers', 
      label: "Specil users", 
      minWidth: 20,
      format: (value) => value.toLocaleString('en-US'),
    },
];

export default function DepartmentList({ selectedDepartment, setSelectedDepartment, editMode, showAddDepartment, setEditMode, setShowAddDepartment }) {

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    
    const currentOrganization = useSelector(state => state.organization.currentOrganization);
    const departmentsList = useSelector(departmentSelector);
    const dispatch = useDispatch();

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const onEdit =(event, department) => {
        event.preventDefault();
        setEditMode(true);
        dispatch(setEditingDepartment(department));
        setShowAddDepartment(!showAddDepartment);
    }

    const onSelectDepartment = (e, department) => {
        e.preventDefault();
        setSelectedDepartment(department.id);
    }

    const onDeleteDepartment = (id) => {
        dispatch(deleteDepartment(id));
    };

    React.useEffect(() => {
        dispatch(fetchDepartment(currentOrganization.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Paper
        sx={{ p: 2, width: '100%', overflow: 'hidden' }}
        elevation={6}
        >
        <Grid container spacing={3}>
            <Grid item xs={12} sm={7} lg={7}>
                <Title>Departments list</Title>
            </Grid>
            <Grid item xs={12} sm={5} lg={5}>
                <Button
                    type="button"
                    size="medium"
                    fullWidth={true}
                    onClick={() => {
                        setEditMode(false);
                        setShowAddDepartment(!showAddDepartment);
                    }}
                    >
                    Add department
                </Button>
            </Grid>
        </Grid>
        <TableContainer sx={{ maxHeight: 520 }}>
            <Table size="small" stickyHeader aria-label="sticky table">
            <TableHead>
                <TableRow>
                {columns.map(column => (
                    <TableCell 
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                    >
                    {column.label}
                    </TableCell>))}
                </TableRow>
            </TableHead>
            <TableBody>
                {!departmentsList? null :
                departmentsList
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item, i) => (
                    <TableRow 
                        key={i}
                        name={item.id}
                        hover role="checkbox" 
                        tabIndex={-1}
                        selected={selectedDepartment === item.id}
                        onClick={(e) => onSelectDepartment(e, item)}
                        >
                        <TableCell key={columns[0].id} align={columns[0].align}>
                                {item.name}
                        </TableCell>
                        <TableCell key={columns[1].id} align={columns[1].align}>{item.qtnTests}</TableCell>
                        <TableCell key={columns[2].id} align={columns[2].align}></TableCell>
                        {/* <TableCell key={columns[3].id} align={columns[3].align}>
                            {department.dateOfCreate.slice(0, 10)}</TableCell>
                        <TableCell key={columns[4].id} align={columns[4].align}>{department.departmentCreators.name}</TableCell> */}
                        <TableCell >
                            <IconButton onClick={(e) => onEdit(e, item) }>
                                <BorderColorOutlinedIcon fontSize='small'/>
                            </IconButton>
                        </TableCell>
                        <TableCell >
                            <IconButton onClick={(e) => onDeleteDepartment(item.id) }>
                                <DeleteOutlinedIcon fontSize='small'/>
                            </IconButton>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>
        <TablePagination
            rowsPerPageOptions={[5, 10, 25, 100]}
            component="div"
            count={departmentsList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
        </Paper>
    );
}