import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Button, Paper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addDepartment, clearEditingDepartment, setEditingDepartment } from '../../../store/departmentsSlice';
// import { addDepartment, clearActiveDepartment, setActiveDepartment, updateDepartment } from '../../../store/departmentSlice';

export default function AddDepartment({editMode, setEditMode, showAddDepartment, setShowAddDepartment, ...props}) {

    const editingDepartment = useSelector(state => state.department.editingDepartment);
    const currentOrganization = useSelector(state => state.organization.currentOrganization);

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        let newDepartment = {
            name: editingDepartment.name,
            organizationId: currentOrganization.id,
        }
        if (!editMode) {
            dispatch(addDepartment(newDepartment));
        } else {
            // dispatch(updateDepartment(editingDepartment))
        }
        dispatch(clearEditingDepartment());
        setShowAddDepartment(!showAddDepartment);
    }

    const handleCancel = () => {
        setEditMode(false);
        dispatch(clearEditingDepartment());
        setShowAddDepartment(!showAddDepartment);
    }

    return (
        <React.Fragment>
            <Paper
            sx={{ p: 2, width: '100%', overflow: 'hidden' }}
            elevation={6}
            >
                <Typography variant="h6" gutterBottom>
                    {editMode? 'Edit department' : 'Add department' }
                </Typography>
                <Grid container component="form" onSubmit={(e) => handleSubmit(e)} spacing={3}>
                    <Grid item xs={12} sm={9} lg={9}>
                        <TextField
                            id="title"
                            name="title"
                            label="Department"
                            fullWidth
                            autoComplete="title"
                            variant="standard"
                            value={editingDepartment.name}
                            onChange={e => {dispatch(setEditingDepartment({...editingDepartment, name: e.target.value}))}}
                        />
                    </Grid>
                    <Grid item xs={12} sm={8} lg={8}></Grid>
                    <Grid item xs={12} sm={2} lg={2}>
                        <Button
                            type="button"
                            size="medium"
                            onClick={handleCancel}
                            >
                            Cancel
                        </Button>
                    </Grid>
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