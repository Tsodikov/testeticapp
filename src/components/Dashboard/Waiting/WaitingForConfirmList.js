/* eslint-disable no-fallthrough */
import { Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ToggleButton, ToggleButtonGroup, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getByUserId, setCurrentTestSession, testSessionSelector } from "../../../store/testSessionSlice";
import CachedIcon from '@mui/icons-material/Cached';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import { setActiveTest } from "../../../store/testsSlice";
import PreviewOutlinedIcon from '@mui/icons-material/PreviewOutlined';
import { fetchQSbYTsId } from "../../../store/questionSessionSlice";

const columns = [
    { id: 'Exam', 
      label: 'Exam', 
      minWidth: 160,
      format: (value) => value.toLocaleString('en-US'),
    },
    { id: 'startDate', 
      label: 'Start date', 
      minWidth: 20,
      format: (value) => value.toLocaleString('en-US'),
    },
    { id: 'endDate', 
      label: "End date", 
      minWidth: 20,
      format: (value) => value.toLocaleString('en-US'),
    },
    { id: 'status', 
      label: 'Status', 
      minWidth: 20,
      format: (value) => value.toLocaleString('en-US'),
    },
    { id: 'dateLastChange', 
      label: "Last change", 
      minWidth: 20,
      format: (value) => value.toLocaleString('en-US'),
    },
];

export const WaitingForConfirmList = ({ setShowTestCard, setShowConfirmList, setShowExam, setShowExamResult }) => {

    const dispatch = useDispatch();

    const testSessionList = useSelector(testSessionSelector);
    const currentUser = useSelector(state => state.users.currentUser);
    const [selectedTestSession, setSelectedTestSession] = useState();
    const [mode, setMode] = useState('all');
    // const [reload, setReload] = useState(false);

    const handleMode = (event, newModes) => {
        setMode(newModes);
    };

    const onSelectTestSession = (e, testSession) => {
        e.preventDefault();
        setSelectedTestSession(testSession.id);
        dispatch(setCurrentTestSession(testSession));
        // setShowTestCard(true);
        // dispatch(clearCurrentTestSession());
    }

    const setLastChange = (testSession) => {
        switch (testSession.status) {
            case 'registering': 
                return `${testSession.registrationDateTime.slice(0, 10)} ${testSession.registrationDateTime.slice(11, 16)}`
            case 'registered': 
                return `${testSession.confirmationRegister.slice(0, 10)} ${testSession.confirmationRegister.slice(11, 16)}`
            case 'Started exam': 
                return `${testSession.startTest.slice(0, 10)} ${testSession.startTest.slice(11, 16)}`
            case 'Exam finished': 
                return `${testSession.endTest.slice(0, 10)} ${testSession.endTest.slice(11, 16)}`

            default:
                break;
        }
    }

    const goToExam = (e, testSession) => {
        e.preventDefault();
        setShowExamResult(false);
        dispatch(setCurrentTestSession(testSession))
        dispatch(setActiveTest(testSession.test));
        setShowExam(true);
        setShowConfirmList(false);
    }

    const showResult = (e, testSession) => {
        dispatch(setCurrentTestSession(testSession));
        // dispatch(fetchQSbYTsId(testSession.id));
        setShowExamResult(true);
    }

    const readyToExam = (item) => {
        const currentDate = new Date();
        if (item.status === 'registered') {
            if (Date.parse(item.test.currentActiveStart) < Date.parse(currentDate)
             && Date.parse(item.test.currentActiveEnd) > Date.parse(currentDate)) {
                return true;
            } else if (item.test.startAnyTime) {
                return true;
            } else {
                return false;
            }
        }
    }

    const handleReload = (e) => {
        e.preventDefault();
        dispatch(getByUserId({userId: currentUser.id, status: mode}));
    }

    useEffect(() => {
        dispatch(getByUserId({userId: currentUser.id, status: mode}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mode]);

    return (
        <Paper
        sx={{ p: 2, width: '100%', overflow: 'hidden' }}
        elevation={6}
        >
        <Grid container spacing={3}>
            <Grid item xs={12} sm={8} lg={8}>
                <Typography variant="h6" sx={{color: "blue"}} gutterBottom>
                    My exams
                </Typography>
            </Grid>
            <Grid item xs={12} sm={3} lg={3}>
                <ToggleButtonGroup
                    value={mode}
                    onChange={handleMode}
                    exclusive
                    fullWidth
                    aria-label="change mode"
                >
                    <ToggleButton value="all" size="small" color="info" sx={{border: "none"}} aria-label="all">All</ToggleButton>
                    <ToggleButton value="registering" size="small" color="info" sx={{border: "none"}} aria-label="registering">Registering</ToggleButton>
                    <ToggleButton value="registered" size="small" color="info" sx={{border: "none"}} aria-label="registered">Registered</ToggleButton> 
                </ToggleButtonGroup>
            </Grid>
            <Grid item xs={12} sm={1} lg={1}>
            <IconButton onClick={(e) => handleReload(e) }>
                <CachedIcon fontSize='small'/>
            </IconButton>
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
                    <Typography variant="subtitle2" sx={{color: "blue"}}>{column.label}</Typography>
                    </TableCell>))}
                </TableRow>
            </TableHead>
            <TableBody>
                {!testSessionList ? null :
                testSessionList
                .map((item, i) => (
                    <TableRow 
                        key={i}
                        name={item.id}
                        hover role="checkbox" 
                        tabIndex={-1}
                        selected={selectedTestSession === item.id}
                        >
                        <TableCell key={columns[0].id} align={columns[0].align}
                            onClick={(e) => onSelectTestSession(e, item)}>
                            {item.test.title}
                        </TableCell>
                        <TableCell key={columns[1].id} align={columns[1].align}
                            onClick={(e) => onSelectTestSession(e, item)}>
                            {!item.test.startAnyTime? 'Start any time' : 
                                `${item.test.currentActiveStart.slice(0, 10)} ${item.test.currentActiveStart.slice(11, 16)}`
                            }
                        </TableCell>
                        <TableCell key={columns[2].id} align={columns[2].align}
                            onClick={(e) => onSelectTestSession(e, item)}>
                            {!item.test.startAnyTime? 'Start any time' : 
                                `${item.test.currentActiveEnd.slice(0, 10)} ${item.test.currentActiveEnd.slice(11, 16)}`
                            }
                        </TableCell>
                        <TableCell key={columns[3].id} align={columns[3].align}
                            onClick={(e) => onSelectTestSession(e, item)}>
                            {item.status}
                        </TableCell>
                        <TableCell key={columns[4].id} align={columns[4].align}
                            onClick={(e) => onSelectTestSession(e, item)}>
                            {setLastChange(item)}
                        </TableCell>
                        {!readyToExam(item) ? null : 
                        <TableCell >
                            
                            <Tooltip title="Go to exam">
                                <IconButton onClick={(e) => goToExam(e, item) }>
                                    <DirectionsRunIcon fontSize='small'/>
                                </IconButton>
                            </Tooltip>
                        </TableCell>}
                        {item.status !== "Exam finished"? null :
                        <TableCell >
                            
                            <Tooltip title="Watch exam results">
                                <IconButton onClick={(e) => showResult(e, item) }>
                                    <PreviewOutlinedIcon fontSize='small'/>
                                </IconButton>
                            </Tooltip>
                        </TableCell>}
                    </TableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>
        </Paper>
    )
}