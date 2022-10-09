import { Grid } from '@mui/material';
import { Container } from '@mui/system';
import { useState, Fragment } from 'react';
import { TestCard } from './TestCard';
import { ExamsList } from './ExamsList';

export const ExamsWrraper = ({display}) => {

    const [selectedTest, setSelectedTest] = useState();
    const [showTestCard, setShowTestCard] = useState();

    if (display === 'none') return null;
    return (
        <Fragment>
            <Container maxWidth="lg"  >
                <Grid container spacing={5} display={display}>
                    <Grid item xs={12} md={12} lg={12}>
                        <ExamsList 
                            selectedTest={selectedTest}
                            setSelectedTest={setSelectedTest}
                            setShowTestCard={setShowTestCard}
                        />
                    </Grid>
                    {!showTestCard? null : 
                    <Grid item xs={12} md={12} lg={12}>
                        <TestCard 
                            mode="preview"
                            setShowTestCard={setShowTestCard}/>
                    </Grid>}
                </Grid>
            </Container>
        </Fragment>
    )
}