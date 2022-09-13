import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Button, Paper } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { useDispatch, useSelector } from 'react-redux';
import { addChapter, clearActiveChapter, setActiveChapter, updateChapter } from '../../../store/chapterSlice';

export default function AddSection({editMode, setEditMode, showAddSection, setShowAddSection, ...props}) {

    // const [date, setDate] = React.useState(new Date());
    const [newTitle, setNewTitle] = React.useState('');
    const [newDescription, setNewDescription] = React.useState('');
    const [newDate, setNewDate] = React.useState(new Date());
    const activeChapter = useSelector(state => state.chapters.activeChapter);
    const currentUser = useSelector(state => state.users.currentUser);
    const currentOrganization = useSelector(state => state.organization.currentOrganization);

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        let newChapter = {
            chapterTitle: newTitle,
            chapterDescription: newDescription,
            chapterCreators: {
                email: editMode? activeChapter.chapterCreators.email : currentUser.email,
                name: editMode? activeChapter.chapterCreators.creatorName : currentUser.name,
                jwt: editMode? activeChapter.chapterCreators.jwt : currentUser.jwt,
            },
            dateOfCreate: editMode? activeChapter.dateOfCreate : new Date(),
            qtnTests: editMode? activeChapter.qtnTests : 0,
            organizationId: currentOrganization.id,
            // tests: []
        }
        if (!editMode) {
            dispatch(addChapter(newChapter));
        } else {
            dispatch(updateChapter(activeChapter))
        }
        setNewTitle('');
        setNewDescription('');
        setNewDate(new Date());
        dispatch(clearActiveChapter());
        setShowAddSection(!showAddSection);
    }

    const handleCancel = () => {
        setEditMode(false);
        dispatch(clearActiveChapter());
        setShowAddSection(!showAddSection);
    }

    return (
        <React.Fragment>
            <Paper
            sx={{ p: 2, width: '100%', overflow: 'hidden' }}
            elevation={6}
            >
                <Typography variant="h6" gutterBottom>
                    {editMode? 'Edit section' : 'Add section' }
                </Typography>
                <Grid container component="form" onSubmit={(e) => handleSubmit(e)} spacing={3}>
                    <Grid item xs={12} sm={9} lg={9}>
                        <TextField
                            id="title"
                            name="title"
                            label="Title section"
                            fullWidth
                            autoComplete="title"
                            variant="standard"
                            value={editMode? activeChapter.chapterTitle : newTitle}
                            onChange={e => {editMode? dispatch(setActiveChapter({...activeChapter, chapterTitle: e.target.value}))
                            : setNewTitle(e.target.value)}}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3} lg={3}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DesktopDatePicker
                                label="Date of create"
                                inputFormat="MM/dd/yyyy"
                                disableFuture
                                value={editMode? activeChapter.dateOfCreate : newDate}
                                onChange={(e) => {
                                    editMode? dispatch(setActiveChapter({...activeChapter, dateOfCreate: e.target.value}))
                                    : setNewDate(e.target.value)
                                }}
                                renderInput={(params) => <TextField {...params} />}
                                />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} sm={12} lg={12}>
                        <TextField
                            required
                            id="description"
                            name="description"
                            label="Description"
                            multiline
                            rows={3}
                            fullWidth
                            autoComplete="description"
                            variant="standard"
                            value={editMode? activeChapter.chapterDescription : newDescription}
                            onChange={e => {editMode? dispatch(setActiveChapter({...activeChapter, chapterDescription: e.target.value}))
                            : setNewDescription(e.target.value)}}
                        />
                    </Grid>
                    <Grid item xs={10} sm={10} lg={10}></Grid>
                    <Grid item xs={1} sm={1} lg={1}>
                        <Button
                            type="button"
                            size="medium"
                            onClick={handleCancel}
                            >
                            Cancel
                        </Button>
                    </Grid>
                    {/* } */}
                    <Grid item xs={1} sm={1} lg={1}>
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