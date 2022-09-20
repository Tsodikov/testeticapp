import { Card, CardContent, Typography } from '@mui/material';
import React, { PureComponent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BarChart,
  Bar,
  ReferenceLine,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  Label,
} from 'recharts';
import { useTimeTransform } from '../../../hooks/timeTransform.hook';
import { questionSessionSelector } from '../../../store/questionSessionSlice';


export const ChartResultExam = () => {
    
    const { timeInterval } = useTimeTransform();
    const questionSessionList = useSelector(questionSessionSelector);

    const createData = () => {
        const result = questionSessionList.map((item, i) => {
            return {
                questionNumber: i + 1,
                spentTime: (new Date(item.endQuestion).getTime() - new Date(item.startQuestion).getTime())/1000,
                spentTimeUnit: timeInterval(item.startQuestion, item.endQuestion),
                question: item.question.questionText,
                resultColor: item.result? "green" : "red",
                youAnswer: item.choiceAnswers[0].textAnswer,
                // correctAnswer: item.
            };
        });
        return result;
    }

    const data = createData();
    console.log(data);

    const renderTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Typography sx={{ mb: 1.5 }} component="div">
                            {`Question ${label} : ${payload[0].payload.question}`}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            {`You spent ${payload[0].payload.spentTimeUnit} to answer`}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            {`Your reply: ${payload[0].payload.youAnswer}`}
                        </Typography>
                        <Typography sx={{ mb: 1.5, 
                            color: `${payload[0].payload.resultColor}` }}>
                            {payload[0].payload.resultColor === "green"? 'You gave the correct answer' : 'You gave the wrong answer'}
                        </Typography>
                    </CardContent>
                </Card>
            )
        }
    }

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
                <XAxis dataKey="questionNumber">
                    <Label value="question number" offset={0} position="insideBottom" />
                </XAxis>
                <YAxis label={{ value: 'spent time, sec', angle: -90, position: 'insideLeft' }}/>
                <Tooltip content={renderTooltip} />
                {/* <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} /> */}
                <ReferenceLine y={1} stroke="#000" />
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
