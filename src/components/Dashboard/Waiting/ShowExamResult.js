import { Grid, IconButton, Paper, Typography } from "@mui/material"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQSbYTsId, questionSessionSelector } from "../../../store/questionSessionSlice";
import { ChartResultExam } from "./ChartResultExam";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

export const ShowExamResult = ({ setShowExamResult, showExamResults }) => {

    const currentTestSession = useSelector(state => state.testSession.currentTestSession);
    const dispatch = useDispatch();

    const questionSessionList = useSelector(questionSessionSelector);
    // console.log(currentTestSession, questionSessionList)

    const timeInterval = (date1, date2) => {
        function padTo2Digits(num) {
            return num.toString().padStart(2, '0');
        }
        // const t = Math.round((new Date(date2).getTime() - new Date(date1).getTime())/1000);
        const t = new Date((date2 - date1)*1000);
        return `${padTo2Digits(t.getHours())} : ${padTo2Digits(t.getMinutes())} : ${padTo2Digits(t.getSeconds())}`

        // let h, m;
        // if (t/3600 < 1) { h = 0 }
        // else if (t/3600 >= 1) { h = Math.round(t/3600) }; 
        // if (t/60 < 1) { m = 0 }
        // else if (t/60 >= 0) { m = Math.round(t/60) }
        // if (t < 1) { m = 0 }
        // else if (t >= 1) { m = Math.round(t/60) }
        // return { hours: h, minute: m }
        // if (t < 1) { m = 0 }
        // else if (t >= 0) { m = Math.round(t/60) }
        // if (t < 60) {
        //     return {time: t, unit: 'sec'};
        // } else if (t >= 60) {
        //     return {time: t/60, unit: 'min'};
        // }
    }

    useEffect(() => {
        dispatch(fetchQSbYTsId(currentTestSession.id));
    }, []);

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
                        Spent time: {timeInterval(currentTestSession.startTest, currentTestSession.endTest)}
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