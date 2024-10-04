import { CSSProperties } from "react"

const styles:{[key: string]: CSSProperties}={
    selectDivWrapper:{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minWidth: "100px",
      },
      headerName:{ cursor: "pointer" },
      actionsWrapper:{ display: "flex", alignItems: "center", gap: "10px" },
      contentWrapper:{ padding: "10px" },
      dialogContentWrapper:{ display: "flex", flexDirection: "column" },
      dialogCloseButton:{ width: "50px", margin: "5px", alignSelf: "flex-End" },
      dialogFormWrapper:{ padding: "20px 50px" }


    
}
export default styles