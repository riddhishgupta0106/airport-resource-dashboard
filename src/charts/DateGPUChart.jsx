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

import { Paper } from "@mui/material";

function DateGPUChart({ dateData }) {

  if (!dateData)
    return null;

  return (

    <Paper
      sx={{
        p: 3,
        mb: 4,
        borderRadius: 4,
        boxShadow: "0 8px 20px rgba(0,0,0,0.08)"
      }}
    >

      <h2>
        Date Wise GPU Usage
      </h2>

      <ResponsiveContainer
        width="100%"
        height={500}
      >

        <LineChart data={dateData}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="date" />

          <YAxis />

          <Tooltip />

          <Legend />

          <Line
            type="monotone"
            dataKey="domesticGPUHours"
            stroke="#1976d2"
            name="Domestic GPU"
          />

          <Line
            type="monotone"
            dataKey="internationalGPUHours"
            stroke="#ff9800"
            name="International GPU"
          />

        </LineChart>

      </ResponsiveContainer>

    </Paper>

  );

}

export default DateGPUChart;