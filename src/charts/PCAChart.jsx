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

function PCAChart({ airlineData }) {

  if (!airlineData)
    return null;

  const sortedData = [...airlineData].sort(
    (a, b) =>
      (
        (b.domesticPCAHours || 0) +
        (b.internationalPCAHours || 0)
      ) -
      (
        (a.domesticPCAHours || 0) +
        (a.internationalPCAHours || 0)
      )
  );

  return (

    <div>

      <h2
        style={{
          textAlign: "center",
          color: "#111827",
          fontWeight: 700,
          fontSize: "1.6rem",
          marginBottom: "24px",
          marginTop: "0"
        }}
      >
        PCA Utilization By Airline
      </h2>

      <ResponsiveContainer
        width="100%"
        height={Math.max(
          600,
          sortedData.length * 35
        )}
      >

        <BarChart
          data={sortedData}
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
            dataKey="airline"
            width={220}
            interval={0}
            tick={{
              fontSize: 13
            }}
          />

          <Tooltip
            formatter={(value) =>
              Number(value).toFixed(2)
            }
          />

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

export default PCAChart;