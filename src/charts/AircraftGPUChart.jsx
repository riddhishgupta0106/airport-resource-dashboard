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

function AircraftGPUChart({
  aircraftResourceData
}) {

  if (!aircraftResourceData)
    return null;

  return (

    <div>

      <h2>
        GPU Utilization By Aircraft Type
      </h2>

      <ResponsiveContainer
        width="100%"
        height={400}
      >

        <BarChart
          data={aircraftResourceData}
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
            dataKey="type"
            width={150}
          />

          <Tooltip />

          <Legend />

          <Bar
            dataKey="domesticGPUHours"
            name="Domestic GPU"
            fill="#1976d2"
          />

          <Bar
            dataKey="internationalGPUHours"
            name="International GPU"
            fill="#ff9800"
          />

        </BarChart>

      </ResponsiveContainer>

    </div>

  );

}

export default AircraftGPUChart;