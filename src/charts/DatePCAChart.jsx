import html2canvas from "html2canvas";

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

  const sortedData = [...dateData].sort(
    (a, b) =>
      a.sortDate - b.sortDate
  );

  const downloadChart = async () => {

    const element =
      document.getElementById(
        "date-pca-chart"
      );

    const canvas =
      await html2canvas(
        element
      );

    const link =
      document.createElement("a");

    link.download =
      "Date_Wise_PCA_Usage.png";

    link.href =
      canvas.toDataURL(
        "image/png"
      );

    link.click();
  };

  return (

    <Paper
      id="date-pca-chart"
      sx={{
        p: 3,
        mb: 4,
        borderRadius: 4,
        boxShadow:
          "0 8px 20px rgba(0,0,0,0.08)"
      }}
    >

      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems:
            "center",
          marginBottom:
            "20px"
        }}
      >

        <h2
          style={{
            color: "#111827",
            fontWeight: 700,
            fontSize: "1.6rem",
            margin: 0
          }}
        >
          Date Wise PCA Usage
        </h2>

        <button
          onClick={
            downloadChart
          }
          style={{
            padding:
              "8px 14px",
            border:
              "none",
            borderRadius:
              "8px",
            background:
              "#2563eb",
            color:
              "white",
            cursor:
              "pointer",
            fontWeight:
              600
          }}
        >
          📥 PNG
        </button>

      </div>

      <ResponsiveContainer
        width="100%"
        height={500}
      >

        <LineChart
          data={sortedData}
        >

          <CartesianGrid
            strokeDasharray="3 3"
          />

          <XAxis
            dataKey="date"
          />

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
            strokeWidth={3}
            name="Domestic PCA"
          />

          <Line
            type="monotone"
            dataKey="internationalPCAHours"
            stroke="#ff9800"
            strokeWidth={3}
            name="International PCA"
          />

        </LineChart>

      </ResponsiveContainer>

    </Paper>

  );

}

export default DatePCAChart;