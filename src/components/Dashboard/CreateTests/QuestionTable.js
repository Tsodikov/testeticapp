import { Button, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { clearEditingQuestion, deleteQuestion, fetchQuestions, questionsSelector, setActiveQuestion, setEditingQuestion } from "../../../store/questionsSlice"
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import PermMediaOutlinedIcon from '@mui/icons-material/PermMediaOutlined';
import { clearTempMediaFileArray, setTempMediaFileArray } from "../../../store/mediaFilesSlice";
import { updateTest } from "../../../store/testsSlice";

const columns = [
    { id: 'numb', 
      label: '#', 
      minWidth: 5,
      format: (value) => value.toLocaleString('en-US'),
    },
    { id: 'question', 
      label: 'Question', 
      minWidth: 80,
      format: (value) => value.toLocaleString('en-US'),
    },
    { id: 'weight', 
      label: "Weight", 
      minWidth: 5,
      width: 5,
      format: (value) => value.toLocaleString('en-US'),
    },
    { id: 'but1', 
      label: "", 
      minWidth: 5,
      format: (value) => value.toLocaleString('en-US'),
    },
    { id: 'but2', 
      label: "", 
      minWidth: 5,
      format: (value) => value.toLocaleString('en-US'),
    },
]

export const QuestionTable = (
    {
        setEditMode, editMode, 
        setShowQuestionTable,
        // setShowAddQuestion, showAddQuestion, 
        setShowAnswerTable, showAnswerTable,
        // setShowMediaFiles,
        // setShowAddAnswer,
        switchMode}) => {

const questionsList = useSelector(questionsSelector);
const [selectedQuestion, setSelectedQuestion] = useState(0);
const dispatch = useDispatch();
const activeTest = useSelector(state => state.tests.activeTest);

const onSelectQuestion = (e, question) => {
    e.preventDefault();
    setSelectedQuestion(question.id);
    switchMode('modeAnswerTable');
    setShowQuestionTable(true);
    // setShowAnswerTable(true);
    dispatch(setActiveQuestion(question));
    if (editMode) {
        dispatch(clearEditingQuestion());
    }
}

const onShowMedia = (e, question) => {
    dispatch(setTempMediaFileArray(question.mediaFile));
    switchMode('modeMediaFiles');
    setShowQuestionTable(true);
    showAnswerTable? setShowAnswerTable(true) : showAnswerTable(false);
    // setShowAddAnswer(false);
    // setShowAddQuestion(false);
    // setShowMediaFiles(true);
}

const onAddQuestion = () => {
    setEditMode(false);
    dispatch(clearTempMediaFileArray());
    dispatch(clearEditingQuestion());
    switchMode('modeAddQuestion');
    setShowQuestionTable(true);
    showAnswerTable? setShowAnswerTable(true) : showAnswerTable(false);
    // setShowAddAnswer(true);
    // setShowMediaFiles(false);
    // setShowAddQuestion(true);
}

const onDeleteQuestion = (id) => {
    dispatch(deleteQuestion(id));
    dispatch(updateTest({
        newTest: {
            ...activeTest,
            qtnOfQuestion: activeTest.qtnOfQuestion - 1
        }, 
        testId: activeTest.id}))
}

const onEditQuestion = (e, question) => {
    e.preventDefault();
    setEditMode(true);
    dispatch(setTempMediaFileArray(question.mediaFile));
    dispatch(setEditingQuestion(question));
    switchMode('modeAddQuestion');
    setShowQuestionTable(true);
    showAnswerTable? setShowAnswerTable(true) : showAnswerTable(false);
    // setShowAddAnswer(false);
    // setShowMediaFiles(false);
    // setShowAddQuestion(true);
}

useEffect(() => {
    dispatch(fetchQuestions(activeTest.id));
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [activeTest])

return (
    <Paper
        sx={{ p: 2, width: '100%', overflow: 'hidden' }}
        elevation={6}>
        <Grid container spacing={3}>
        <Grid item xs={12} sm={9} lg={9}>
            <Typography variant="subtitle" sx={{color: "blue"}}>
                {`Questions to test: ${activeTest.title}`}
            </Typography>
        </Grid>
        <Grid item xs={2} sm={3} lg={3}>
            <Button
                type="button"
                size="small"
                fullWidth={true}
                onClick={() => onAddQuestion()}>
                Add question
            </Button>
        </Grid>
    </Grid>
    <Grid container spacing={3}>
        <Grid item xs={12} sm={12} lg={12}>
            <TableContainer sx={{ maxHeight: 280 }}>
                <Table size="small" stickyHeader aria-label="sticky table">
                    <TableHead >
                        <TableRow>
                            {columns.map(column => (
                            <TableCell 
                                key={column.id}
                                align={column.align}
                                style={{ minWidth: column.minWidth }}>
                                <Typography variant="subtitle2" sx={{color: "blue"}}>
                                    {column.label}
                                </Typography>
                            </TableCell>))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {!questionsList? null :
                    questionsList.map((item, i) => (
                        <TableRow 
                        key={i}
                        hover 
                        tabIndex={-1}
                        selected={selectedQuestion === item.id}
                        >
                            <TableCell 
                                onClick={
                                    (e) => onSelectQuestion(e, item)}
                                key={columns[0].id} 
                                align={columns[0].align}>
                                    {i+1}
                            </TableCell>
                           
                            <TableCell 
                                onClick={(e) => onSelectQuestion(e, item)}
                                key={columns[1].id} 
                                align={columns[1].align}>
                                    {item.titleOfQuestion}
                            </TableCell>

                            <TableCell 
                                onClick={(e) => onSelectQuestion(e, item)}
                                key={columns[2].id} 
                                align={columns[2].align}>
                                    {item.weight}
                            </TableCell>
                            
                            <TableCell >
                                {item.mediaFile.length === 0? null :
                                <IconButton sx={{width: "32px"}} onClick={(e) => onShowMedia(e, item) }>
                                    <PermMediaOutlinedIcon fontSize='small'/>
                                </IconButton>}
                            </TableCell>
                            <TableCell >
                                <IconButton sx={{width: "32px"}} onClick={(e) => onEditQuestion(e, item) }>
                                    <BorderColorOutlinedIcon fontSize='small'/>
                                </IconButton>
                            </TableCell>
                            <TableCell >
                                <IconButton sx={{width: "32px"}} onClick={(e) => onDeleteQuestion(item.id) }>
                                    <DeleteOutlinedIcon fontSize='small'/>
                                </IconButton>
                            </TableCell>
                        </TableRow>))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    </Grid>
    </Paper>
)
}