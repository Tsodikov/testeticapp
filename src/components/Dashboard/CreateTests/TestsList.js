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
import { Button, Grid, IconButton, Paper, TableContainer, Typography } from '@mui/material';
import { clearEditingTest, deleteTest, fetchTestsByDep, setActiveTest, setEditingTest, testsSelector } from '../../../store/testsSlice';
import { setTempMediaFileArray } from '../../../store/mediaFilesSlice';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { updateChapter } from '../../../store/chapterSlice';
import QueryStatsIcon from '@mui/icons-material/QueryStats';

const columns = [
    { id: 'test', 
      label: 'Test', 
      minWidth: 160,
      format: (value) => value.toLocaleString('en-US'),
    },
    { id: 'department', 
      label: 'Department', 
      minWidth: 80,
      format: (value) => value.toLocaleString('en-US'),
    },
    { id: 'section', 
      label: 'Section', 
      minWidth: 80,
      format: (value) => value.toLocaleString('en-US'),
    },
    { id: 'passed', 
      label: "Passed", 
      minWidth: 20,
      format: (value) => value.toLocaleString('en-US'),
    },
    { id: 'qtnquestion', 
      label: "Questions", 
      minWidth: 20,
      format: (value) => value.toLocaleString('en-US'),
    },
    { id: 'created', 
      label: "Created", 
      minWidth: 110,
      format: (value) => value.toLocaleString('en-US'),
    },
    { id: 'creator', 
      label: "Creator", 
      minWidth: 20,
      format: (value) => value.toLocaleString('en-US'),
    },
    { id: 'edit', 
      label: "", 
      minWidth: 12,
      width:12,
      format: (value) => value.toLocaleString('en-US'),
    },
    { id: 'editcontent', 
      label: "", 
      minWidth: 12,
      width:12,
      format: (value) => value.toLocaleString('en-US'),
    },
    { id: 'del', 
      label: "", 
      minWidth: 12,
      width:12,
      format: (value) => value.toLocaleString('en-US'),
    },
];

export default function TestsList({ 
    switchMode,
    selectedTest, setSelectedTest, 
    editMode, setEditMode, 
}) {

    const currentUser = useSelector(state => state.users.currentUser);
    const testsList = useSelector(testsSelector);
    const dispatch = useDispatch();

    const onCreateTest = (e) => {
        if (editMode) setEditMode(false);
        switchMode('modeAddTest')
        dispatch(clearEditingTest());
    }

    const onEdit =(event, test) => {
        event.preventDefault();
        dispatch(setEditingTest(test));
        dispatch(setTempMediaFileArray(test.testMediaFiles));
        setEditMode(true);
        switchMode('modeAddTest');
    }

    const onEditContent = (e, test) => {
        e.preventDefault();
        dispatch(setActiveTest(test));
        setEditMode(false);
        switchMode('modeQuestionTable');
    }

    const onStatDisplay = (e, test) => {
        e.preventDefault();
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
        dispatch(fetchTestsByDep(currentUser.departmentId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Paper
        sx={{ p: 2, width: '100%', overflow: 'hidden' }}
        elevation={6}
        >
        <Grid container spacing={3}>
            <Grid item xs={12} sm={10} lg={10}>
                <Title>Tests list</Title>
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
                {!testsList? null :
                testsList
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
                        <TableCell >
                            {!test.readyToUse? null :
                            <IconButton onClick={(e) => onStatDisplay(e, test) }>
                                <QueryStatsIcon fontSize='small'/>
                            </IconButton>}
                        </TableCell>
                        <TableCell >
                            <IconButton onClick={(e) => onEdit(e, test) }>
                                <BorderColorOutlinedIcon fontSize='small'/>
                            </IconButton>
                        </TableCell>
                        <TableCell >
                            <IconButton onClick={(e) => onEditContent(e, test) }>
                                <ListAltIcon fontSize='small'/>
                            </IconButton>
                        </TableCell>
                        <TableCell >
                            <IconButton onClick={(e) => onDeleteTest(test) }>
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