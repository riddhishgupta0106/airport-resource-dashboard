import html2canvas from "html2canvas";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function AircraftGPUChart({ aircraftResourceData }) {

  if (!aircraftResourceData)
    return null;

  const downloadChart = async () => {

    const element =
      document.getElementById(
        "aircraft-gpu-chart"
      );

    const canvas =
      await html2canvas(
        element
      );

    const link =
      document.createElement("a");

    link.download =
      "Aircraft_GPU_Utilization.png";

    link.href =
      canvas.toDataURL(
        "image/png"
      );

    link.click();
  };

  return (

    <div
      id="aircraft-gpu-chart"
      style={{
        width: "100%",
        height: "100%",
      }}
    >

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "15px"
        }}
      >

        <h2
          style={{
            color: "#111827",
            fontWeight: 700,
            fontSize: "1.5rem",
            margin: 0,
          }}
        >
          GPU Utilization By Aircraft Type
        </h2>

        <button
          onClick={downloadChart}
          style={{
            padding: "8px 14px",
            border: "none",
            borderRadius: "8px",
            background: "#2563eb",
            color: "white",
            cursor: "pointer",
            fontWeight: 600
          }}
        >
          📥 PNG
        </button>

      </div>

      <ResponsiveContainer
        width="100%"
        height={420}
      >

        <BarChart
          data={aircraftResourceData}
          margin={{
            top: 10,
            right: 20,
            left: 10,
            bottom: 20,
          }}
        >

          <CartesianGrid
            strokeDasharray="3 3"
          />

          <XAxis
            dataKey="type"
          />

          <YAxis />

          <Tooltip
            formatter={(value) =>
              Number(value).toFixed(2)
            }
          />

          <Legend
            verticalAlign="bottom"
            height={36}
          />

          <Bar
            dataKey="domesticGPUHours"
            name="Domestic GPU"
            fill="#1976d2"
            radius={[6, 6, 0, 0]}
          />

          <Bar
            dataKey="internationalGPUHours"
            name="International GPU"
            fill="#ff9800"
            radius={[6, 6, 0, 0]}
          />

        </BarChart>

      </ResponsiveContainer>

    </div>

  );

}

export default AircraftGPUChart;