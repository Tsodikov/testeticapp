import { Card, CardContent, Typography } from "@mui/material";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Legend, Tooltip, Area, ComposedChart, Scatter } from "recharts";

export const TestStatisticGraph = ({ data }) => {

    const renderLegend = (props) => {
        const { payload } = props;
      
        return (
          <ul>
            {
              payload.map((entry, index) => (
                <li key={`item-${index}`}>{entry.value}</li>
              ))
            }
          </ul>
        );
      }

    const renderColorfulLegendText = (value, entry) => {
        const { color } = entry;
        let valueTrans;
        value === 'avrgTimeS'? valueTrans = 'середній час відповіді' :
        value === 'resultRight'? valueTrans = 'правильна відповідь' : 
        value === 'resultWrong'? valueTrans = 'неправильна відповідь' : 
        valueTrans = value;
        return <span style={{ color, marginRight: "15px" }}>{valueTrans}</span>;
    };

    const renderTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Typography sx={{ mb: 1.5 }} component="div">
                            {`Питання ${label} : ${payload[0].payload.question}`}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} component="div">
                            {`Усього відповідей: ${payload[0].payload.resultRight + payload[0].payload.resultWrong}`}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} component="div">
                            {`Правильних відповідей : ${
                                Math.floor(payload[0].payload.resultRight/(payload[0].payload.resultRight + 
                                           payload[0].payload.resultWrong)*100)
                                }%`}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} component="div">
                            {`Усього правильних відповідей: ${payload[0].payload.resultRight}`}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} component="div">
                            {`Усього неправильних відповідей : ${payload[0].payload.resultWrong}`}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} >
                            {`Середній час відповіді ${payload[0].payload.avrgTimeS} сек`}
                        </Typography>
                    </CardContent>
                </Card>
            )
        }
    }

    return (
        <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="questNumber" />
                <YAxis />
                {/* <YAxis yAxisId="left" orientation="left" stroke="#8884d8" /> */}
                <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                <Tooltip content={renderTooltip}/>
                <Legend formatter={renderColorfulLegendText}/>
                <Area type="monotone" dataKey="avrgTimeS" fill="#8884d8" stroke="#8884d8" />
                {/* <Bar yAxisId="left" dataKey="avrgTimeS" fill="blue" barSize={10} /> */}
                <Bar yAxisId="right" stackId="a" dataKey="resultRight" fill="green" barSize={10} />
                <Bar yAxisId="right" stackId="a" dataKey="resultWrong" fill="red" barSize={10}/>
                <Scatter dataKey="avrgTimeS" fill="blue" />
            </ComposedChart>
        </ResponsiveContainer>
    )
}
