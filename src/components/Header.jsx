import {
    AppBar,
    Toolbar,
    Typography
  } from "@mui/material";
  
  function Header() {
  
    return (
  
      <AppBar
        position="static"
      >
  
        <Toolbar>
  
          <Typography
          style={{
            textAlign: "center",
            color: "#111827",
            fontWeight: 700,
            fontSize: "1.6rem",
            marginBottom: "24px",
            marginTop: "0"
          }}
          >
            Airport Analytics Dashboard
          </Typography>
  
        </Toolbar>
  
      </AppBar>
  
    );
  }
  
  export default Header;