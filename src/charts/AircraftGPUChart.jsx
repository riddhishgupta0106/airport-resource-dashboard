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
  if (!aircraftResourceData) return null;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          color: "#111827",
          fontWeight: 700,
          fontSize: "1.5rem",
          marginBottom: "20px",
          marginTop: 0,
        }}
      >
        GPU Utilization By Aircraft Type
      </h2>

      <ResponsiveContainer width="100%" height={420}>
        <BarChart
          data={aircraftResourceData}
          margin={{
            top: 10,
            right: 20,
            left: 10,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="type" />

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