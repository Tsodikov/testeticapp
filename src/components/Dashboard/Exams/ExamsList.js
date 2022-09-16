import { Button, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getByUserId, setCurrentTestSession, testSessionSelector } from "../../../store/testSessionSlice";
import { allTestRemove, fetchTestsByDep, setActiveTest, testsSelector } from "../../../store/testsSlice";
import { ExamsFilter } from "./ExamsFilter";
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import FinalDialog from "./FinalDialog";


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
    { id: 'qtnquestion', 
      label: 'Qtn questions', 
      minWidth: 20,
      format: (value) => value.toLocaleString('en-US'),
    },
    { id: 'timeLimit', 
      label: "Time limit", 
      minWidth: 20,
      format: (value) => value.toLocaleString('en-US'),
    },
];

export const ExamsList = ({selectedTest, setSelectedTest, setShowTestCard}) => {

    const examsList = useSelector(testsSelector);
    const testSessionList = useSelector(testSessionSelector);
    const currentUser = useSelector(state => state.users.currentUser);

    const dispatch = useDispatch();

    const [filteredOrganization, setFilteredOrganization] = useState('');
    const [filteredDepartment, setFilteredDepartment] = useState('');
    const [filteredExamsList, setFilteredExamsList] = useState();
    const [openFinalDialog, setOpenFinalDialog] = useState(false);
    const [confirm, setConfirm] = useState(false);

    const onSelectTest = (e, test) => {
        e.preventDefault();
        setSelectedTest(test.id);
        dispatch(setActiveTest(test));
        dispatch(setCurrentTestSession(test));
        setShowTestCard(true);
    }

    const onRegister = (e) => {
        e.preventDefault();
        setOpenFinalDialog(true);
    }

    const isRegister = (testSessionList, testId) => {
        let tempArr = [];
        testSessionList.forEach(item => {
            if (item.testId === testId) tempArr.push(item.testId);
        });
        console.log(tempArr)
        if (tempArr.length === 0) return false;
        else return true;
    }

    useEffect(() => {
        if (filteredOrganization && filteredDepartment) {
            dispatch(fetchTestsByDep(filteredDepartment.id));
        } else {
            dispatch(allTestRemove());
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        // filteredOrganization, 
        filteredDepartment, confirm]);

    useEffect(() => {
        if (examsList) {
            dispatch(getByUserId({userId: currentUser.id, status: 'all'}));
            setFilteredExamsList(examsList.filter(item => !isRegister(testSessionList, item.id)));
        }
        console.log(currentUser.id, examsList)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [examsList]);

    return (
        <Paper
        sx={{ p: 2, width: '100%', overflow: 'hidden' }}
        elevation={6}
        >
        <Grid container spacing={3}>
            <Grid item xs={12} sm={2} lg={2}>
                <Typography variant="h6" sx={{color: "blue"}} gutterBottom>
                    Exams list
                </Typography>
            </Grid>
            <Grid item xs={12} sm={9} lg={9}>
                <ExamsFilter 
                    filteredOrganization={filteredOrganization} setFilteredOrganization={setFilteredOrganization}
                    filteredDepartment={filteredDepartment} setFilteredDepartment={setFilteredDepartment}
                />
            </Grid>

            <Grid item xs={12} sm={1} lg={1}>
                <Button
                    type="button"
                    size="medium"
                    fullWidth={true}
                    onClick={() => {
                    }}
                    >
                    Search
                </Button>
            </Grid>
            <Grid item xs={12} sm={12} lg={12}></Grid>
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
                    <Typography variant="subtitle1" sx={{color: "blue"}}>{column.label}</Typography>
                    </TableCell>))}
                </TableRow>
            </TableHead>
            <TableBody>
                {!filteredExamsList? null :
                filteredExamsList
                .map((item, i) => (
                    <TableRow 
                        key={i}
                        name={item.id}
                        hover role="checkbox" 
                        tabIndex={-1}
                        selected={selectedTest === item.id}
                        >
                        <TableCell key={columns[0].id} align={columns[0].align}
                            onClick={(e) => onSelectTest(e, item)}>
                            {item.title}
                        </TableCell>
                        <TableCell key={columns[1].id} align={columns[1].align}
                            onClick={(e) => onSelectTest(e, item)}>
                            {`${item.currentActiveStart.slice(0, 10)} ${item.currentActiveStart.slice(11, 16)}`}
                        </TableCell>
                        <TableCell key={columns[2].id} align={columns[2].align}
                            onClick={(e) => onSelectTest(e, item)}>
                            {`${item.currentActiveEnd.slice(0, 10)} ${item.currentActiveEnd.slice(11, 16)}`}
                        </TableCell>
                        <TableCell key={columns[3].id} align={columns[3].align}
                            onClick={(e) => onSelectTest(e, item)}>
                            {item.qtnOfQuestion}
                        </TableCell>
                        <TableCell key={columns[4].id} align={columns[4].align}
                            onClick={(e) => onSelectTest(e, item)}>
                            {item.timeLimit}
                        </TableCell>
                        <TableCell >
                        <Tooltip title="Registration">
                            <IconButton onClick={(e) => onRegister(e) }>
                                <AssignmentTurnedInOutlinedIcon fontSize='small'/>
                            </IconButton>
                        </Tooltip>
                        </TableCell>
                        <FinalDialog 
                            test={item}
                            setOpenFinalDialog={setOpenFinalDialog}
                            openFinalDialog={openFinalDialog}
                            setConfirm={setConfirm}
                            // registerDisabled={registerDisabled}
                            // setRegisterDisabled={setRegisterDisabled}
                        />
                    </TableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>
        </Paper>
    )
}