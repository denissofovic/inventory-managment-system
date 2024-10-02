import { useState } from "react";
import IInventoryItem from "../../models/inventoryItem";
import { createInventoryItem, editInventoryItem } from '../../utils/fetch-functions/createEditInventory';
import {
  Box,
  
  
} from "@mui/material";

import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

const initialEmployeeNames = [
  "",
  "Edin",
  "Denis",
  "John Doe",
  "Jennie Doe",
  "Damir",
];
const initialEquipmentType = [
  "",
  "Laptop",
  "Docking station",
  "Monitor",
  "Keyboard",
  "Mouse",
  "Headset",
  "Memory",
  "Others",
];
interface FormProps {
  item: IInventoryItem|null|undefined;
  onUpdateSuccess?: () => void
}

const InventoryItemForm = (props: FormProps) => {
const {t}=useTranslation()
 
  const [item, setItem] = useState<Partial<IInventoryItem>>(
    props.item
      ? props.item
      : {
          id:'0',
          employeeName: "",
          equipmentType: "",
          manufactor: "",
          model: "",
          serialNumber: "",
          warranty:"",
          inventoryNumber: "",
        }
  );



  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setItem({
      ...item,
      [event.target.name]: event.target.value,
    });
  };

  const handleSave = async () => {
    const errors = {
      equipmentType: item.equipmentType === "",
      manufactor: item.manufactor === "",
      model: item.model === "",
      serialNumber: item.serialNumber === "",
      warranty: item.warranty === "",
    };

    const hasErrors = Object.values(errors).some((error) => error);

    if (!hasErrors) {
      const success = props.item
        ? await editInventoryItem(item)
        : await createInventoryItem(item);

      if (success&&props.onUpdateSuccess) {
        props.onUpdateSuccess()
      } else {
         setItem({
          id: '0',
          employeeName: "",
          equipmentType: "",
          manufactor: "",
          model: "",
          serialNumber: "",
          warranty: "",
          inventoryNumber: "",
        });
      }
    } else {
      alert("Required fields can't be empty")
    
    }
  };

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: 2,
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <Box
        sx={{
          gridColumn: "1 / -1",
          width: "49%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <label htmlFor="employeeName">{t("employeeName")}:</label>
        <select
          name="employeeName"
          id="employeeName"
          value={item.employeeName}
          onChange={(e) => setItem({ ...item, employeeName: e.target.value })}
          style={{ height: "50px" }}
        >
          {initialEmployeeNames.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </Box>

      <Box>
        <label htmlFor="equipmentType">{t("equipmentType")}:*</label>
        <select
          name="equipmentType"
          id="equipmentType"
          style={{ width: "100%", height: "50px" }}
          value={item.equipmentType}
          onChange={handleChange}
        >
          {initialEquipmentType.map((type,key)=><option value={type} key={type+key}>{type}</option>)}
        </select>
      </Box>

      <Box>
        <label htmlFor="manufactor">{t("manufactor")}:*</label>
        <input
          name="manufactor"
          id="manufactor"
          style={{ width: "100%", height: "45px" }}
          value={item.manufactor}
          onChange={handleChange}
        />
      </Box>

      <Box>
        <label htmlFor="model">{t("model")}:*</label>
        <input
          name="model"
          id="model"
          style={{ width: "100%", height: "45px" }}
          value={item.model}
          onChange={handleChange}
        />
      </Box>

      <Box>
        <label htmlFor="serialNumber">{t("serialNumber")}:*</label>
        <input
          name="serialNumber"
          id="serialNumber"
          style={{ width: "100%", height: "45px" }}
          value={item.serialNumber}
          onChange={handleChange}
        />
      </Box>

      <Box>
        <label htmlFor="warranty">{t("warranty")}:*</label>
        <input
          type="date"
          name="warranty"
          id="warranty"
          style={{ width: "100%", height: "45px" }}
          value={dayjs(item.warranty).format('YYYY-MM-DD')}
          onChange={handleChange}
        />
      </Box>

      <Box>
        <label htmlFor="inventoryNumber">{t("inventoryNumber")}:</label>
        <input
          name="inventoryNumber"
          id="inventoryNumber"
          style={{ width: "100%", height: "45px" }}
          value={item.inventoryNumber}
          onChange={handleChange}
        />
      </Box>

      <Box sx={{ gridColumn: "1 / -1", textAlign: "center", display: "flex" }}>
        <button
          style={{ justifySelf: "flex-start",width:'10em' }}
          
          color="primary"
          onClick={handleSave}
        >
        {t("save")}
        </button>
      </Box>
    </Box>
  );
};

export default InventoryItemForm;
