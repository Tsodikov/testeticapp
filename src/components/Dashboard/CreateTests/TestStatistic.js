import { CircularProgress, Grid, IconButton, Paper, Typography } from "@mui/material"
import { useSelector } from "react-redux";
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { useEffect } from "react";
import { testSessionSelector } from "../../../store/testSessionSlice";
import { useTimeTransform } from "../../../hooks/timeTransform.hook";
import { useState } from "react";
import { TestStatisticGraph } from "./TestStatisticGraph";
import { Box } from "@mui/system";

export const TestStatistic = ({ setShowTestStatistic }) => {

    const activeTest = useSelector(state => state.tests.activeTest);
    const testSessionLoadingStatus =useSelector(state => state.testSession.testSessionLoadingStatus);
    const testSession = useSelector(testSessionSelector);
    const { averageTime } = useTimeTransform();
    const [data, setData] = useState();

    const getAverageTime = () => {
        return averageTime(
            testSession.filter(item => item.status === 'Exam finished').map(item => ({
                dateStart: item.startTest,
                dateEnd: item.endTest
            }))
        )
    }

    const chartData = () =>  {
        let questionIdArr = activeTest.questions.map(item => item.id);
        let allQuestionSessions = [];
        let data = [];
        questionIdArr.forEach(questId => {
            testSession.filter(item => item.status === 'Exam finished').forEach(item => {
                allQuestionSessions.push(
                    item.questionSessions.filter(qs => questId === qs.questionId)[0]
                );
            });
            data.push({
                questId,
                questionSessions: allQuestionSessions,
            })
            allQuestionSessions = [];
        });
        const dataFinal = [];
        if (data[0].questionSessions.length !== 0) {
        data.forEach((item, i) => {
            dataFinal.push({
                questNumber: i + 1,
                questId: item.questId,
                question: activeTest.questions.filter(q => q.id === item.questId)[0].questionText,
                avrgTimeS: averageTime(item.questionSessions.map(qs => ({
                    dateStart: qs.startQuestion,
                    dateEnd: qs.endQuestion,
                }))).avrgTimeS,
                avrgTimeString: averageTime(item.questionSessions.map(qs => ({
                    dateStart: qs.startQuestion,
                    dateEnd: qs.endQuestion,
                }))).avrgTimeString,
                resultRight: item.questionSessions.filter(qs => qs.result).length,
                resultWrong: item.questionSessions.filter(qs => !qs.result).length
            });
        });}
        data = [];
        setData(dataFinal);
    }

    useEffect(() => {
        if (testSessionLoadingStatus === 'loaded') {
            chartData();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [testSession]);

    if (testSessionLoadingStatus !== 'loaded') 
    return (
        <Box sx={{width: "100%", margin: "auto" }}>
            <CircularProgress />
        </Box>
    );
    // chartData();
    return (
        <Paper
        sx={{ p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 520, }}
        elevation={6}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={11} lg={11}>
                    <Typography variant="subtitle" sx={{color: "blue"}}>
                        {`Statistic to test: ${activeTest.title}`}
                    </Typography>
                </Grid>
                <Grid item xs={2} sm={1} lg={1}>
                    <IconButton onClick={() => setShowTestStatistic(false) }>
                        <ClearOutlinedIcon fontSize='small'/>
                    </IconButton>
                </Grid>
                <Grid item xs={12} sm={2} lg={2}>
                    <Typography variant="subtitle">
                        {`Took part: ${activeTest.qtnUsers} people`}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={2} lg={2}>
                    <Typography variant="subtitle">
                        {`Questions: ${activeTest.qtnOfQuestion}`}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={3} lg={3}>
                    <Typography variant="subtitle">
                        {`Average pass time: ${getAverageTime().avrgTimeString}`}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={2} lg={2}>
                    <Typography variant="subtitle">
                        {`Passed:`}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={2} lg={2}>
                    <Typography variant="subtitle">
                        {`Average score:`}
                    </Typography>
                </Grid>
            </Grid>
            {!data || !data[0].avrgTimeS ? null :
                <TestStatisticGraph data={data} />}
        </Paper>
    )
}