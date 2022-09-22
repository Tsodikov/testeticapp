import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, IconButton, Paper, TableContainer, ToggleButton, ToggleButtonGroup, Tooltip, Typography } from '@mui/material';
import ApprovalIcon from '@mui/icons-material/Approval';
import { getByTestId, setCurrentTestSession, testSessionSelector, updateTestSession } from '../../../store/testSessionSlice';
import BackspaceOutlinedIcon from '@mui/icons-material/BackspaceOutlined';

const columns = [
    { id: 'student', 
      label: 'Student', 
      minWidth: 160,
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'email',
      label: 'email',
      minWidth: 170,
      // align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    { id: 'registered', 
      label: 'Registered', 
      minWidth: 80,
      format: (value) => value.toLocaleString('en-US'),
    },
    { id: 'status', 
      label: "Status", 
      minWidth: 50,
      format: (value) => value.toLocaleString('en-US'),
    },
    { id: 'action', 
      label: "", 
      align: 'right',
      minWidth: 24,
      format: (value) => value.toLocaleString('en-US'),
    },
    { id: 'action1', 
      label: "", 
      align: 'right',
      minWidth: 24,
      format: (value) => value.toLocaleString('en-US'),
    },
];

export default function ApplicantTable({ selectedTest, selectedUser, setSelectedUser, switchMode }) {

  const [mode, setMode] = React.useState('all');
  
  const testSessionList = useSelector(testSessionSelector);
  const activeTest = useSelector(state => state.tests.activeTest);
  // const currentTestSession = useSelector(state => state.testSession.currentTestSession);
  const dispatch = useDispatch();

  const handleMode = (event, newModes) => {
    setMode(newModes);
  };

  const handleSelect = (e, testSession) => {
    e.preventDefault();
    setSelectedUser(testSession);
    dispatch(setCurrentTestSession(testSession));
    // dispatch(fetchQSbYTsId(currentTestSession.id));
    switchMode('modeStudentInfo');
  };

  const handleApprove = (testSession) => {

    dispatch(updateTestSession({id: testSession.id, testSession: {
      ...testSession,
      status: 'registered',
      confirmationRegister: new Date(),
    }}));
  }

  const handleCancel = (testSession) => {
    dispatch(updateTestSession({id: testSession.id, testSession: {
      ...testSession,
      status: 'registercancel',
      confirmationRegister: new Date(),
    }}));
  }

  React.useEffect(() => {
    if (selectedTest) {
        dispatch(getByTestId(selectedTest));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTest]);

  if (testSessionList.length === 0) {
    return (
      <Paper
        sx={{ p: 2, width: '100%', overflow: 'hidden' }}
        elevation={6}>
        <Typography variant="h6" sx={{color: "blue"}}>
          Exam participants: Nobody registered to this test
        </Typography>
    </Paper>
    );
  }
  return (
    <Paper
      sx={{ p: 2, width: '100%', overflow: 'hidden' }}
      elevation={6}>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={8} lg={8}>
          <Typography variant="subtitle" sx={{color: "blue"}}>
            {`Participants of exam ${activeTest.title}`}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4} lg={4}>
          <ToggleButtonGroup
            value={mode}
            onChange={handleMode}
            exclusive
            // fullWidth
            aria-label="change mode"
          >
            <ToggleButton value="all" size="small" color="info" sx={{border: "none"}} aria-label="all">All</ToggleButton>
            <ToggleButton value="registering" size="small" color="info" sx={{border: "none"}} aria-label="registering">Waiting list</ToggleButton>
            <ToggleButton value="registered" size="small" color="info" sx={{border: "none"}} aria-label="registered">Participants</ToggleButton>
            <ToggleButton value="Exam finished" size="small" color="info" sx={{border: "none"}} aria-label="registered">Passed</ToggleButton> 
          </ToggleButtonGroup>
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
                  <Typography variant="subtitle2" sx={{color: "blue"}}>{column.label}</Typography>
                </TableCell>))}
            </TableRow>
          </TableHead>
          <TableBody>
          {!testSessionList? null :
            testSessionList
            .filter(item => mode !== 'all'? item.status === mode : item)
            .map((testSession) => (
              <TableRow 
                key={testSession.id}
                name={testSession.id}
                tabIndex={-1}
                selected={selectedUser.id === testSession.id}
                // onClick={(e) => dropDownMenu(e, testSession)}
                // onClick={(e) => handleSelect(testSession)}
                >
                  <TableCell key={columns[0].id} align={columns[0].align} onClick={(e) => handleSelect(e, testSession)}>
                    {`${testSession.user.firstName} ${testSession.user.lastName}`}</TableCell>
                  <TableCell key={columns[1].id} align={columns[1].align} onClick={(e) => handleSelect(e, testSession)}>
                    {testSession.user.email}</TableCell>
                  <TableCell key={columns[2].id} align={columns[2].align} onClick={(e) => handleSelect(e, testSession)}>
                    {`${testSession.registrationDateTime.slice(0, 10)} ${testSession.registrationDateTime.slice(11, 17)}`}
                  </TableCell>
                  <TableCell key={columns[3].id} align={columns[3].align} onClick={(e) => handleSelect(e, testSession)}>
                    {testSession.status}</TableCell>
                  {testSession.status === 'registering'? <>
                  <TableCell key={columns[4].id} align={columns[4].align} width={columns[4].minWidth}>
                    <Tooltip title="Підтвердити реєстрацію">
                      <IconButton onClick={() => handleApprove(testSession) }>
                          <ApprovalIcon fontSize='small'/>
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                  <TableCell key={columns[4].id} align={columns[4].align} width={columns[5].minWidth}>
                  <Tooltip title="Відклонити реєстрацію">
                    <IconButton onClick={() => handleCancel(testSession) }>
                        <BackspaceOutlinedIcon fontSize='small'/>
                    </IconButton>
                  </Tooltip>
                </TableCell></>
                  : null}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}