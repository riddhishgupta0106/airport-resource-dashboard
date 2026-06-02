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
        }}>
          Longhaul vs Turnaround Flights
        </h2>
  
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
            />
  
  <Tooltip
  formatter={(value) =>
    Number(value).toFixed(2)
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