import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Legend, Tooltip } from "recharts";

export const TestStatisticGraph = ({ data }) => {

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
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
                <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="avrgTimeS" fill="blue" barSize={10} />
                <Bar yAxisId="right" stackId="a" dataKey="resultRight" fill="green" barSize={10} />
                <Bar yAxisId="right" stackId="a" dataKey="resultWrong" fill="red" barSize={10}/>
            </BarChart>
        </ResponsiveContainer>
    )
}
