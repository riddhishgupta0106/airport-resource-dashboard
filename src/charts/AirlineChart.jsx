import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend
} from "recharts";

function AirlineChart({ airlineData }) {

  if (!airlineData)
    return null;

  const sortedData = [...airlineData].sort(
    (a, b) =>
      (b.domestic + b.international) -
      (a.domestic + a.international)
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
        Flights by Airline
      </h2>

      <div
        style={{
          width: "100%",
          overflowX: "auto"
        }}
      >

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

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              type="number"
            />

            <YAxis
              dataKey="airline"
              type="category"
              width={220}
              interval={0}
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

    </div>

  );

}

export default AirlineChart;