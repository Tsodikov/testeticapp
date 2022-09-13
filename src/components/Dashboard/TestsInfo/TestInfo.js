import { Container, Grid } from "@mui/material"
import React from "react"
import ApplicantTable from "../CreateTests/ApplicantTable";
import { StudentInfo } from "../CreateTests/StudentInfo";
import TestsTable from "./TestsTable";

export const TestsInfo = ({display}) => {

    const [selectedTest, setSelectedTest] = React.useState(0);
    const [selectedUser, setSelectedUser] = React.useState({});
    if (display === 'none') return null;
    return (
        <React.Fragment >
        {/* <Toolbar /> */}
        <Container maxWidth="lg"  >
            <Grid container spacing={5} display={display}>
                <Grid item xs={12} md={12} lg={12}>
                    <TestsTable selectedTest={selectedTest} setSelectedTest={setSelectedTest}/>
                </Grid>
                <Grid item xs={12} md={6} lg={8}>
                    {!selectedTest? null :
                        <ApplicantTable
                            selectedTest={selectedTest} 
                            setSelectedTest={setSelectedTest}
                            selectedUser={selectedUser}
                            setSelectedUser={setSelectedUser}
                            />
                    }
                    
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                {!selectedTest? null :
                        <StudentInfo selectedUser={selectedUser} />
                    }
                </Grid>

            </Grid>
        </Container>
        </React.Fragment>
    )
}