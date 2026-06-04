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

function DateChart({ dateData }) {

  if (!dateData)
    return null;

  const sortedData = [...dateData].sort(
    (a, b) =>
      a.sortDate - b.sortDate
  );

  const downloadChart = async () => {

    const element =
      document.getElementById(
        "date-flight-chart"
      );

    const canvas =
      await html2canvas(
        element
      );

    const link =
      document.createElement("a");

    link.download =
      "Date_Wise_Flight_Trend.png";

    link.href =
      canvas.toDataURL(
        "image/png"
      );

    link.click();
  };

  return (

    <div
      id="date-flight-chart"
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
          Date Wise Flight Trend
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
              Number(value).toFixed(0)
            }
          />

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