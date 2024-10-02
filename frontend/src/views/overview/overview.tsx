import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import IInventoryItem from "../../models/inventoryItem";
import fetchInventoryItems from "../../utils/fetch-functions/fetchInventoryItems";
import Columns from "../../models/genericColumns";
import GenericTable from "../../components/generic-table/genericTable";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import dayjs from "dayjs";
import { Dialog } from "@mui/material";
import InventoryItemForm from "../../components/create-edit-form/inventoryItemForm";
import sortItems from "../../utils/sortItems";
import SortConfig from "../../models/sortConfig";
import { useTranslation } from "react-i18next";

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

const initialEmployeeNames = [
  "",
  "Edin",
  "Denis",
  "John Doe",
  "Jennie Doe",
  "Damir",
];

const Overview = () => {
  const {t}=useTranslation()
  const [inventoryItems, setInventoryItems] = useState<IInventoryItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<IInventoryItem[]>([]);
  const [selectedEmployeeName, setSelectedEmployeeName] = useState<string>("");
  const [selectedEquipmentType, setSelectedEquipmentType] =
    useState<string>("");
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<IInventoryItem | null>(null);

  const [sortConfig, setSortConfig] = useState<SortConfig|null|undefined>();


  const redirect = useNavigate();

  useEffect(() => {
    fetchInventoryItems((items) => {
      setInventoryItems(items);
      setFilteredItems(items);
    });
  }, [selectedItem]);

  const handleSort=(key:keyof IInventoryItem)=>{
    
    if (sortConfig&&sortConfig.key === key) {
      const updatedSortConfig:SortConfig={ order: sortConfig.order === "Asc"?"Desc":"Asc", key }
      setSortConfig(updatedSortConfig);
      setFilteredItems(sortItems(updatedSortConfig, filteredItems));
    } else {
      const updatedSortConfig:SortConfig={ order: "Asc", key: key }
      setSortConfig({ order: "Asc",  key });
      setFilteredItems(sortItems(updatedSortConfig, filteredItems));
    }
  }

  const closeModal = () => {
    setModalOpen(false);
    setSelectedItem(null);
  };
  const redirectToDeletePage = (id: string) => {
    redirect(`/delete-item/${id}`);
  };
  const filterItems = (employeeName: string, equipmentType: string) => {
    let filtered = inventoryItems;

    if (employeeName) {
      filtered = filtered.filter((item) => item.employeeName === employeeName);
    }

    if (equipmentType) {
      filtered = filtered.filter(
        (item) => item.equipmentType === equipmentType
      );
    }

    setFilteredItems(filtered);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;

    if (name === "employeeName") {
      setSelectedEmployeeName(value);
      filterItems(value, selectedEquipmentType);
    } else if (name === "equipmentType") {
      setSelectedEquipmentType(value);
      filterItems(selectedEmployeeName, value);
    }
  };

  const config: Columns<IInventoryItem>[] = [
    {
      getHeader: () => (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minWidth: "100px",
          }}
        >
          <div style={{cursor:'pointer'}} onClick={()=>{handleSort("employeeName")}}>{t("name")}</div>
          <select
            name="employeeName"
            style={{ minWidth: "70%" }}
            defaultValue={selectedEmployeeName}
            onChange={handleSelectChange}
          >
            {initialEmployeeNames.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
      ),
      getValue: (object: IInventoryItem) => {
        return <span>{object.employeeName}</span>;
      },
    },
    {
      getHeader: () => (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minWidth: "100px",
          }}
        >
          <div style={{cursor:'pointer'}} onClick={()=>{
            handleSort("equipmentType")}}>{t("type")}</div>
          <select
            name="equipmentType"
            style={{ minWidth: "70%" }}
            defaultValue={selectedEquipmentType}
            onChange={handleSelectChange}
          >
            {initialEquipmentType.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      ),
      getValue: (object: IInventoryItem) => {
        return <div>{object.equipmentType}</div>;
      },
    },
    {
      getHeader: () => {
        return (
          <div
            style={{ cursor: "pointer" }}
            onClick={()=>{handleSort("manufactor")}}
          >
            {t("manufactor")}
          </div>
        );
      },
      getValue: (object: IInventoryItem) => object.manufactor,
    },
    {
      getHeader:() => {
        return (
          <div
            style={{ cursor: "pointer" }}
            onClick={()=>{handleSort("model")}}
          >
            {t("model")}
          </div>
        );
      },
      getValue: (object: IInventoryItem) => object.model,
    },
    {
      getHeader: () => {
        return (
          <div
            style={{ cursor: "pointer" }}
            onClick={()=>{handleSort("serialNumber")}}
          >
              {t("serialNumber")}
          </div>
        );
      },
      getValue: (object: IInventoryItem) => object.serialNumber,
    },
    {
      getHeader: () => {
        return (
          <div
            style={{ cursor: "pointer" }}
            onClick={()=>{handleSort("warranty")}}
          >
            {t("warranty")}
          </div>
        );
      },
      getValue: (object: IInventoryItem) =>
        dayjs(object.warranty).format("MM/YYYY"),
    },
    {
      getHeader: () => {
        return (
          <div
            style={{ cursor: "pointer" }}
            onClick={()=>{handleSort("inventoryNumber")}}
          >
             {t("inventoryNumber")}
          </div>
        );
      },
      getValue: (object: IInventoryItem) => object.inventoryNumber,
    },
    {
      getHeader: () => "           ",
      getValue: (object: IInventoryItem) => (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <EditIcon
            sx={{ cursor: "pointer" }}
            onClick={() => {
              setSelectedItem(object);
              setModalOpen(true);
            }}
          ></EditIcon>
          <DeleteIcon
            sx={{ color: "red", cursor: "pointer" }}
            onClick={() => {
              redirectToDeletePage(object.id);
            }}
          ></DeleteIcon>
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: "10px" }}>
      <GenericTable data={filteredItems} config={config}></GenericTable>

      <Dialog open={isModalOpen} onClose={closeModal} fullWidth>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <button
            style={{ width: "50px", margin: "5px", alignSelf: "flex-End" }}
            onClick={closeModal}
          >
            {" "}
            X
          </button>
          <div style={{ padding: "20px 50px" }}>
            <InventoryItemForm
              item={selectedItem}
              onUpdateSuccess={closeModal}
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default Overview;
