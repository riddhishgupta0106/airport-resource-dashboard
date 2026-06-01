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

function GPUStandChart({ standData }) {

  if (!standData)
    return null;

  return (

    <div>

      <h2>
        GPU Utilization By Stand
      </h2>

      <ResponsiveContainer
        width="100%"
        height={1200}
      >

        <BarChart
          data={standData}
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
            dataKey="stand"
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

export default GPUStandChart;