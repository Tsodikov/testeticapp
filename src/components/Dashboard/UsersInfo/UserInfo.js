import { Container, Grid } from "@mui/material"
import React from "react"
import { AddUser } from "./AddUser";
import UsersTable from "./UsersTable"

export const UsersInfo = ({display}) => {
    const [editMode, setEditMode] = React.useState(false);
    const [showAddUser, setShowAddUser] = React.useState(false);

    const [selectedIndex, setSelectedIndex] = React.useState(0);
    if (display === 'none') return null;
    return (
        <React.Fragment >
        {/* <Toolbar /> */}
        <Container maxWidth="lg"  >
            <Grid container spacing={5} display={display}>
                <Grid item xs={12} md={showAddUser? 7 : 12} lg={showAddUser? 7 : 12}>
                    <UsersTable 
                        selectedIndex={selectedIndex}
                        setSelectedIndex={setSelectedIndex}
                        showAddUser={showAddUser}
                        setShowAddUser={setShowAddUser}
                        setEditMode={setEditMode}
                        display={display}/>
                </Grid>
                {!showAddUser? null : 
                <Grid item xs={12} md={showAddUser? 5 : 12} lg={showAddUser? 5 : 12}>
                    <AddUser
                        showAddUser={showAddUser}
                        setShowAddUser={setShowAddUser}
                        editMode={editMode}
                    />
                </Grid>}
            </Grid>
        </Container>
        </React.Fragment>
    )
}