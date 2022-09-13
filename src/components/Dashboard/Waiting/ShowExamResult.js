import { Grid, IconButton, Paper, Typography } from "@mui/material"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQSbYTsId, questionSessionSelector } from "../../../store/questionSessionSlice";
import { ChartResultExam } from "./ChartResultExam";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

export const ShowExamResult = ({ setShowExamResult }) => {

    const currentTestSession = useSelector(state => state.testSession.currentTestSession);
    const dispatch = useDispatch();

    // const questionSessionList = useSelector(questionSessionSelector);
    // console.log(currentTestSession, questionSessionList)

    const timeInterval = (date1, date2) => {
        const t = Math.round((new Date(date2).getTime() - new Date(date1).getTime())/1000);
        if (t < 60) {
            return {time: t, unit: 'sec'};
        } else if (t >= 60) {
            return {time: t/60, unit: 'min'};
        }
    }

    useEffect(() => {
        dispatch(fetchQSbYTsId(currentTestSession.id));
    }, []);

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
                        Qtn questions: {currentTestSession.test.qtnOfQuestion}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={2} lg={2}>
                    <Typography variant="subtitle1" gutterBottom>
                        Right Questions: {currentTestSession.test.qtnOfQuestion}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={2} lg={2}>
                    <Typography variant="subtitle1" gutterBottom>
                        Wrong Questions: {currentTestSession.test.qtnOfQuestion}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={2} lg={2}>
                    <Typography variant="subtitle1" gutterBottom>
                        Spent time: {timeInterval(currentTestSession.startTest, currentTestSession.endTest).time}
                    </Typography>
                </Grid>
            </Grid>
            <ChartResultExam />
        </Paper>
    )
}