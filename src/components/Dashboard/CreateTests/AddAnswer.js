import React from "react"
import { useDispatch, useSelector } from "react-redux";
import { Button, Checkbox, FormControlLabel, Grid, IconButton, Paper, TextField } from "@mui/material"
import Title from "../Title";
import { clearEditingQuestion, fetchQuestions } from "../../../store/questionsSlice";
import { useEffect } from "react";
import { addAnswers, answersSelector, clearEditingAnswer, setEditingAnswer, updateAnswer } from "../../../store/answersSlice";
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

export const AddAnswer = ({ editMode, setEditMode, setShowAddAnswer }) => {

    const activeTest = useSelector(state => state.tests.activeTest);
    const answersList = useSelector(answersSelector);
    const editingQuestion = useSelector(state => state.questions.editingQuestion);
    const activeQuestion = useSelector(state => state.questions.activeQuestion);
    const editingAnswer = useSelector(state => state.answers.editingAnswer);
    const dispatch = useDispatch();

    const onAddAnswer = (e) => {
        e.preventDefault();
        const newAnswer = {
            textAnswer: editingAnswer.textAnswer,
            answerRight: editingAnswer.answerRight,
            questionId: activeQuestion.id,
        }
        dispatch(clearEditingAnswer());
        editMode? dispatch(updateAnswer({newAnswer, id: editingAnswer.id})) : dispatch(addAnswers(newAnswer));
        editMode? setShowAddAnswer(false) : setShowAddAnswer(true);
    }

    const onAddMediaFile = (e) => {

    }

    const onCancelEditing = () => {
        dispatch(clearEditingQuestion());
        setEditMode(false);
        setShowAddAnswer(false);
    }

    useEffect(() => {
        dispatch(fetchQuestions(activeTest.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeTest])

        return (
            <React.Fragment>
                <Paper
                sx={{ p: 2, width: '100%', overflow: 'hidden' }}
                elevation={6}
                >
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={11} lg={11}>
                        <Title>
                            {!editMode? `Add answer to ${activeQuestion.titleOfQuestion}` :
                             `Edit Answer ${editingAnswer.textAnswer}`}
                        </Title>
                    </Grid>
                    <Grid item xs={2} sm={1} lg={1}>
                        <IconButton onClick={ onCancelEditing }>
                            <ClearOutlinedIcon fontSize='small'/>
                        </IconButton>
                    </Grid>
                    <Grid item xs={12} sm={10} lg={10}>
                        {activeQuestion.answerType === "text"?
                            (<TextField
                                id="answer"
                                name="answer"
                                label="Answer"
                                size="small"
                                disabled={activeQuestion.id? false : true}
                                fullWidth
                                autoComplete="answer"
                                variant="standard"
                                value={editingAnswer.textAnswer}
                                onChange={e => dispatch(setEditingAnswer({...editingAnswer, textAnswer: e.target.value}))}
                            />) : 
                            (<Button
                                size="medium"
                                sx={{marginTop: "20px"}}
                                component="label"
                                fullWidth
                                onChange={(e) => onAddMediaFile(e)}
                                >
                                Add media file
                                <input hidden accept="image/*" multiple type="file" />
                            </Button>)
                        }
                    </Grid>
                    <Grid item xs={4} sm={2} lg={2}>
                        {console.log(answersList.filter(item => item.answerRight === true).length)}
                        <FormControlLabel control={<Checkbox
                            // disabled={activeQuestion.id? false : true}
                            checked={editingAnswer.answerRight}
                            disabled={editingQuestion.oneAnswer === true
                                && answersList.filter(item => item.answerRight === true).length !== 0
                                && editingAnswer.answerRight !== true
                                ? true : false}
                            onChange={(e) => dispatch(setEditingAnswer({...editingAnswer, answerRight: e.target.checked}))}
                            inputProps={{ 'aria-label': 'controlled' }} 
                         />} label="Correct answer" />
                    </Grid>
                    <Grid item xs={2} sm={9} lg={9}></Grid>  
                    <Grid item xs={2} sm={1} lg={1}>
                        <Button
                            type="button"
                            size="medium"
                            onClick={onCancelEditing}
                            >
                            Cancel
                        </Button>
                    </Grid> 
                    <Grid item xs={2} sm={2} lg={2}>
                        <Button
                            type="button"
                            size="medium"
                            onClick={(e) => onAddAnswer(e)}
                            >
                            {editMode? 'Save' : 'Add answer'}
                        </Button>
                    </Grid>
                </Grid>
                </Paper>
            </React.Fragment>
        )
    }

