import { Container } from "@mui/material";

function DashboardLayout({ children }) {
  return (
    <Container
      maxWidth="xl"
      sx={{
        mt: 4,
        mb: 4
      }}
    >
      {children}
    </Container>
  );
}

export default DashboardLayout;