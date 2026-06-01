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

function StandChart({ standData }) {

  if (!standData)
    return null;

  return (

    <div>

      <h2>
        Stand Utilization Analysis
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
            left: 50,
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
            width={80}
          />

          <Tooltip />

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

export default StandChart;