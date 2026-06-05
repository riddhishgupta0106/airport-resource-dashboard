export function processData(
  rows,
  domesticPBBStands = [],
  internationalPBBStands = []
) {

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
    
    totalPBBFlights: 0,

domesticPBBFlights: 0,

internationalPBBFlights: 0,

remoteFlights: 0,
domesticPBBCodeAFlights: 0,
domesticPBBCodeCFlights: 0,

internationalPBBCodeAFlights: 0,
internationalPBBCodeCFlights: 0,

remoteCodeAFlights: 0,
remoteCodeCFlights: 0,

totalCodeAFlights: 0,

totalCodeCFlights: 0,
totalCodeEFlights: 0,

domesticPBBCodeEFlights: 0,

internationalPBBCodeEFlights: 0,

remoteCodeEFlights: 0,

codeEDomesticPBB: 0,
codeEInternationalPBB: 0,

codeEDomesticRemote: 0,
codeEInternationalRemote: 0,

codeADomesticPBB: 0,
codeAInternationalPBB: 0,

codeADomesticRemote: 0,
codeAInternationalRemote: 0,

codeCDomesticPBB: 0,
codeCInternationalPBB: 0,

codeCDomesticRemote: 0,
codeCInternationalRemote: 0,

    airlineData: {},
    standData: {},
    dateData: {},

minDate: null,
maxDate: null,
dateRange: ""

  };
  const codeAAircraft = [

    "AT7","ATR",
  
    "B20","B35","BE9",
  
    "BK2",
  
    "CCJ","CJ8",
  
    "CN5",
  
    "D20","DF3","DF7","DH4",
  
    "ER3",
  
    "F10",
  
    "G15","GJ6",
  
    "GRG","GRS",
  
    "H40",
  
    "L45",
  
    "PC2",
  
    "PL2",
  
    "PR1"
  
  ];
  rows.forEach((row) => {

    const airline =
      row["AIR LINES"];

    const stand =
      row["STAND"] ||
      row["STAND/PCA"];

      const standNumber =
  String(stand || "")
    .match(/\d+/)?.[0];



    const flightType =
  row["Domestic / International"];

const aircraftType =
  row["Type"];

const aircraftCode =
  String(
    row["Aircraft Type"] || ""
  ).trim();

  const isCodeE =
  aircraftType ===
  "WIDEBODY";

const isCodeA =
  !isCodeE &&
  codeAAircraft.includes(
    aircraftCode
  );

const isCodeC =
  !isCodeE &&
  !isCodeA;
      const isDomesticPBB =
  domesticPBBStands.includes(
    standNumber
  );

const isInternationalPBB =
  internationalPBBStands.includes(
    standNumber
  );

const isDomestic =
  flightType === "DOMESTIC";
  if (isDomesticPBB) {

    analytics.totalPBBFlights++;
    analytics.domesticPBBFlights++;
  
    if (isCodeE) {

      analytics.domesticPBBCodeEFlights++;
      analytics.totalCodeEFlights++;
      analytics.codeEDomesticPBB++;
    
    }
    
    else if (isCodeA) {
    
      analytics.domesticPBBCodeAFlights++;
      analytics.totalCodeAFlights++;
      analytics.codeADomesticPBB++;
    
    }
    
    else {
    
      analytics.domesticPBBCodeCFlights++;
      analytics.totalCodeCFlights++;
      analytics.codeCDomesticPBB++;
    
    }
  
  }
  
  else if (isInternationalPBB) {

    analytics.totalPBBFlights++;
    analytics.internationalPBBFlights++;
  
    if (isCodeE) {

      analytics.internationalPBBCodeEFlights++;
      analytics.totalCodeEFlights++;
      analytics.codeEInternationalPBB++;
    
    }
    
    else if (isCodeA) {
    
      analytics.internationalPBBCodeAFlights++;
      analytics.totalCodeAFlights++;
      analytics.codeAInternationalPBB++;
    
    }
    
    else {
    
      analytics.internationalPBBCodeCFlights++;
      analytics.totalCodeCFlights++;
      analytics.codeCInternationalPBB++;
    
    }  
  }
  
  else {

    analytics.remoteFlights++;
  
    if (isCodeE) {

      analytics.remoteCodeEFlights++;
    
      if (isDomestic)
        analytics.codeEDomesticRemote++;
      else
        analytics.codeEInternationalRemote++;
    
      analytics.totalCodeEFlights++;
    
    }

    
    else if (isCodeA) {
    
      analytics.remoteCodeAFlights++;
    
      if (isDomestic)
        analytics.codeADomesticRemote++;
      else
        analytics.codeAInternationalRemote++;
    
      analytics.totalCodeAFlights++;
    
    }
    
    else {
    
      analytics.remoteCodeCFlights++;
    
      if (isDomestic)
        analytics.codeCDomesticRemote++;
      else
        analytics.codeCInternationalRemote++;
    
      analytics.totalCodeCFlights++;
    
    }
  
  }

    const category =
      row["Category"];



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
      if (
        !analytics.minDate ||
        jsDate < analytics.minDate
      ) {
        analytics.minDate = jsDate;
      }
      
      if (
        !analytics.maxDate ||
        jsDate > analytics.maxDate
      ) {
        analytics.maxDate = jsDate;
      }

      const displayDate =
      jsDate.toLocaleDateString(
        "en-GB",
        {
          day: "2-digit",
          month: "short"
        }
      );
    
    const sortDate =
      jsDate.getTime();

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

        gpuFlights: 0,
pcaFlights: 0,
      
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
    if (gpuHours > 0) {
      analytics.airlineData[airline].gpuFlights++;
    }
    
    if (pcaHours > 0) {
      analytics.airlineData[airline].pcaFlights++;
    }
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

    if (!analytics.dateData[displayDate]) {

      analytics.dateData[displayDate] = {
        date: displayDate,
        sortDate,
      
        flights: 0,
      
        domestic: 0,
        international: 0,
      
        domesticGPUHours: 0,
        internationalGPUHours: 0,
      
        domesticPCAHours: 0,
        internationalPCAHours: 0
      };

    }

    analytics.dateData[displayDate].flights++;

    if (flightType === "DOMESTIC")
      analytics.dateData[displayDate].domestic++;

    if (flightType === "INTERNATIONAL")
      analytics.dateData[displayDate].international++;

    if (flightType === "DOMESTIC") {

      analytics.dateData[displayDate].domesticGPUHours += gpuHours;
      analytics.dateData[displayDate].domesticPCAHours += pcaHours;
    
    }
    
    if (flightType === "INTERNATIONAL") {
    
      analytics.dateData[displayDate].internationalGPUHours += gpuHours;
      analytics.dateData[displayDate].internationalPCAHours += pcaHours;
    
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
    ).sort(
      (a, b) =>
        a.sortDate - b.sortDate
    );
    analytics.aircraftResourceData =
  Object.values(
    analytics.aircraftResourceData
  );
  console.log("Total PBB",
    analytics.totalPBBFlights
  );
  
  console.log("Domestic PBB",
    analytics.domesticPBBFlights
  );
  
  console.log("International PBB",
    analytics.internationalPBBFlights
  );
  
  console.log("Remote",
    analytics.remoteFlights
  );
  if (
    analytics.minDate &&
    analytics.maxDate
  ) {
  
    const formatDate =
      (date) =>
        date.toLocaleDateString(
          "en-GB"
        );
  
    analytics.dateRange =
      `${formatDate(
        analytics.minDate
      )} to ${formatDate(
        analytics.maxDate
      )}`;
  }
  return analytics;

}