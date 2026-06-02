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

function DatePCAChart({ dateData }) {

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

      <h2
      style={{
        textAlign: "center",
        color: "#111827",
        fontWeight: 700,
        fontSize: "1.6rem",
        marginBottom: "24px",
        marginTop: "0"
      }}>
        Date Wise PCA Usage
      </h2>

      <ResponsiveContainer
        width="100%"
        height={500}
      >

        <LineChart data={dateData}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="date" />

          <YAxis />

          <Tooltip
  formatter={(value) =>
    Number(value).toFixed(2)
  }
/>

          <Legend />

          <Line
            type="monotone"
            dataKey="domesticPCAHours"
            stroke="#1976d2"
            name="Domestic PCA"
          />

          <Line
            type="monotone"
            dataKey="internationalPCAHours"
            stroke="#ff9800"
            name="International PCA"
          />

        </LineChart>

      </ResponsiveContainer>

    </Paper>

  );

}

export default DatePCAChart;