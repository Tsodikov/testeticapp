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
import { Button, FormControlLabel, Grid, IconButton, Paper, Switch, TableContainer, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { clearEditingTest, deleteTest, fetchTestsByOrg, setActiveTest, setEditingTest, testsSelector } from '../../../store/testsSlice';
import { setTempMediaFileArray } from '../../../store/mediaFilesSlice';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { updateChapter } from '../../../store/chapterSlice';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import { getByTestId } from '../../../store/testSessionSlice';

const columns = [
    { id: 'test', 
      label: 'Test', 
      minWidth: 220,
      format: (value) => value.toLocaleString('en-US'),
    },
    { id: 'department', 
      label: 'Department', 
      minWidth: 140,
      format: (value) => value.toLocaleString('en-US'),
    },
    { id: 'section', 
      label: 'Section', 
      minWidth: 60,
      format: (value) => value.toLocaleString('en-US'),
    },
    { id: 'passed', 
      label: "Passed", 
      minWidth: 12,
      format: (value) => value.toLocaleString('en-US'),
    },
    { id: 'qtnquestion', 
      label: "Questions", 
      minWidth: 12,
      format: (value) => value.toLocaleString('en-US'),
    },
    { id: 'created', 
      label: "Created", 
      minWidth: 110,
      format: (value) => value.toLocaleString('en-US'),
    },
    { id: 'creator', 
      label: "Creator", 
      minWidth: 12,
      format: (value) => value.toLocaleString('en-US'),
    },
    { id: 'edit', 
      label: "", 
      minWidth: 8,
      width:12,
      format: (value) => value.toLocaleString('en-US'),
    },
    { id: 'editcontent', 
      label: "", 
      minWidth: 8,
      width:12,
      format: (value) => value.toLocaleString('en-US'),
    },
    { id: 'del', 
      label: "", 
      minWidth: 8,
      width:12,
      format: (value) => value.toLocaleString('en-US'),
    },
];

export default function TestsList({ 
    switchMode,
    selectedTest, setSelectedTest, 
    editMode, setEditMode, 
    setShowAddTest
}) {
    const [mode, setMode] = React.useState('mytests');
    const currentUser = useSelector(state => state.users.currentUser);
    const testsList = useSelector(testsSelector);
    const dispatch = useDispatch();
    const [readyToUse, setReadyToUse] = React.useState(true);

    const showList = (mode) => {
        const filteredTestList = readyToUse? testsList.filter(item => item.readyToUse) : testsList.filter(item => !item.readyToUse);
        switch (mode) {
            case 'mytests':
                return filteredTestList.filter(item => item.testCreator.id === currentUser.id);
            case 'mydeparttests':
                return filteredTestList.filter(item => item.department.departmentId === currentUser.departmentId);
            case 'alltests':
                return testsList.filter(item => item);
        
            default:
                break;
        }
    }

    const onCreateTest = (e) => {
        if (editMode) setEditMode(false);
        switchMode('modeAddTest')
        dispatch(clearEditingTest());
    }

    const onEdit =(event, test) => {
        event.preventDefault();
        // setShowAddTest(false);
        dispatch(clearEditingTest());
        dispatch(setEditingTest(test));
        dispatch(setTempMediaFileArray(test.testMediaFiles));
        setEditMode(true);
        // setShowAddTest(true);
        switchMode('modeAddTest');
    }

    const onEditContent = (e, test) => {
        e.preventDefault();
        dispatch(setActiveTest(test));
        // dispatch(setEditingTest(test));
        setEditMode(false);
        switchMode('modeQuestionTable');
    }

    const onStatDisplay = (e, test) => {
        e.preventDefault();
        dispatch(getByTestId(test.id));
        // dispatch(clearActiveTest());
        dispatch(setActiveTest(test));
        switchMode('modeTestStatistic');
    }

    const onSelectTest = (e, test) => {
        e.preventDefault();
        setSelectedTest(test.id);
        dispatch(setActiveTest(test));
        switchMode('modeApplicantTable');
    }

    const onDeleteTest = (test) => {
        dispatch(updateChapter({...test.chapter, qtnTests: test.chapter.qtnTests - 1}));
        dispatch(deleteTest(test.id));
    };

    React.useEffect(() => {
        dispatch(fetchTestsByOrg(currentUser.organization[0].id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Paper
        sx={{ p: 2, width: '100%', overflow: 'hidden' }}
        elevation={6}
        >
        <Grid container spacing={3}>
            <Grid item xs={12} sm={2} lg={2}>
                <Title>Tests list</Title>
            </Grid>
            <Grid item xs={12} sm={2} lg={2}>
                <FormControlLabel 
                    style={{marginTop: "6px"}} 
                    label="Ready to use"
                    control={<Switch 
                        size="small" 
                        checked={readyToUse}
                        onChange={e => setReadyToUse(e.target.checked)}/>}
                />
            </Grid>
            <Grid item xs={12} sm={6} lg={6}>
                <ToggleButtonGroup
                    value={mode}
                    onChange={(e) => setMode(e.target.value)}
                    exclusive
                    aria-label="change mode">
                    <ToggleButton value="mytests" size="small" color="info" sx={{border: "none"}} aria-label="mytests">My tests</ToggleButton>
                    <ToggleButton value="mydeparttests" size="small" color="info" sx={{border: "none"}} aria-label="mydeparttests">My department tests</ToggleButton>
                    <ToggleButton value="alltests" size="small" color="info" sx={{border: "none"}} aria-label="alltests">All</ToggleButton>
                </ToggleButtonGroup>
            </Grid>
            
            <Grid item xs={2} sm={2} lg={2}>
                <Button
                    type="button"
                    size="medium"
                    fullWidth={true}
                    onClick={(e) => onCreateTest(e)}
                    >
                    Create test
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
                        style={{ minWidth: column.minWidth, maxWidth: column.width }}>
                        <Typography variant="subtitle1" sx={{color: "blue"}}>{column.label}</Typography>
                    </TableCell>))}
                </TableRow>
            </TableHead>
            <TableBody>
                {!showList(mode)? null :
                showList(mode)
                .map((test) => (
                    <TableRow 
                    key={test.id}
                    name={test.id}
                    hover 
                    tabIndex={-1}
                    selected={selectedTest === test.id}
                    >
                        <TableCell 
                            onClick={(e) => onSelectTest(e, test)}
                            key={columns[0].id} 
                            align={columns[0].align}>
                            {test.title}
                        </TableCell>
                        <TableCell 
                            onClick={(e) => onSelectTest(e, test)}
                            key={columns[1].id} 
                            align={columns[1].align}>
                            {test.department.departmentTitle}
                        </TableCell>
                        <TableCell 
                            onClick={(e) => onSelectTest(e, test)}
                            key={columns[2].id} 
                            align={columns[2].align}>
                            {test.chapter.chapterTitle}
                        </TableCell>
                        <TableCell
                            onClick={(e) => onSelectTest(e, test)}
                            key={columns[3].id} 
                            align={columns[3].align}>
                            {test.qtnUsers}
                        </TableCell>
                        <TableCell
                            onClick={(e) => onSelectTest(e, test)}
                            key={columns[4].id} 
                            align={columns[4].align}>
                            {test.qtnOfQuestion}
                        </TableCell>
                        <TableCell 
                            key={columns[5].id}
                            onClick={(e) => onSelectTest(e, test)}
                            align={columns[5].align}>
                            {test.dateOfCreate.slice(0, 10)}
                        </TableCell>
                        <TableCell 
                            key={columns[6].id} 
                            onClick={(e) => onSelectTest(e, test)}
                            align={columns[6].align}>
                            {test.testCreator.creatorName}
                        </TableCell>
                        <TableCell sx={{paddingRight: 0, paddingLeft: 0}}>
                            {test.qtnUsers === 0? null :
                            <IconButton onClick={(e) => onStatDisplay(e, test) } >
                                <QueryStatsIcon fontSize='small'/>
                            </IconButton>}
                        </TableCell>
                        <TableCell sx={{paddingRight: 0, paddingLeft: 0}}>
                            <IconButton onClick={(e) => onEdit(e, test) } >
                                <BorderColorOutlinedIcon fontSize='small'/>
                            </IconButton>
                        </TableCell>
                        <TableCell sx={{paddingRight: 0, paddingLeft: 0}}>
                            <IconButton onClick={(e) => onEditContent(e, test) } >
                                <ListAltIcon fontSize='small'/>
                            </IconButton>
                        </TableCell>
                        <TableCell sx={{paddingRight: 0, paddingLeft: 0}}>
                            <IconButton onClick={(e) => onDeleteTest(test) } >
                                <DeleteOutlinedIcon fontSize='small'/>
                            </IconButton>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>
        </Paper>
    );
}