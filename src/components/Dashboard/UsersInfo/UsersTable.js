import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../Title';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsersToOrg, setEditingUser, usersSelector } from '../../../store/usersSlice';
import { Button, Grid, IconButton, Paper, TableContainer, TablePagination } from '@mui/material';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { departmentByIdSelector, departmentSelector, fetchDepartment } from '../../../store/departmentsSlice';

const columns = [
  { id: 'name', 
    label: 'User name', 
    minWidth: 120,
    format: (value) => value.toLocaleString('en-US'),
  },
  { id: 'fullname', 
    label: 'Full name', 
    minWidth: 50,
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'email',
    label: 'email',
    minWidth: 170,
    // align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'role',
    label: 'Role',
    minWidth: 60,
    // align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'department',
    label: 'Department',
    minWidth: 120,
    // align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'edit',
    label: '',
    minWidth: 24,
  },
  {
    id: 'del',
    label: '',
    minWidth: 24,
  },
];

export default function UsersTable({ selectedIndex, setSelectedIndex, showAddUser, setShowAddUser, setEditMode, display }) {

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(6);  

  const usersList = useSelector(usersSelector);
  const currentOrganization = useSelector(state => state.organization.currentOrganization);
  const dispatch = useDispatch();
  const departmentList = useSelector(departmentSelector);

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(+event.target.value);
  //   setPage(0);
  // };

  const onDeleteUser = (e, id) => {
    e.preventDefault();
  }

  const onEditUser = (e, user) => {
    e.preventDefault();
    setEditMode(true);
    dispatch(setEditingUser(user));
    setShowAddUser(!showAddUser);
  }

  React.useEffect(() => {
    dispatch(fetchUsersToOrg(currentOrganization.id));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    dispatch(fetchDepartment(currentOrganization.id));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (display === 'none') return null;
  return (
    <Paper
      sx={{ p: 2, width: '100%', overflow: 'hidden' }}
      elevation={6}
      >
      <Grid container spacing={3}>
        <Grid item xs={12} sm={9} lg={9}>
          <Title >Special users</Title>
        </Grid>
        <Grid item xs={3} sm={3} lg={3}>
            <Button
                type="button"
                size="medium"
                fullWidth={true}
                onClick={() => {
                    setEditMode(false);
                    setShowAddUser(!showAddUser);
                }}
                >
                Add user
            </Button>
        </Grid>
      </Grid>
      
      <TableContainer sx={{ maxHeight: 280 }}>
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
            {!usersList? null :
              usersList
              // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user) => (
                <TableRow 
                  key={user.id}
                  name={user.id}
                  hover role="checkbox" 
                  tabIndex={-1}
                  selected={selectedIndex === user.id}
                  onClick={(e) => setSelectedIndex(user.id)}
                  >
                    <TableCell key={columns[0].id} align={columns[0].align}>{user.name}</TableCell>
                    <TableCell key={columns[1].id} align={columns[1].align}>{`${user.firstName} ${user.lastName}`}</TableCell>
                    {/* <TableCell key={columns[2].id} align={columns[2].align}>{user.lastName}</TableCell> */}
                    <TableCell key={columns[2].id} align={columns[2].align}>{user.email}</TableCell>
                    <TableCell key={columns[3].id} align={columns[3].align}>{user.role}</TableCell>
                    <TableCell key={columns[4].id} align={columns[4].align}>
                      {/* {console.log(departmentList.length)} */}
                      {departmentList.filter(item => item.id === user.departmentId).length !== 0? 
                      departmentList.filter(item => item.id === user.departmentId)[0].name : null}
                    </TableCell>
                    <TableCell key={columns[5].id} align={columns[5].align}>
                      <IconButton onClick={(e) => onEditUser(e, user) }>
                        <BorderColorOutlinedIcon fontSize='small'/>
                      </IconButton>
                    </TableCell>
                      <TableCell key={columns[6].id} align={columns[6].align}>
                        <IconButton onClick={(e) => onDeleteUser(e, user.id) }>
                          <DeleteOutlinedIcon fontSize='small'/>
                        </IconButton>
                      </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={usersList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
    </Paper>
  );
}
