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
          Flights by Airline
        </h2>
  
        <ResponsiveContainer
          width="100%"
          height={400}
        >
  
  <BarChart
  data={airlineData}
  layout="vertical"
>
<CartesianGrid strokeDasharray="3 3" />

<XAxis type="number" />

<YAxis
  dataKey="airline"
  type="category"
  width={150}
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
  
  export default AirlineChart;