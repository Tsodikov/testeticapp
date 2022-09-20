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
        value === 'avrgTimeS'? valueTrans = 'average spent time' :
        value === 'resultRight'? valueTrans = 'right answers' : 
        value === 'resultWrong'? valueTrans = 'wrong answers' : 
        valueTrans = value;
        return <span style={{ color, marginRight: "15px" }}>{valueTrans}</span>;
    };

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
                <Tooltip />
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
