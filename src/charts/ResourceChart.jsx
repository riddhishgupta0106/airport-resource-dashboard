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
  
  function ResourceChart({ airlineData }) {
  
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
        GPU Utilization By Airline
        </h2>
  
        <ResponsiveContainer
          width="100%"
          height={500}
        >
  
  <BarChart
  data={airlineData}
  layout="vertical"
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
  width={150}
/>
  
            
  
<Tooltip
  formatter={(value) =>
    Number(value).toFixed(2)
  }
/>
  
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
  
  export default ResourceChart;