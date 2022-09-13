import { Grid } from '@mui/material';
import { Container } from '@mui/system';
import { useState, Fragment } from 'react';
import { WaitingForConfirmList } from './WaitingForConfirmList';
import { Exam } from './Exam';
import { ShowExamResult } from './ShowExamResult';

export const WaitingForConfirmWrraper = ({ display }) => {

    // const [showTestCard, setShowTestCard] = useState(false);
    const [showExam, setShowExam] = useState(false);
    const [showConfirmList, setShowConfirmList] = useState(true);
    const [showExamResults, setShowExamResult] = useState(false);
    
    if (display === 'none') return null;
    return (
        <Fragment>
            <Container maxWidth="lg"  >
                <Grid container spacing={5} display={display}>
                    {!showConfirmList? null :
                    <Grid item xs={12} md={12} lg={12}>
                        <WaitingForConfirmList 
                            // setShowTestCard={setShowTestCard} 
                            setShowExam={setShowExam}
                            setShowConfirmList={setShowConfirmList}
                            setShowExamResult={setShowExamResult}
                            // setContent={setContent}
                            />
                    </Grid>}
                    {!showExamResults? null :
                    <Grid item xs={12} md={12} lg={12}>
                        <ShowExamResult 
                            // setShowTestCard={setShowTestCard}
                            setShowExamResult={setShowExamResult}
                            setShowConfirmList={setShowConfirmList}
                            setShowExam={setShowExam} />
                    </Grid>}
                    {!showExam? null : 
                    <Grid item xs={12} md={12} lg={12}>
                        <Exam 
                            // setShowTestCard={setShowTestCard}
                            setShowConfirmList={setShowConfirmList}
                            setShowExam={setShowExam}
                            setShowExamResult={setShowExamResult} />
                    </Grid>}
                </Grid>
            </Container>
        </Fragment>
    )
}