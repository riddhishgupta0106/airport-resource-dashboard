import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    CartesianGrid,
    ResponsiveContainer
  } from "recharts";
  
  function DateChart({ dateData }) {
  
    if (!dateData)
      return null;
  
    return (
  
      <div>
  
        <h2>
          Date Wise Flight Trend
        </h2>
  
        <ResponsiveContainer
          width="100%"
          height={500}
        >
  
          <LineChart
            data={dateData}
          >
  
            <CartesianGrid
              strokeDasharray="3 3"
            />
  
            <XAxis
              dataKey="date"
            />
  
            <YAxis />
  
            <Tooltip />
  
            <Legend />
  
            <Line
              type="monotone"
              dataKey="domestic"
              name="Domestic"
              stroke="#1976d2"
              strokeWidth={3}
            />
  
            <Line
              type="monotone"
              dataKey="international"
              name="International"
              stroke="#ff9800"
              strokeWidth={3}
            />
  
          </LineChart>
  
        </ResponsiveContainer>
  
      </div>
  
    );
  }
  
  export default DateChart;