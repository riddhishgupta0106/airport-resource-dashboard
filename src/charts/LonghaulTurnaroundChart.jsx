import html2canvas from "html2canvas";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

function LonghaulTurnaroundChart({
  analytics
}) {

  if (!analytics)
    return null;

  const data = [

    {
      category: "LONGHAUL",
      domestic:
        analytics.domesticLonghaulFlights,
      international:
        analytics.internationalLonghaulFlights
    },

    {
      category: "TURNAROUND",
      domestic:
        analytics.domesticTurnaroundFlights,
      international:
        analytics.internationalTurnaroundFlights
    }

  ];

  const downloadChart = async () => {

    const element =
      document.getElementById(
        "longhaul-turnaround-chart"
      );

    const canvas =
      await html2canvas(
        element
      );

    const link =
      document.createElement("a");

    link.download =
      "Longhaul_vs_Turnaround.png";

    link.href =
      canvas.toDataURL(
        "image/png"
      );

    link.click();
  };

  return (

    <div
      id="longhaul-turnaround-chart"
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
          Longhaul vs Turnaround Flights
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
        height={400}
      >

        <BarChart
          data={data}
          layout="vertical"
          margin={{
            top: 20,
            right: 30,
            left: 120,
            bottom: 20
          }}
        >

          <CartesianGrid
            strokeDasharray="3 3"
          />

          <XAxis
            type="number"
          />

          <YAxis
            type="category"
            dataKey="category"
            width={120}
            tick={{
              fontSize: 13
            }}
          />

          <Tooltip
            formatter={(value) =>
              Number(value).toFixed(0)
            }
          />

          <Legend />

          <Bar
            dataKey="domestic"
            name="Domestic"
            fill="#1976d2"
          />

          <Bar
            dataKey="international"
            name="International"
            fill="#ff9800"
          />

        </BarChart>

      </ResponsiveContainer>

    </div>

  );

}

export default LonghaulTurnaroundChart;