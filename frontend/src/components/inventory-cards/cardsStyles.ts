import { CSSProperties } from "react";

const styles: { [key: string]: CSSProperties } = {
  contentWrapper: { textAlign: "center" },
  filterSection: { margin: "10px 0" },
  filterSelect: { marginLeft: "10px" },
  cardContainer: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: "20px",
  },
  card: {
    margin: "20px",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    width: "200px",
    textAlign: "left",
  },
  cardContent: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "5px",
  },
};

export default styles;
