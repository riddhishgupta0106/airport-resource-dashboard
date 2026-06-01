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
  
        <h2>
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
  
  export default ResourceChart;