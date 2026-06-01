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

function AircraftPCAChart({
  aircraftResourceData
}) {

  if (!aircraftResourceData)
    return null;

  return (

    <div>

      <h2>
        PCA Utilization By Aircraft Type
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
            dataKey="domesticPCAHours"
            name="Domestic PCA"
            fill="#1976d2"
          />

          <Bar
            dataKey="internationalPCAHours"
            name="International PCA"
            fill="#ff9800"
          />

        </BarChart>

      </ResponsiveContainer>

    </div>

  );

}

export default AircraftPCAChart;