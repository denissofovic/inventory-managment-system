import axiosInstance from "../../api/axiosInstance";
import IInventoryItem from "../../models/inventoryItem";

const fetchInventoryItems = async (
  setterFunction: React.Dispatch<React.SetStateAction<IInventoryItem[]>>
) => {
  try {
    const response = await axiosInstance.get("/api/InventoryItem", {
      headers: { Authorization: localStorage.getItem("token") },
    });
    
    const data: IInventoryItem[] = response.data;
      
    setterFunction(data);
  } catch (error) {
    console.error("Error fetching inventory items", error);
  }
};

export default fetchInventoryItems;
