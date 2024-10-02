import axiosInstance from "../../api/axiosInstance"; 
import  IInventoryItem  from "../../models/inventoryItem"; 


export const createInventoryItem = async (item: Partial<IInventoryItem>): Promise<boolean> => {
  try {
    const { status } = await axiosInstance.post('/api/InventoryItem', item);
    if (status === 201 || status === 200) {
      
      return true;
    } else {
      console.error(`Unexpected response status: ${status}`);
      return false;
    }
  } catch (error) {
    console.error("Error occurred during inventory creation:", error);
    return false;
  }
};

export const editInventoryItem = async (item: Partial<IInventoryItem>): Promise<boolean> => {
  try {
    const { status } = await axiosInstance.put(`/api/InventoryItem/${item.id}`, item);
    if (status === 200) {
      
      return true;
    } else {
      console.error(`Unexpected response status: ${status}`);
      return false;
    }
  } catch (error) {
    console.error("Error occurred during inventory update:", error);
    return false;
  }
};