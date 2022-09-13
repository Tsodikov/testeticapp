import { Card, CardContent, Typography } from '@mui/material';
import React, { PureComponent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BarChart,
  Bar,
  Brush,
  ReferenceLine,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { fetchQSbYTsId, questionSessionSelector } from '../../../store/questionSessionSlice';

const timeInterval = (date1, date2) => {
    const t = Math.round((new Date(date2).getTime() - new Date(date1).getTime())/1000);
    if (t < 60) {
        return {time: t, unit: 'sec'};
    } else if (t >= 60) {
        return {time: t/60, unit: 'min'};
    }
}

export const ChartResultExam = () => {

    const questionSessionList = useSelector(questionSessionSelector);

    const createData = () => {
        // const result =[];
        const result = questionSessionList.map((item, i) => {
            return {
                questionNumber: i + 1,
                spentTime: timeInterval(item.startQuestion, item.endQuestion).time,
                spentTimeUnit: timeInterval(item.startQuestion, item.endQuestion).unit,
                question: item.question.questionText,
                resultColor: item.result? "#a6c5ff" : "#ffb0b0",
                youAnswer: item.choiceAnswers[0].textAnswer,
                // correctAnswer: item.
            };
        });
        return result;
    }

    const data = createData();

    const renderTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Typography sx={{ mb: 1.5, color: 'blue' }} component="div">
                            {`Question ${label} : ${payload[0].payload.question}`}
                        </Typography>
                        <Typography sx={{ mb: 1.5, color: 'blue' }} color="text.secondary">
                            {`You spent ${payload[0].payload.spentTime} ${payload[0].payload.spentTimeUnit} to answer`}
                        </Typography>
                        <Typography sx={{ mb: 1.5, color: 'blue' }} color="text.secondary">
                            {`Your reply: ${payload[0].payload.youAnswer}`}
                        </Typography>
                        <Typography sx={{ mb: 1.5, 
                            color: `${payload[0].payload.resultColor}` }}>
                            {payload[0].payload.resultColor === "#a6c5ff"? 'You gave the correct answer' : 'You gave the wrong answer'}
                        </Typography>
                    </CardContent>
                </Card>
            )
        }
    }

    // useEffect(() => {
    //     dispatch(fetchQSbYTsId(currentTestSession.id));
    // }, []);

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="questionNumber" />
                <YAxis />
                <Tooltip content={renderTooltip} />
                <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />
                <ReferenceLine y={0} stroke="#000" />
                {/* <Brush dataKey="questionNumber" height={20} stroke="#8884d8" /> */}
                <Bar dataKey="spentTime" barSize={5}>
                    {data.map((item, i) => {
                       return <Cell key={`cell-${i}`} fill={item.resultColor} />
                    })}
                </Bar>
                {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
            </BarChart>
        </ResponsiveContainer>
    );
}
