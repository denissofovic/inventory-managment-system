import InventoryItemForm from "../../components/create-edit-form/inventoryItemForm";
import styles from "./manageStyles"
const Manage = () => {
  return <div style={{...styles.contentWrapper}}>
  <InventoryItemForm item={undefined}></InventoryItemForm>
  </div>;
};

export default Manage;
