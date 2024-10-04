import { Container } from "@mui/material";
import { ReactNode } from "react";
import Header from "./header/header";
import styles from "./layoutStyles";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{...styles.container}}
    >
      <Header></Header>
      <div style={{...styles.content}}>{children}</div>
    </Container>
  );
};

export default Layout;
