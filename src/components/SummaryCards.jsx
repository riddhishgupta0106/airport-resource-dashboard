import {
  Grid,
  Card,
  CardContent,
  Typography
} from "@mui/material";

function SummaryCards({ analytics }) {

  if (!analytics) return null;

  const cards = [

    {
      title: "✈️ Total Flights",
      value: analytics.totalFlights
    },

    {
      title: "🏠 Domestic Flights",
      value: analytics.domesticFlights
    },

    {
      title: "🌍 International Flights",
      value: analytics.internationalFlights
    },

    {
      title: "🛫 Total Longhaul Flights",
      value: analytics.longhaulFlights
    },
    {
      title: "🛫 Domestic Longhaul Flights",
      value: analytics.domesticLonghaulFlights
    },
    
    {
      title: "🛫 International Longhaul Flights",
      value: analytics.internationalLonghaulFlights
    },

    {
      title: "🛬 Total Turnaround Flights",
      value: analytics.turnaroundFlights
    },
    {
      title: "🛬 Domestic Turnaround Flights",
      value: analytics.domesticTurnaroundFlights
    },
    
    {
      title: "🛬 International Turnaround Flights",
      value: analytics.internationalTurnaroundFlights
    },

    {
      title: "🛩️ Total Narrowbody Flights",
      value: analytics.narrowBodyFlights
    },
    {
      title: "🛩️ Domestic Narrowbody Flights",
      value: analytics.domesticNarrowBodyFlights
    },
    
    {
      title: "🛩️ International Narrowbody Flights",
      value: analytics.internationalNarrowBodyFlights
    },

    {
      title: "✈️ Total Widebody Flights",
      value: analytics.wideBodyFlights
    },
    {
      title: "✈️ Domestic Widebody Flights",
      value: analytics.domesticWideBodyFlights
    },
    
    {
      title: "✈️ International Widebody Flights",
      value: analytics.internationalWideBodyFlights
    },

    {
      title: "⚡ GPU Hours",
      value: analytics.totalGPUHours?.toFixed(2)
    },
    
    {
      title: "⚡ Domestic GPU Hours",
      value: analytics.domesticGPUHours?.toFixed(2)
    },
    
    {
      title: "⚡ International GPU Hours",
      value: analytics.internationalGPUHours?.toFixed(2)
    },
    
    {
      title: "❄️ PCA Hours",
      value: analytics.totalPCAHours?.toFixed(2)
    },
    
    {
      title: "❄️ Domestic PCA Hours",
      value: analytics.domesticPCAHours?.toFixed(2)
    },
    
    {
      title: "❄️ International PCA Hours",
      value: analytics.internationalPCAHours?.toFixed(2)
    },
    
    {
      title: "🔌 Total GPU Flights",
      value: analytics.gpuFlights
    },
    
    {
      title: "🌬️ Total PCA Flights",
      value: analytics.pcaFlights
    }
    ,
{
  title: "🛬 Total PBB Stand Flights",
  value: analytics.totalPBBFlights
},

{
  title: "🏠 Domestic PBB Stand Flights",
  value: analytics.domesticPBBFlights
},

{
  title: "🌍 International PBB Stand Flights",
  value: analytics.internationalPBBFlights
},

{
  title: "🚌 Remote Stand Flights",
  value: analytics.remoteFlights
}
,
{
  title: "🛩️ Total Code A Flights",
  value: analytics.totalCodeAFlights
},

{
  title: "🏠 Code A Domestic PBB",
  value: analytics.codeADomesticPBB
},

{
  title: "🌍 Code A International PBB",
  value: analytics.codeAInternationalPBB
},

{
  title: "🚌 Code A Domestic Remote",
  value: analytics.codeADomesticRemote
},

{
  title: "🚌 Code A International Remote",
  value: analytics.codeAInternationalRemote
},

{
  title: "✈️ Total Code C Flights",
  value: analytics.totalCodeCFlights
},

{
  title: "🏠 Code C Domestic PBB",
  value: analytics.codeCDomesticPBB
},

{
  title: "🌍 Code C International PBB",
  value: analytics.codeCInternationalPBB
},

{
  title: "🚌 Code C Domestic Remote",
  value: analytics.codeCDomesticRemote
},

{
  title: "🚌 Code C International Remote",
  value: analytics.codeCInternationalRemote
}
,
{
  title: "🛫 Total Code E Flights",
  value: analytics.totalCodeEFlights
},

{
  title: "🏠 Code E Domestic PBB",
  value: analytics.codeEDomesticPBB
},

{
  title: "🌍 Code E International PBB",
  value: analytics.codeEInternationalPBB
},

{
  title: "🚌 Code E Domestic Remote",
  value: analytics.codeEDomesticRemote
},

{
  title: "🚌 Code E International Remote",
  value: analytics.codeEInternationalRemote
}

  ];

  return (

    <>

<Typography
variant="h4"
  sx={{
    mb: 2,
    color: "#1976d2",
    fontWeight: 800,
    letterSpacing: "0.5px"
  }}
>
        Flight KPIs
      </Typography>

      <Grid
        container
        spacing={2}
        sx={{ mb: 4 }}
      >

        {cards
          .filter(card =>
            [
              "✈️ Total Flights",
            
              "🏠 Domestic Flights",
              "🌍 International Flights",
            
              "🛫 Total Longhaul Flights",
              "🛫 Domestic Longhaul Flights",
              "🛫 International Longhaul Flights",
            
              "🛬 Total Turnaround Flights",
              "🛬 Domestic Turnaround Flights",
              "🛬 International Turnaround Flights"
            ].includes(card.title)
          )
          .map((card) => (

            <Grid
  size={{
    xs: 12,
    sm: 6,
    md: 4,
    lg: 3
  }}
>

<Card
  sx={{
    backgroundColor: "#e3f2fd",
    borderLeft: "6px solid #1976d2",
    borderRadius: 4,
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
    transition: "all 0.3s ease",

    "&:hover": {
      transform: "translateY(-6px)",
      boxShadow: "0 12px 28px rgba(0,0,0,0.15)"
    }
  }}
>

                <CardContent>
                <Typography
  variant="subtitle1"
  sx={{
    fontWeight: 600,
    color: "#475569"
  }}
>
                    {card.title}
                  </Typography>

                  <Typography variant="h4">
                    {card.value}
                  </Typography>

                </CardContent>

              </Card>

            </Grid>

          ))}

      </Grid>
      <Typography
  variant="h4"
  sx={{
    mb: 2,
    color: "#7c3aed",
    fontWeight: 800,
    letterSpacing: "0.5px"
  }}
>
  Stand KPIs
</Typography>

<Grid
  container
  spacing={2}
  sx={{ mb: 4 }}
>

  {cards
    .filter(card =>
      [
        "🛬 Total PBB Stand Flights",
        "🏠 Domestic PBB Stand Flights",
        "🌍 International PBB Stand Flights",
        "🚌 Remote Stand Flights",
      
        "🛩️ Total Code A Flights",
        "🏠 Code A Domestic PBB",
        "🌍 Code A International PBB",
        "🚌 Code A Domestic Remote",
        "🚌 Code A International Remote",
      
        "✈️ Total Code C Flights",
        "🏠 Code C Domestic PBB",
        "🌍 Code C International PBB",
        "🚌 Code C Domestic Remote",
        "🚌 Code C International Remote",
      "🛫 Total Code E Flights",
      "🏠 Code E Domestic PBB",
"🌍 Code E International PBB",
"🚌 Code E Domestic Remote",
"🚌 Code E International Remote"].includes(card.title)
    )
    .map((card) => (

      <Grid
        item
        xs={12}
        sm={6}
        md={4}
        lg={3}
        key={card.title}
      >

        <Card
          sx={{
            backgroundColor: "#f3e8ff",
            borderLeft: "6px solid #7c3aed",
            borderRadius: 4,
            boxShadow:
              "0 8px 20px rgba(0,0,0,0.08)",

            transition:
              "all 0.3s ease",

            "&:hover": {
              transform:
                "translateY(-6px)",

              boxShadow:
                "0 12px 28px rgba(0,0,0,0.15)"
            }
          }}
        >

          <CardContent>

            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 600,
                color: "#475569"
              }}
            >
              {card.title}
            </Typography>

            <Typography variant="h4">
              {card.value}
            </Typography>

          </CardContent>

        </Card>

      </Grid>

    ))}

</Grid> 

      <Typography
variant="h4"
  sx={{
    mb: 2,
    color: "#2e7d32",
    fontWeight: 800,
    letterSpacing: "0.5px"
  }}
>
        Aircraft KPIs
      </Typography>

      <Grid
        container
        spacing={2}
        sx={{ mb: 4 }}
      >

        {cards
          .filter(card =>
            [
              "🛩️ Total Narrowbody Flights",
              "🛩️ Domestic Narrowbody Flights",
              "🛩️ International Narrowbody Flights",
            
              "✈️ Total Widebody Flights",
              "✈️ Domestic Widebody Flights",
              "✈️ International Widebody Flights"
            ].includes(card.title)
          )
          .map((card) => (

            <Grid
  size={{
    xs: 12,
    sm: 6,
    md: 4,
    lg: 3
  }}
>

<Card
  sx={{
    backgroundColor: "#e8f5e9",
    borderLeft: "6px solid #2e7d32",
    borderRadius: 4,
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
    transition: "all 0.3s ease",

    "&:hover": {
      transform: "translateY(-6px)",
      boxShadow: "0 12px 28px rgba(0,0,0,0.15)"
    }
  }}
>

                <CardContent>
                <Typography
  variant="subtitle1"
  sx={{
    fontWeight: 600,
    color: "#475569"
  }}
>
                    {card.title}
                  </Typography>

                  <Typography variant="h4">
                    {card.value}
                  </Typography>

                </CardContent>

              </Card>

            </Grid>

          ))}

      </Grid>

      <Typography
variant="h4"
  sx={{
    mb: 2,
    color: "#ed6c02",
    fontWeight: 800,
    letterSpacing: "0.5px"
    
  }}
>
        Resource KPIs
      </Typography>

      <Grid
        container
        spacing={2}
        sx={{ mb: 4 }}
      >

        {cards
          .filter(card =>
            [
              "⚡ GPU Hours",
              "⚡ Domestic GPU Hours",
              "⚡ International GPU Hours",
          
              "❄️ PCA Hours",
              "❄️ Domestic PCA Hours",
              "❄️ International PCA Hours",
          
              "🔌 Total GPU Flights",
          
              "🌬️ Total PCA Flights"
            ].includes(card.title)
          )
          .map((card) => (

            <Grid
  size={{
    xs: 12,
    sm: 6,
    md: 4,
    lg: 3
  }}
>

<Card
  sx={{
    backgroundColor: "#fff3e0",
    borderLeft: "6px solid #ed6c02",
    borderRadius: 4,
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
    transition: "all 0.3s ease",

    "&:hover": {
      transform: "translateY(-6px)",
      boxShadow: "0 12px 28px rgba(0,0,0,0.15)"
    }
  }}
>

                <CardContent>

                <Typography
  variant="subtitle1"
  sx={{
    fontWeight: 600,
    color: "#475569"
  }}
>
                    {card.title}
                  </Typography>

                  <Typography variant="h4">
                    {card.value}
                  </Typography>

                </CardContent>

              </Card>

            </Grid>

          ))}

      </Grid>

    </>

  );

}

export default SummaryCards;