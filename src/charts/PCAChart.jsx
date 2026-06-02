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
          PCA Utilization By Airline
        </h2>
  
        <ResponsiveContainer
          width="100%"
          height={700}
        >
  
          <BarChart
            data={airlineData}
            layout="vertical"
            margin={{
              top: 20,
              right: 30,
              left: 120,
              bottom: 20
            }}
          >
  
            <CartesianGrid strokeDasharray="3 3" />
  
            <XAxis type="number" />
  
            <YAxis
              type="category"
              dataKey="airline"
              width={180}
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