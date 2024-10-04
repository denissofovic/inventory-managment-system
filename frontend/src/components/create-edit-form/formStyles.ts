const styles={
    formWrapper:{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: 2,
        maxWidth: "600px",
        margin: "0 auto",
        
      },
    firstItem:{
        gridColumn: "1 / -1",
        width: "49%",
        display: "flex",
        flexDirection: "column",
      },
    inputField:{ width: "100%", height: "45px" },
    selectField:{ width: "100%", height: "50px" }
}

export default styles