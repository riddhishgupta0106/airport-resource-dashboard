export function processData(rows) {

  const analytics = {
    aircraftResourceData: {
      NARROWBODY: {
        type: "NARROWBODY",
    
        domesticGPUHours: 0,
        internationalGPUHours: 0,
    
        domesticPCAHours: 0,
        internationalPCAHours: 0,
    
        flights: 0
      },
    
      WIDEBODY: {
        type: "WIDEBODY",
    
        domesticGPUHours: 0,
        internationalGPUHours: 0,
    
        domesticPCAHours: 0,
        internationalPCAHours: 0,
    
        flights: 0
      }
    },
    totalFlights: rows.length,

    domesticFlights: 0,
    internationalFlights: 0,

    longhaulFlights: 0,
    turnaroundFlights: 0,

    narrowBodyFlights: 0,
    wideBodyFlights: 0,
    domesticLonghaulFlights: 0,
internationalLonghaulFlights: 0,

domesticTurnaroundFlights: 0,
internationalTurnaroundFlights: 0,

domesticWideBodyFlights: 0,
internationalWideBodyFlights: 0,

domesticNarrowBodyFlights: 0,
internationalNarrowBodyFlights: 0,

    totalGPUHours: 0,
    domesticGPUHours: 0,
    internationalGPUHours: 0,

    totalPCAHours: 0,
    domesticPCAHours: 0,
    internationalPCAHours: 0,

    gpuFlights: 0,
    pcaFlights: 0,

    airlineData: {},
    standData: {},
    dateData: {}

  };

  rows.forEach((row) => {

    const airline =
      row["AIR LINES"];

    const stand =
      row["STAND "] ||
      row["STAND/PCA"];

    const flightType =
      row["Domestic / International"];

    const category =
      row["Category"];

    const aircraftType =
      row["Type"];

    const gpuHours =
      (
        Number(
          row["GPU Duration"]
        ) || 0
      ) * 24;

    const pcaHours =
      (
        Number(
          row["PCA Duration"]
        ) || 0
      ) * 24;

    const excelDate =
      row["DATE"];

    const jsDate =
      new Date(
        (excelDate - 25569) *
        86400 *
        1000
      );

    const date =
      jsDate.toLocaleDateString(
        "en-GB",
        {
          day: "2-digit",
          month: "short"
        }
      );

    // =========================
    // Overall Flight Metrics
    // =========================

    if (flightType === "DOMESTIC")
      analytics.domesticFlights++;

    if (flightType === "INTERNATIONAL")
      analytics.internationalFlights++;

    if (category === "LONGHALT") {

      analytics.longhaulFlights++;
    
      if (flightType === "DOMESTIC")
        analytics.domesticLonghaulFlights++;
    
      if (flightType === "INTERNATIONAL")
        analytics.internationalLonghaulFlights++;
    
    }

    if (category === "TURNAROUND") {

      analytics.turnaroundFlights++;
    
      if (flightType === "DOMESTIC")
        analytics.domesticTurnaroundFlights++;
    
      if (flightType === "INTERNATIONAL")
        analytics.internationalTurnaroundFlights++;
    
    }

    if (aircraftType === "NARROWBODY") {

      analytics.narrowBodyFlights++;
    
      if (flightType === "DOMESTIC")
        analytics.domesticNarrowBodyFlights++;
    
      if (flightType === "INTERNATIONAL")
        analytics.internationalNarrowBodyFlights++;
    
    }
    
    if (aircraftType === "WIDEBODY") {
    
      analytics.wideBodyFlights++;
    
      if (flightType === "DOMESTIC")
        analytics.domesticWideBodyFlights++;
    
      if (flightType === "INTERNATIONAL")
        analytics.internationalWideBodyFlights++;
    
    }
    
    // =========================
    // Aircraft Resource Analysis
    // =========================
    
    if (
      aircraftType === "NARROWBODY" ||
      aircraftType === "WIDEBODY"
    ) {
    
      analytics
        .aircraftResourceData[
          aircraftType
        ]
        .flights++;
    
      if (flightType === "DOMESTIC") {
    
        analytics
          .aircraftResourceData[
            aircraftType
          ]
          .domesticGPUHours += gpuHours;
    
        analytics
          .aircraftResourceData[
            aircraftType
          ]
          .domesticPCAHours += pcaHours;
    
      }
    
      if (flightType === "INTERNATIONAL") {
    
        analytics
          .aircraftResourceData[
            aircraftType
          ]
          .internationalGPUHours += gpuHours;
    
        analytics
          .aircraftResourceData[
            aircraftType
          ]
          .internationalPCAHours += pcaHours;
    
      }
    
    }

    // =========================
    // GPU / PCA Totals
    // =========================

    analytics.totalGPUHours += gpuHours;
    analytics.totalPCAHours += pcaHours;

    if (gpuHours > 0)
      analytics.gpuFlights++;

    if (pcaHours > 0)
      analytics.pcaFlights++;

    if (flightType === "DOMESTIC") {

      analytics.domesticGPUHours += gpuHours;
      analytics.domesticPCAHours += pcaHours;

    }

    if (flightType === "INTERNATIONAL") {

      analytics.internationalGPUHours += gpuHours;
      analytics.internationalPCAHours += pcaHours;

    }

    // =========================
    // Airline Analysis
    // =========================

    if (!analytics.airlineData[airline]) {

      analytics.airlineData[airline] = {
        airline,
        flights: 0,
        domestic: 0,
        international: 0,
        longhaul: 0,
        turnaround: 0,
      
        gpuHours: 0,
        pcaHours: 0,
      
        domesticGPUHours: 0,
        internationalGPUHours: 0,
      
        domesticPCAHours: 0,
        internationalPCAHours: 0
      };

    }

    analytics.airlineData[airline].flights++;

    if (flightType === "DOMESTIC")
      analytics.airlineData[airline].domestic++;

    if (flightType === "INTERNATIONAL")
      analytics.airlineData[airline].international++;

    if (category === "LONGHALT")
      analytics.airlineData[airline].longhaul++;

    if (category === "TURNAROUND")
      analytics.airlineData[airline].turnaround++;

    analytics.airlineData[airline].gpuHours += gpuHours;
    analytics.airlineData[airline].pcaHours += pcaHours;
    if (flightType === "DOMESTIC") {

      analytics.airlineData[airline].domesticGPUHours += gpuHours;
      analytics.airlineData[airline].domesticPCAHours += pcaHours;
    
    }
    
    if (flightType === "INTERNATIONAL") {
    
      analytics.airlineData[airline].internationalGPUHours += gpuHours;
      analytics.airlineData[airline].internationalPCAHours += pcaHours;
    
    }

    // =========================
    // Date Analysis
    // =========================

    if (!analytics.dateData[date]) {

      analytics.dateData[date] = {
        date,
      
        flights: 0,
      
        domestic: 0,
        international: 0,
      
        domesticGPUHours: 0,
        internationalGPUHours: 0,
      
        domesticPCAHours: 0,
        internationalPCAHours: 0
      };

    }

    analytics.dateData[date].flights++;

    if (flightType === "DOMESTIC")
      analytics.dateData[date].domestic++;

    if (flightType === "INTERNATIONAL")
      analytics.dateData[date].international++;

    if (flightType === "DOMESTIC") {

      analytics.dateData[date].domesticGPUHours += gpuHours;
      analytics.dateData[date].domesticPCAHours += pcaHours;
    
    }
    
    if (flightType === "INTERNATIONAL") {
    
      analytics.dateData[date].internationalGPUHours += gpuHours;
      analytics.dateData[date].internationalPCAHours += pcaHours;
    
    }

   // =========================
// Stand Analysis
// =========================

if (stand) {

  if (!analytics.standData[stand]) {

    analytics.standData[stand] = {

      stand,

      flights: 0,

      domestic: 0,
      international: 0,

      longhaul: 0,
      turnaround: 0,

      gpuHours: 0,
      pcaHours: 0,

      domesticGPUHours: 0,
      internationalGPUHours: 0,

      domesticPCAHours: 0,
      internationalPCAHours: 0

    };

  }

  analytics.standData[stand].flights++;

  if (flightType === "DOMESTIC")
    analytics.standData[stand].domestic++;

  if (flightType === "INTERNATIONAL")
    analytics.standData[stand].international++;

  if (category === "LONGHALT")
    analytics.standData[stand].longhaul++;

  if (category === "TURNAROUND")
    analytics.standData[stand].turnaround++;

  analytics.standData[stand].gpuHours += gpuHours;
  analytics.standData[stand].pcaHours += pcaHours;

  if (flightType === "DOMESTIC") {

    analytics.standData[stand].domesticGPUHours += gpuHours;
    analytics.standData[stand].domesticPCAHours += pcaHours;

  }

  if (flightType === "INTERNATIONAL") {

    analytics.standData[stand].internationalGPUHours += gpuHours;
    analytics.standData[stand].internationalPCAHours += pcaHours;

  }

}

  });

  analytics.airlineData =
    Object.values(
      analytics.airlineData
    ).sort(
      (a, b) =>
        b.flights - a.flights
    );

  analytics.standData =
    Object.values(
      analytics.standData
    ).sort(
      (a, b) =>
        b.flights - a.flights
    );

  analytics.dateData =
    Object.values(
      analytics.dateData
    );
    analytics.aircraftResourceData =
  Object.values(
    analytics.aircraftResourceData
  );
  return analytics;

}