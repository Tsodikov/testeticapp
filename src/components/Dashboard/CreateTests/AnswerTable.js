import { Button, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { clearEditingQuestion } from "../../../store/questionsSlice"
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import SpellcheckOutlinedIcon from '@mui/icons-material/SpellcheckOutlined';import { answersSelector, clearEditingAnswer, deleteAnswer, fetchAnswers, setEditingAnswer } from "../../../store/answersSlice";

const columns = [
    { id: 'numb', 
      label: '#', 
      minWidth: 5,
      format: (value) => value.toLocaleString('en-US'),
    },
    { id: 'answer', 
      label: 'Answer', 
      minWidth: 80,
      format: (value) => value.toLocaleString('en-US'),
    },
    { id: 'right', 
      label: "Right", 
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

export const AnswerTable = (
    {
        setEditMode, editMode, switchMode,
        // setShowAddAnswer, showAddAnswer, 
        // setShowMediaFiles,
        // setShowAddQuestion, 
        setShowAnswerTable,
        setShowQuestionTable,
    }) => {

const answersList = useSelector(answersSelector);
const [selectedQuestion, setSelectedQuestion] = useState(0);
const dispatch = useDispatch();
const activeQuestion = useSelector(state => state.questions.activeQuestion);

const onSelectQuestion = (e, question) => {
    e.preventDefault();
    setSelectedQuestion(question.id);
    if (editMode) {
        dispatch(clearEditingQuestion());
    }
}
const onAddAnswer = () => {
    setEditMode(false);
    dispatch(clearEditingAnswer());
    switchMode('modeAddAnswer');
    setShowQuestionTable(true);
    setShowAnswerTable(true);
    // setShowAddQuestion(false);
    // setShowMediaFiles(false);
    // setShowAddAnswer(true);
}

const onDeleteAnswer = (id) => {
    dispatch(deleteAnswer(id));
}

const onEditAnswer = (e, answer) => {
    e.preventDefault();
    setEditMode(true);
    dispatch(setEditingAnswer(answer));
    switchMode('modeAddAnswer');
    setShowQuestionTable(true);
    setShowAnswerTable(true);
}

useEffect(() => {
    dispatch(fetchAnswers(activeQuestion.id));
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [activeQuestion])

return (
    <Paper
        sx={{ p: 2, width: '100%', overflow: 'hidden' }}
        elevation={6}>
        <Grid container spacing={3}>
        <Grid item xs={12} sm={9} lg={9}>
            <Typography variant="subtitle" sx={{color: "blue"}}>
                {`Answers to question: ${activeQuestion.title}`}
            </Typography>
        </Grid>
        <Grid item xs={2} sm={3} lg={3}>
            <Button
                type="button"
                size="small"
                fullWidth={true}
                onClick={() => onAddAnswer()}>
                Add answer
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
                    {!answersList? null :
                    answersList.map((item, i) => (
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
                                    {item.textAnswer}
                            </TableCell>
                            <TableCell 
                                onClick={(e) => onSelectQuestion(e, item)}
                                key={columns[2].id} 
                                align={columns[2].align}>
                                    {!item.answerRight? null : <SpellcheckOutlinedIcon fontSize='small'/>}
                            </TableCell>
                            <TableCell >
                                <IconButton sx={{width: "32px"}} onClick={(e) => onEditAnswer(e, item) }>
                                    <BorderColorOutlinedIcon fontSize='small'/>
                                </IconButton>
                            </TableCell>
                            <TableCell >
                                <IconButton sx={{width: "32px"}} onClick={(e) => onDeleteAnswer(item.id) }>
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