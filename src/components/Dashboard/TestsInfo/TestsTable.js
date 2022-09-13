import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../Title';
import { useDispatch, useSelector } from 'react-redux';
import { usersSelector } from '../../../store/usersSlice';
import { Paper, TableContainer, TablePagination } from '@mui/material';
import { fetchTestsByOrgAndUser, testsSelector } from '../../../store/testsSlice';

const columns = [
    { id: 'test', 
      label: 'Test', 
      minWidth: 160,
      format: (value) => value.toLocaleString('en-US'),
    },
    { id: 'section', 
      label: 'Section', 
      minWidth: 80,
      format: (value) => value.toLocaleString('en-US'),
    },
    { id: 'questionsqtn', 
      label: "Qtn question's", 
      minWidth: 50,
      format: (value) => value.toLocaleString('en-US'),
    },
];

export default function TestsTable({ selectedTest ,setSelectedTest }) {

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(6);
  
  const usersList = useSelector(usersSelector);
  const testsList = useSelector(testsSelector);
  const currentOrganization = useSelector(state => state.organization.currentOrganization);
  const currentUser = useSelector(state => state.users.currentUser);
  const dispatch = useDispatch();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  React.useEffect(() => {
    dispatch(fetchTestsByOrgAndUser({orgId: currentOrganization.id, userId: currentUser.id}));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Paper
      sx={{ p: 2, width: '100%', overflow: 'hidden' }}
      elevation={6}
      >
      <Title>Test list</Title>
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
            {!testsList? null :
              testsList
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((test) => (
                <TableRow 
                  key={test.id}
                  name={test.id}
                  hover role="checkbox" 
                  tabIndex={-1}
                  selected={selectedTest === test.id}
                  onClick={(e) => setSelectedTest(test.id)}
                  >
                    <TableCell key={columns[0].id} align={columns[0].align}>{test.title}</TableCell>
                    <TableCell key={columns[1].id} align={columns[1].align}>{`${test.chapter.chapterTitle}`}</TableCell>
                    <TableCell key={columns[2].id} align={columns[2].align}>{test.qtnOfQuestion}</TableCell>
                    {/* <TableCell key={columns[3].id} align={columns[3].align}>{test.role}</TableCell> */}
                    {/* <TableCell align='right'>
                      <ListItemButton>
                        <ListItemIcon>
                          <EditNotificationsOutlined fontSize='small'/>
                        </ListItemIcon>
                      </ListItemButton>
                    </TableCell> */}
                    
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={usersList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}