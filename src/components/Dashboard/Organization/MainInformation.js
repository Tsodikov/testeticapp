import { Container, Grid, Paper, Toolbar } from "@mui/material"
import React from "react"
import AddressForm from "./Adress"
import Chart from "./Chart"
import OrgInfo from "./OrgInfo"

export const MainInformation = ({display}) => {
    return (
        <React.Fragment >
        <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }} >
            <Grid container spacing={5} display={display}>
                <Grid item xs={12} md={6} lg={7}>
                    <Paper
                    elevation={6}
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 380,
                    }}
                    >
                    <OrgInfo />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={2} lg={5}>
                    <Paper
                    elevation={6}
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 320,
                    }}
                    >
                    <AddressForm />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                    <Paper
                    elevation={6}
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 320,
                    }}
                    >
                    <Chart />
                    </Paper>
                </Grid>
            </Grid>
            {/* <Copyright sx={{ pt: 4 }} /> */}
          </Container>
        </React.Fragment>
    )
}