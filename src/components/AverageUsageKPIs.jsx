import { Paper } from "@mui/material";

function AverageUsageKPIs({ rows }) {

  if (!rows?.length)
    return null;

  const avgUsage = (
    filterFn,
    durationColumn
  ) => {

    const filtered =
      rows.filter(filterFn);

    if (!filtered.length)
      return 0;

    const total =
      filtered.reduce(
        (sum, row) =>
          sum +
          (
            Number(
              row[durationColumn]
            ) || 0
          ) * 24,
        0
      );

    return total / filtered.length;
  };

  const kpis = [

    // Narrowbody GPU

    [
      "Avg GPU Narrowbody",
      avgUsage(
        r => r["Type"] === "NARROWBODY",
        "GPU Duration"
      )
    ],

    [
      "Avg GPU Domestic Narrowbody",
      avgUsage(
        r =>
          r["Type"] === "NARROWBODY" &&
          r["Domestic / International"] === "DOMESTIC",
        "GPU Duration"
      )
    ],

    [
      "Avg GPU International Narrowbody",
      avgUsage(
        r =>
          r["Type"] === "NARROWBODY" &&
          r["Domestic / International"] === "INTERNATIONAL",
        "GPU Duration"
      )
    ],

    // Narrowbody PCA

    [
      "Avg PCA Narrowbody",
      avgUsage(
        r => r["Type"] === "NARROWBODY",
        "PCA Duration"
      )
    ],

    [
      "Avg PCA Domestic Narrowbody",
      avgUsage(
        r =>
          r["Type"] === "NARROWBODY" &&
          r["Domestic / International"] === "DOMESTIC",
        "PCA Duration"
      )
    ],

    [
      "Avg PCA International Narrowbody",
      avgUsage(
        r =>
          r["Type"] === "NARROWBODY" &&
          r["Domestic / International"] === "INTERNATIONAL",
        "PCA Duration"
      )
    ],

    // Widebody GPU

    [
      "Avg GPU Widebody",
      avgUsage(
        r => r["Type"] === "WIDEBODY",
        "GPU Duration"
      )
    ],

    [
      "Avg GPU Domestic Widebody",
      avgUsage(
        r =>
          r["Type"] === "WIDEBODY" &&
          r["Domestic / International"] === "DOMESTIC",
        "GPU Duration"
      )
    ],

    [
      "Avg GPU International Widebody",
      avgUsage(
        r =>
          r["Type"] === "WIDEBODY" &&
          r["Domestic / International"] === "INTERNATIONAL",
        "GPU Duration"
      )
    ],

    // Widebody PCA

    [
      "Avg PCA Widebody",
      avgUsage(
        r => r["Type"] === "WIDEBODY",
        "PCA Duration"
      )
    ],

    [
      "Avg PCA Domestic Widebody",
      avgUsage(
        r =>
          r["Type"] === "WIDEBODY" &&
          r["Domestic / International"] === "DOMESTIC",
        "PCA Duration"
      )
    ],

    [
      "Avg PCA International Widebody",
      avgUsage(
        r =>
          r["Type"] === "WIDEBODY" &&
          r["Domestic / International"] === "INTERNATIONAL",
        "PCA Duration"
      )
    ],

    // Longhaul GPU

    [
      "Avg GPU Longhaul",
      avgUsage(
        r => r["Category"] === "LONGHALT",
        "GPU Duration"
      )
    ],

    [
      "Avg GPU Domestic Longhaul",
      avgUsage(
        r =>
          r["Category"] === "LONGHALT" &&
          r["Domestic / International"] === "DOMESTIC",
        "GPU Duration"
      )
    ],

    [
      "Avg GPU International Longhaul",
      avgUsage(
        r =>
          r["Category"] === "LONGHALT" &&
          r["Domestic / International"] === "INTERNATIONAL",
        "GPU Duration"
      )
    ],

    // Longhaul PCA

    [
      "Avg PCA Longhaul",
      avgUsage(
        r => r["Category"] === "LONGHALT",
        "PCA Duration"
      )
    ],

    [
      "Avg PCA Domestic Longhaul",
      avgUsage(
        r =>
          r["Category"] === "LONGHALT" &&
          r["Domestic / International"] === "DOMESTIC",
        "PCA Duration"
      )
    ],

    [
      "Avg PCA International Longhaul",
      avgUsage(
        r =>
          r["Category"] === "LONGHALT" &&
          r["Domestic / International"] === "INTERNATIONAL",
        "PCA Duration"
      )
    ],

    // Turnaround GPU

    [
      "Avg GPU Turnaround",
      avgUsage(
        r => r["Category"] === "TURNAROUND",
        "GPU Duration"
      )
    ],

    [
      "Avg GPU Domestic Turnaround",
      avgUsage(
        r =>
          r["Category"] === "TURNAROUND" &&
          r["Domestic / International"] === "DOMESTIC",
        "GPU Duration"
      )
    ],

    [
      "Avg GPU International Turnaround",
      avgUsage(
        r =>
          r["Category"] === "TURNAROUND" &&
          r["Domestic / International"] === "INTERNATIONAL",
        "GPU Duration"
      )
    ],

    // Turnaround PCA

    [
      "Avg PCA Turnaround",
      avgUsage(
        r => r["Category"] === "TURNAROUND",
        "PCA Duration"
      )
    ],

    [
      "Avg PCA Domestic Turnaround",
      avgUsage(
        r =>
          r["Category"] === "TURNAROUND" &&
          r["Domestic / International"] === "DOMESTIC",
        "PCA Duration"
      )
    ],

    [
      "Avg PCA International Turnaround",
      avgUsage(
        r =>
          r["Category"] === "TURNAROUND" &&
          r["Domestic / International"] === "INTERNATIONAL",
        "PCA Duration"
      )
    ]
  ];

  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        mb: 5,
        borderRadius: 4
      }}
    >
      <h2
        style={{
          textAlign: "center",
          color: "#111827",
          fontWeight: 700,
          marginBottom: "30px"
        }}
      >
        Aircraft Resource Usage KPIs
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(3, 1fr)",
          gap: "20px"
        }}
      >
        {kpis.map(
          ([title, value]) => (
            <Paper
              key={title}
              elevation={2}
              sx={{
                p: 2,
                textAlign: "center",
                borderRadius: 3
              }}
            >
              <div
                style={{
                  fontWeight: 600,
                  marginBottom: "8px"
                }}
              >
                {title}
              </div>

              <div
                style={{
                  fontSize: "1.5rem",
                  color: "#1976d2",
                  fontWeight: 700
                }}
              >
                {value.toFixed(2)} hrs
              </div>
            </Paper>
          )
        )}
      </div>
    </Paper>
  );
}

export default AverageUsageKPIs;