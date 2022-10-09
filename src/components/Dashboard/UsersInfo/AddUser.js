import { Grid, TextField, Button, Autocomplete, Paper } from "@mui/material"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchDepartment, listDepartmentForListing } from "../../../store/departmentsSlice";
import { addUserToOrg, setEditingUser } from "../../../store/usersSlice";
import Title from "../Title";

export const AddUser = ({ showAddUser, setShowAddUser, editMode }) => {

    const currentOrganization = useSelector(state => state.organization.currentOrganization);
    const roles = [
        'ADMIN',
        'CREATOR'
    ]
    const [value, setValue] = React.useState(roles[1]);
    const [inputValue, setInputValue] = React.useState(roles[1]);
    const [depValue, setDepValue] = React.useState();
    const dispatch = useDispatch();
    const listDepartment = useSelector(listDepartmentForListing);
    const editingUser = useSelector(state => state.users.editingUser);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const userData = {
            email: data.get('email'),
            password: data.get('password'),
            name: data.get('name'),
            firstName: data.get('firstname'),
            lastName: data.get('lastname'),
            active: true,
            role: inputValue,
            departmentId: depValue.id,
            avatar: 'https://detector.media/doc/images/news/archive/2013/87531/ArticleImage_87531.jpg',
        }
        // console.log(userData)
        setShowAddUser(!showAddUser);
        dispatch(addUserToOrg({userData, orgId: currentOrganization.id}));
    }

    const handleCancel = () => {
        setShowAddUser(!showAddUser);
    }

    useEffect(() => {
        dispatch(fetchDepartment(currentOrganization.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <React.Fragment>
            <Paper
                elevation={6}
                sx={{
                    p: 2,
                    display: 'flex',
                    overflow: 'hidden',
                    flexDirection: 'column',
                    height: 460,
                }}>
            <Title>Add User</Title>
            <Grid container spacing={3} component="form" onSubmit={e => handleSubmit(e)}>
                <Grid item xs={12} sm={6} lg={6}>
                    <TextField
                        required
                        id="name"
                        name="name"
                        label="User name"
                        fullWidth
                        autoComplete="given-name"
                        variant="standard"
                        value={editingUser.name}
                        onChange={e => dispatch(setEditingUser({...editingUser, name: e.target.value}))}
                    />
                </Grid>
                <Grid item xs={12} sm={6} lg={6}>
                    <TextField
                        required
                        id="email"
                        name="email"
                        type="email"
                        label="email"
                        fullWidth
                        autoComplete="email"
                        variant="standard"
                        value={editingUser.email}
                        onChange={e => dispatch(setEditingUser({...editingUser, email: e.target.value}))}
                    />
                </Grid>
                <Grid item xs={12} sm={6} lg={6}>
                    <TextField
                        // required
                        id="firstname"
                        name="firstname"
                        label="First name"
                        fullWidth
                        autoComplete="given-name"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} sm={6} lg={6}>
                    <TextField
                        // required
                        id="lastname"
                        name="lastname"
                        label="Last name"
                        fullWidth
                        autoComplete="given-name"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} sm={12} lg={12}>
                    <TextField
                        required
                        id="password"
                        name="password"
                        type="password"
                        label="Password"
                        fullWidth
                        autoComplete="current-password"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} sm={6} lg={6}>
                <Autocomplete
                    required
                    value={value}
                    onChange={(event, newValue) => {setValue(newValue)}}
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue) => {setInputValue(newInputValue)}}
                    id="role"
                    variant="standard"
                    options={roles}
                    renderInput={(params) => <TextField {...params} label="Role" variant="standard" />}
                />
                </Grid>
                <Grid item xs={12} sm={6} lg={6}>
                <Autocomplete
                    required
                    id="department"
                    name="department"
                    options={listDepartment}
                    value={value}
                    variant="standard"
                    onChange={(event, newVal) => setDepValue(newVal)}
                    renderInput={(params) => <TextField {...params} label="Department" variant="standard"/>}
                    />
                </Grid>
                <Grid item xs={12} sm={6} lg={6}>
                    <TextField
                        // required
                        id="phone"
                        name="phone"
                        type="phone"
                        label="Phone"
                        disabled
                        fullWidth
                        autoComplete="current-phone"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} sm={6} lg={6}></Grid>
                <Grid item xs={12} sm={8} lg={8}></Grid>
                <Grid item xs={12} sm={2} lg={2}>
                    <Button
                        type="button"
                        fullWidth
                        size="medium"
                        sx={{ mt: 0, mb: 6 }}
                        onClick={() => handleCancel()}
                        >
                        Cancel
                    </Button>
                </Grid>
                <Grid item xs={12} sm={1} lg={1}>
                    <Button
                        type="submit"
                        fullWidth
                        size="medium"
                        sx={{ mt: 0, mb: 6 }}
                        >
                        Add
                    </Button>
                </Grid>
            </Grid>
            </Paper>
        </React.Fragment>
    )
}