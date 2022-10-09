import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Button, Checkbox, FormControl, FormControlLabel, Grid, IconButton, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import { addQuestions, clearEditingQuestion, setEditingQuestion, updateQuestion } from "../../../store/questionsSlice";
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { addMediaToFileServer, clearTempMediaFileArray, delMediaFromFileServer } from "../../../store/mediaFilesSlice";
import { FileTypeSelector } from "../../MediaFiles/ShowMediaFile";
import { updateTest } from "../../../store/testsSlice";

export const AddQuestion = ({ editMode, setEditMode, switchMode, setShowAddQuestion,  }) => {

    const activeTest = useSelector(state => state.tests.activeTest);
    const activeQuestion = useSelector(state => state.questions.activeQuestion);
    const editingQuestion = useSelector(state => state.questions.editingQuestion);
    const tempMediaFilesArray = useSelector(state => state.mediafiles.tempMediaFilesArray);
    const fileServerLoadingStatus = useSelector(state  => state.mediafiles.fileServerLoadingStatus);
    const [loading, setLoading] = React.useState(false);

    const dispatch = useDispatch();

    const onAddQuestion = (e) => {
        e.preventDefault();
        const newQuestion = {
            titleOfQuestion: editingQuestion.titleOfQuestion,
            explanationText: editingQuestion.explanationText,
            weight: Number(editingQuestion.weight),
            oneAnswer: editingQuestion.oneAnswer,
            answerType: editingQuestion.answerType,
            testId: activeTest.id,
            questionMediaFiles: tempMediaFilesArray,
        }
        if (!editMode) {
            dispatch(addQuestions(newQuestion));
            dispatch(updateTest({
                newTest: {
                    ...activeTest,
                    qtnOfQuestion: activeTest.qtnOfQuestion + 1
                }, 
                testId: activeTest.id}))
        } else {
            dispatch(updateQuestion({question: newQuestion, id: editingQuestion.id}));
        }
        if (!editMode) {
            dispatch(clearEditingQuestion());
            dispatch(clearTempMediaFileArray());
        }
        switchMode('modeAddQuestion');
        if (editMode) setShowAddQuestion(false);
    }

    const onAddMediaFile = (e) => {
        setLoading(true);
        dispatch(addMediaToFileServer(e.target.files[0]));
        //     if (fileServerLoadingStatus !== 'loaded') 
        // return (
        //     <Box sx={{width: "100%", margin: "auto" }}>
        //         <CircularProgress />
        //     </Box>
        // );
    };

    const onCancelEditing = () => {
        if (tempMediaFilesArray) {
            tempMediaFilesArray.map(item => dispatch(delMediaFromFileServer(item.url)));
        }
        dispatch(clearTempMediaFileArray());
        dispatch(clearEditingQuestion());
        setEditMode(false);
        // switchMode('modeAddQuestion');
        setShowAddQuestion(false);
    }

    useEffect(() => {
        if (fileServerLoadingStatus === 'loaded') setLoading(false);
        // } else {
        //     setLoading(false);
        // }
    }, [fileServerLoadingStatus])

    return (
        <React.Fragment>
            <Paper
            sx={{ p: 2, width: '100%', overflow: 'hidden' }}
            elevation={6}
            >
            <Grid container spacing={3}>
                <Grid item xs={12} sm={11} lg={11}>
                    <Typography variant="h6" sx={{color: "blue"}}>
                        {!editMode? `Add  question to: ${activeTest.title}`: `Edit question: ${activeQuestion.titleOfQuestion}`}
                    </Typography>
                </Grid>
                <Grid item xs={2} sm={1} lg={1}>
                    <IconButton onClick={() => switchMode('modeAddQuestion') }>
                        <ClearOutlinedIcon fontSize='small'/>
                    </IconButton>
                </Grid>
                <Grid item xs={12} sm={12} lg={12}>
                    <TextField
                        id="question"
                        name="question"
                        label="Question"
                        size="small"
                        fullWidth
                        required
                        autoComplete="question"
                        variant="standard"
                        value={editingQuestion.titleOfQuestion}
                        onChange={e => dispatch(setEditingQuestion({...editingQuestion, titleOfQuestion: e.target.value}))}
                    />
                </Grid>
                <Grid item xs={12} sm={12} lg={12}>
                    <TextField
                        id="explanationText"
                        name="explanationText"
                        label="Explanation text"
                        size="small"
                        fullWidth
                        multiline
                        rows={3}
                        autoComplete="explanationText"
                        variant="standard"
                        value={editingQuestion.explanationText}
                        onChange={e => dispatch(setEditingQuestion({...editingQuestion, explanationText: e.target.value}))}
                    />
                </Grid>
                <Grid item xs={1} sm={2} lg={2}>
                    <LoadingButton
                        size="medium"
                        sx={{marginTop: "20px"}}
                        component="label"
                        loading={loading}
                        loadingPosition="end"
                        fullWidth
                        onChange={(e) => onAddMediaFile(e)}
                        >
                        Add media file
                        <input hidden accept="image/*" multiple type="file" />
                    </LoadingButton>
                </Grid>
                <Grid item xs={12} sm={5} lg={5}></Grid>
                <Grid item xs={4} sm={1} lg={1}>
                    <TextField
                        id="weight"
                        name="weight"
                        label="Weight"
                        size="small"
                        type="number"
                        fullWidth
                        autoComplete="weight"
                        variant="standard"
                        value={editingQuestion.weight}
                        onChange={e => dispatch(setEditingQuestion({...editingQuestion, weight: e.target.value}))}
                    />
                </Grid>
                <Grid item xs={4} sm={2} lg={2}>
                    <FormControlLabel sx={{marginTop: "16px"}} control={
                        <Checkbox
                        // defaultChecked
                        checked={editingQuestion.oneAnswer}
                        onChange={(e) => dispatch(setEditingQuestion({...editingQuestion, oneAnswer: e.target.checked}))}
                        inputProps={{ 'aria-label': 'controlled' }} 
                        />} label="Just one answer" />
                </Grid>
                <Grid item xs={4} sm={2} lg={2}>
                    <FormControl variant="standard" sx={{  minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-standard-label">Answer's type</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            disabled={editingQuestion.answers.length !== 0? true : false}
                            value={editingQuestion.answerType}
                            onChange={(e) => dispatch(setEditingQuestion({...editingQuestion, answerType: e.target.value}))}
                            label="Answer's type"
                        >
                            <MenuItem value="text">Text</MenuItem>
                            <MenuItem value={"picture"}>Picture</MenuItem>
                            <MenuItem value={"video"}>Video</MenuItem>
                            <MenuItem value={"pdf"}>PDF</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={10} lg={10}>
                    {tempMediaFilesArray.length === 0? null :
                        tempMediaFilesArray.map((item, i) => (
                    <FileTypeSelector key={i} url={item.url} type={item.type} />
                    ))}
                </Grid>
                <Grid item xs={12} sm={9} lg={9}></Grid>
                <Grid item xs={1} sm={1} lg={1}>
                    <Button
                        type="button"
                        size="medium"
                        onClick={(e) => onCancelEditing(e)}
                        >
                        Cancel
                    </Button>
                </Grid>
                <Grid item xs={2} sm={2} lg={2}>
                    <Button
                        type="button"
                        size="medium"
                        onClick={(e) => onAddQuestion(e)}
                        >
                        {editMode? 'Save question' : 'Add question'}
                    </Button>
                </Grid>
            </Grid>
            </Paper>
        </React.Fragment>
    )
}

