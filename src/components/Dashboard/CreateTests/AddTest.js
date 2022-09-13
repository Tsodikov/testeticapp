import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Autocomplete, Button, FormControlLabel, Input, InputAdornment, Paper, Switch } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useDispatch, useSelector } from 'react-redux';
import { chaptersSelector, fetchChapters, listChapterForListing, updateChapter } from '../../../store/chapterSlice';
import { addTest, clearActiveTest, clearEditingTest, setEditingTest, updateTest } from '../../../store/testsSlice';
import { addMediaToFileServer, clearTempMediaFileArray } from '../../../store/mediaFilesSlice'
import { FileTypeSelector } from '../../MediaFiles/ShowMediaFile';

export default function AddTest({editMode, setEditMode, showAddTest, setShowAddTest, ...props}) {

    const editingTest = useSelector(state => state.tests.editingTest);
    const listChapter = useSelector(listChapterForListing);
    const chaptersList = useSelector(chaptersSelector);
    const tempMediaFilesArray = useSelector(state => state.mediafiles.tempMediaFilesArray);
    const currentOrganization = useSelector(state => state.organization.currentOrganization);
    const currentUser = useSelector(state => state.users.currentUser);
    const [dateActiveStart, setDateActiveStart] = React.useState(
        editMode? editingTest.currentActiveStart : new Date());
    const [dateActiveEnd, setDateActiveEnd] = React.useState(
        editMode? editingTest.currentActiveEnd : new Date());
    const [tempTitle, setTempTitle] = React.useState(editMode? editingTest.title : '');
    const [tempDescription, setTempDescription] = React.useState(editMode? editingTest.description : '')


    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(editingTest.startAnyTime)
        let newTest = {
            title: tempTitle,
            description: tempDescription,
            dateOfCreate: !editMode? new Date() : editingTest.dateOfCreate,
            readyToUse: editingTest.readyToUse,
            qtnOfQuestion: editingTest.qtnOfQuestion,
            qtnUsers: editingTest.qtnUsers,
            testMediaFiles: tempMediaFilesArray,
            creatorId: !editMode? currentUser.id : editingTest.testCreatorId,
            creatorName: !editMode? currentUser.name : editingTest.testCreatorName,
            timeLimitPassTest: editingTest.timeLimitPassTest,
            timeLimit: Number(editingTest.timeLimit),
            preRegistration: editingTest.preRegistration,
            startAnyTime: editingTest.startAnyTime,
            currentActiveStart: dateActiveStart,
            currentActiveEnd: dateActiveEnd,
            backToAnyQuestion: editingTest.backToAnyQuestion,
            showResultQuestion: editingTest.showResultQuestion,
            showResultTest: editingTest.showResultTest,
            organizationId: currentOrganization.id,
            departmentId: currentUser.departmentId,
            chapterId: editingTest.chapter.chapterId,
            chapterTitle: editingTest.chapter.chapterTitle,
        }
        if (!editMode) {
            const chapterUpd = chaptersList.filter(item => item.id === editingTest.chapter.chapterId)[0];
            dispatch(addTest(newTest));
            dispatch(updateChapter({...chapterUpd, qtnTests: chapterUpd.qtnTests + 1}));
        } else {
            dispatch(updateTest({newTest, testId: editingTest.id}));
        }
    
        dispatch(clearEditingTest());
        dispatch(clearTempMediaFileArray());
        setShowAddTest(false);
    }

    const handleCancel = () => {
        setEditMode(false);
        dispatch(clearActiveTest());
        dispatch(clearEditingTest());
        dispatch(clearTempMediaFileArray());
        setShowAddTest(false);
    }

    const onAddMediaFile = (e) => {
        dispatch(addMediaToFileServer(e.target.files[0]));
    };

    React.useEffect(() => {
        dispatch(fetchChapters(currentOrganization.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <React.Fragment>
            <Paper
            sx={{ p: 2, width: '100%', overflow: 'hidden' }}
            elevation={6}
            >
                <Typography variant="h6" gutterBottom>
                    {editMode? 'Edit test' : 'Add test' }
                </Typography>
                <Grid container component="form" onSubmit={(e) => handleSubmit(e)} spacing={3}>
                    <Grid item xs={12} sm={8} lg={8}>
                        <TextField
                            id="title"
                            name="title"
                            label="Title test"
                            size="small"
                            multiline
                            rows={2}
                            fullWidth
                            autoComplete="title"
                            variant="standard"
                            value={tempTitle}
                            onChange={e => setTempTitle(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4} lg={4}>
                    <Autocomplete
                        required
                        id="sections"
                        variant="standard"
                        options={listChapter}
                        sx={{ width: 300 }}
                        value={editingTest.chapter.chapterTitle}
                        onChange={
                            (event, newSection) => dispatch(setEditingTest({
                                ...editingTest, 
                                chapter: {
                                    chapterId: newSection.id, 
                                    chapterTitle: newSection.label
                                }}))
                        }
                        renderInput={(params) => <TextField {...params} label="Sections" />}
                    />
                    </Grid>
                    <Grid item xs={12} sm={3} lg={3} >
                        <FormControlLabel 
                            style={{marginBottom: "8px"}} 
                            control={<Switch 
                                size="small" 
                                checked={editingTest.preRegistration}
                                onChange={e => dispatch(setEditingTest({...editingTest, preRegistration: e.target.checked}))}
                            />} 
                            label="Pre-registration required" />
                        <FormControlLabel 
                            style={{marginBottom: "8px"}} 
                            control={<Switch 
                                size="small" 
                                checked={editingTest.timeLimitPassTest}
                                onChange={e => dispatch(setEditingTest({...editingTest, timeLimitPassTest: e.target.checked}))}
                            />} 
                            label="Test is time limited" />
                        <FormControlLabel 
                            style={{marginBottom: "8px"}} 
                            control={<Switch 
                                size="small" 
                                checked={editingTest.startAnyTime}
                                onChange={e => dispatch(setEditingTest({...editingTest, startAnyTime: e.target.checked}))}
                            />} 
                            label="Exam at any time" />
                        <FormControlLabel 
                            style={{marginBottom: "8px"}} 
                            control={<Switch 
                                size="small"
                                checked={editingTest.backToAnyQuestion}
                                onChange={e => dispatch(setEditingTest({...editingTest, backToAnyQuestion: e.target.checked}))}
                            />} 
                            label="Back to any Question" />
                        <FormControlLabel 
                            style={{marginBottom: "8px"}} 
                            control={<Switch 
                                size="small" 
                                checked={editingTest.showResultQuestion}
                                onChange={e => dispatch(setEditingTest({...editingTest, showResultQuestion: e.target.checked}))}
                            />} 
                            label="Show result question" />
                        <FormControlLabel 
                            style={{marginBottom: "30px"}} 
                            control={<Switch 
                                size="small" 
                                checked={editingTest.showResultTest}
                                onChange={e => dispatch(setEditingTest({...editingTest, showResultTest: e.target.checked}))}
                            />} 
                            label="Show result test" />
                        <FormControlLabel 
                                control={<Switch 
                                size="small" 
                                checked={editingTest.readyToUse}
                                onChange={e => dispatch(setEditingTest({...editingTest, readyToUse: e.target.checked}))}
                            />} 
                            label="Ready to use" />
                    </Grid>
                    <Grid item xs={12} sm={3} lg={3}>
                        <TextField
                            required
                            id="timeLimit"
                            name="timeLimit"
                            label="Exam duration (hours)"
                            disabled={!editingTest.timeLimitPassTest}
                            size="small"
                            type="number"
                            fullWidth
                            autoComplete="description"
                            variant="standard"
                            value={editingTest.timeLimit}
                            onChange={e => dispatch(setEditingTest({...editingTest, timeLimit: e.target.value}))}
                        />
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Start exam period"
                                inputFormat="dd/MM/yyyy"
                                disabled={editingTest.startAnyTime}
                                value={dateActiveStart}
                                onChange={newValue => setDateActiveStart(newValue)}
                                renderInput={(params) => <TextField margin="normal" {...params} />}
                                />
                        </LocalizationProvider>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="End exam period"
                                inputFormat="dd/MM/yyyy"
                                disabled={editingTest.startAnyTime}
                                value={dateActiveEnd}
                                onChange={dateVal => setDateActiveEnd(dateVal)}
                                renderInput={(params) => <TextField {...params} />}
                                />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={6} >
                    <TextField
                            required
                            id="description"
                            name="description"
                            label="Description"
                            size="small"
                            multiline
                            rows={7}
                            fullWidth
                            autoComplete="description"
                            variant="standard"
                            value={tempDescription}
                            onChange={e => setTempDescription(e.target.value)}
                        />
                    </Grid>
                        <Grid item xs={12} sm={2} lg={2}>
                            <Button
                                size="medium"
                                component="label"
                                fullWidth
                                onChange={(e) => onAddMediaFile(e)}
                                >
                                Add media file
                                <input hidden accept="image/*" multiple type="file" />
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={10} lg={10}>
                            <Input
                                id="link"
                                fullWidth
                                variant="standard"
                                startAdornment={<InputAdornment position="start">http://</InputAdornment>}
                                aria-describedby="outlined-weight-helper-text"
                                inputProps={{
                                'aria-label': 'link',
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={10} lg={10}>
                            {tempMediaFilesArray.length === 0? null :
                             tempMediaFilesArray.map((item, i) => (
                            <FileTypeSelector key={i} url={item.url} type={item.type} />
                            ))}
                        </Grid>
                    <Grid item xs={4} sm={10} lg={10}></Grid>
                    <Grid item xs={2} sm={1} lg={1}>
                        <Button
                            type="button"
                            size="medium"
                            onClick={handleCancel}
                            >
                            Cancel
                        </Button>
                    </Grid>
                    <Grid item xs={2} sm={1} lg={1}>
                        <Button
                            type="submit"
                            size="medium"
                            >
                            {editMode? 'Save' : 'Add'}
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </React.Fragment>
    );
}       