import IInventoryItem from "./inventoryItem";

 interface SortConfig{
    order: "Asc" | "Desc";
    key: keyof IInventoryItem;
  }

export default SortConfig