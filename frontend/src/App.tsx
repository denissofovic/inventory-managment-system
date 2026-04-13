import React, { useEffect } from "react";
import Skeleton from "./skeleton/skeleton";
import axiosInstance from "./api/axiosInstance"; 

function App() {
  // Add useEffect to check if the frontend can communicate with the backend
  useEffect(() => {
    const checkConnection = async () => {
      try {
        console.log("Attempting to connect to backend...");
        const response = await axiosInstance.get('http://localhost:8080'); 
        console.log("Backend response:", response);
      } catch (error) {
        console.error("Error connecting to backend:", error);
      }
    };

    checkConnection();
  }, []);

  return (
    
    <div>
      <Skeleton />
    </div>
  );
}

export default App;

