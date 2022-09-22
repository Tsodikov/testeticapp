import { Grid, IconButton, Paper, Typography } from "@mui/material"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQSbYTsId, questionSessionSelector } from "../../../store/questionSessionSlice";
import { ChartResultExam } from "./ChartResultExam";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useTimeTransform } from "../../../hooks/timeTransform.hook";

export const ShowExamResult = ({ setShowExamResult, showExamResults }) => {

    const currentTestSession = useSelector(state => state.testSession.currentTestSession);
    const dispatch = useDispatch();
    const { timeInterval } = useTimeTransform();

    const questionSessionList = useSelector(questionSessionSelector);

    useEffect(() => {
        dispatch(fetchQSbYTsId(currentTestSession.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentTestSession]);

    if (!showExamResults) return null;   

    return (
        <Paper
        sx={{ p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 520, }}
        elevation={6}>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={11} lg={11}>
                    <Typography variant="h6" sx={{color: "blue"}} gutterBottom>
                        Results for: {currentTestSession.test.title}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={1} lg={1}>
                    <IconButton onClick={() => setShowExamResult(false) } fullWidth>
                        <CloseOutlinedIcon fontSize='small'/>
                    </IconButton>
                </Grid>
                <Grid item xs={12} sm={2} lg={2}>
                    <Typography variant="subtitle1" gutterBottom>
                        Start exam:
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        {currentTestSession.startTest.slice(0, 10)} {currentTestSession.startTest.slice(11, 16)}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={2} lg={2}>
                    <Typography variant="subtitle1" gutterBottom>
                        Finish exam:
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        {currentTestSession.endTest.slice(0, 10)} {currentTestSession.endTest.slice(11, 16)}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={2} lg={2}>
                    <Typography variant="subtitle1" gutterBottom>
                        Spent time:
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        {timeInterval(currentTestSession.startTest, currentTestSession.endTest)}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={2} lg={2}>
                    <Typography variant="subtitle1" gutterBottom>
                        Qtn questions: {currentTestSession.test.qtnOfQuestion}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={2} lg={2}>
                    <Typography variant="subtitle1" gutterBottom>
                        Right Questions: {questionSessionList.filter(item => item.result).length}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={2} lg={2}>
                    <Typography variant="subtitle1" gutterBottom>
                        Wrong Questions: {questionSessionList.filter(item => !item.result).length}
                    </Typography>
                </Grid> 
            </Grid>
            <ChartResultExam />
        </Paper>
    )
}