import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Box
} from "@mui/material";

function FilterPanel({
  airlines,
  selectedAirline,
  setSelectedAirline
}) {

  return (

    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mb: 4
      }}
    >

      <FormControl
        sx={{
          width: 300
        }}
      >

        <InputLabel>
          Airline
        </InputLabel>

        <Select
          value={selectedAirline}
          label="Airline"
          onChange={(e) =>
            setSelectedAirline(
              e.target.value
            )
          }
        >

          <MenuItem value="ALL">
            All Airlines
          </MenuItem>

          {airlines.map(
            (airline) => (

              <MenuItem
                key={airline}
                value={airline}
              >
                {airline}
              </MenuItem>

            )
          )}

        </Select>

      </FormControl>

    </Box>

  );

}

export default FilterPanel;