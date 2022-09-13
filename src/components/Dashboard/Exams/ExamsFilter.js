/* eslint-disable react-hooks/exhaustive-deps */
import { Autocomplete, Grid, TextField } from "@mui/material"
import { Fragment, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { depForListing, fetchDepartment } from "../../../store/departmentsSlice";
import { fetchAllOrganizations, orgForListing } from "../../../store/organizationSlice";


export const ExamsFilter = ({ filteredOrganization, setFilteredOrganization, filteredDepartment, setFilteredDepartment }) => {

    const dispatch = useDispatch();
    const orgList = useSelector(orgForListing);
    const depList = useSelector(depForListing);
    
    useEffect(() => {
        dispatch(fetchAllOrganizations());
    }, []);

    useEffect(() => {
        if (filteredOrganization) {
            dispatch(fetchDepartment(filteredOrganization.id))
        }
    }, [filteredOrganization])

    return (
        <Fragment>
            <Grid container component="form" spacing={3}>
                <Grid item xs={12} sm={4} lg={4}>
                    <Autocomplete
                        required
                        id="organization"
                        variant="standard"
                        options={orgList}
                        sx={{ width: 240 }}
                        value={filteredOrganization}
                        onChange={
                            (event, newOrg) => setFilteredOrganization(newOrg)
                        }
                        renderInput={(params) => <TextField {...params} variant="standard" label="Organization" />}
                    />      
                </Grid>
                <Grid item xs={12} sm={4} lg={4}>
                    <Autocomplete
                        required
                        id="department"
                        variant="standard"
                        options={depList}
                        sx={{ width: 320 }}
                        value={filteredDepartment}
                        onChange={
                            (event, newDep) => setFilteredDepartment(newDep)
                        }
                        renderInput={(params) => <TextField {...params} variant="standard" label="Department" />}
                    />      
                </Grid>
            </Grid>
        </Fragment>
    )
}