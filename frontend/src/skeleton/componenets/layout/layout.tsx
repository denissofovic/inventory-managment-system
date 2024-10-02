import { Container } from "@mui/material";
import { ReactNode } from "react";
import Header from "./header/header";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        width: "100vw",
        height: "100vh",
        padding: 0,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header></Header>
      <div style={{ margin: "10px 30px 0 30px" }}>{children}</div>
    </Container>
  );
};

export default Layout;
