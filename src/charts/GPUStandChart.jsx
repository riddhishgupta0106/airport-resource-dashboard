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

  const sortedData = [...standData].sort((a, b) => {
    const standA = String(a.stand);
    const standB = String(b.stand);
  
    const aNum = parseInt(standA.match(/\d+/)?.[0] || 0);
    const bNum = parseInt(standB.match(/\d+/)?.[0] || 0);
  
    if (aNum !== bNum) {
      return aNum - bNum;
    }
  
    return standA.localeCompare(standB);
  });

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
        GPU Utilization By Stand
      </h2>

      <ResponsiveContainer
        width="100%"
        height={Math.max(800, sortedData.length * 35)}
      >
        <BarChart
          data={sortedData}
          layout="vertical"
          margin={{
            top: 20,
            right: 30,
            left: 80,
            bottom: 20
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            type="number"
          />

          <YAxis
            type="category"
            dataKey="stand"
            interval={0}
            width={70}
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

export default GPUStandChart;