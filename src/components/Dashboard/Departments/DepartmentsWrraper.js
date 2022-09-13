import { Grid } from "@mui/material"
import { Container } from "@mui/system"
import React from "react"
import AddDepartment from "./AddDepartment"
import DepartmentsList from "./DepartmentsList"

export const DepartmentsWrraper = ({display}) => {

    const [selectedDepartment, setSelectedDepartment] = React.useState(0);
    const [editMode, setEditMode] = React.useState(false);
    const [showAddDepartment, setShowAddDepartment] = React.useState(false);

    if (display === 'none') return null;
    return (
        <React.Fragment>
            {/* <Toolbar /> */}
            <Container maxWidth="lg"  >
                <Grid container spacing={5} display={display}>
                    <Grid item xs={12} md={6} lg={6}>
                        <DepartmentsList 
                            selectedDepartment={selectedDepartment}
                            setSelectedDepartment={setSelectedDepartment}
                            setShowAddDepartment={setShowAddDepartment}
                            showAddDepartment={showAddDepartment}
                            editMode={editMode}
                            setEditMode={setEditMode}
                        />
                    </Grid>
                    {!showAddDepartment? null : 
                    <Grid item xs={12} md={6} lg={6}>
                        <AddDepartment 
                            editMode={editMode}
                            setEditMode={setEditMode}
                            showAddDepartment={showAddDepartment}
                            setShowAddDepartment={setShowAddDepartment} />
                    </Grid>}
                </Grid>
            </Container>
        </React.Fragment>
    )
}