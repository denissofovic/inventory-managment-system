import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import IInventoryItem from "../../models/inventoryItem";
import fetchInventoryItems from "../../utils/fetch-functions/fetchInventoryItems";
import Columns from "../../models/genericColumns";
import GenericTable from "../../components/generic-table/genericTable";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import dayjs from "dayjs";
import { Dialog, useMediaQuery } from "@mui/material";
import InventoryItemForm from "../../components/create-edit-form/inventoryItemForm";
import sortItems from "../../utils/sortItems";
import SortConfig from "../../models/sortConfig";
import { useTranslation } from "react-i18next";
import styles from "./overviewStyles";
import {
  initialEmployeeNames,
  initialEquipmentType,
} from "../../providers/data";
import Cards from "../../components/inventory-cards/cards";

const Overview = () => {
  const { t } = useTranslation();
  const [inventoryItems, setInventoryItems] = useState<IInventoryItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<IInventoryItem[]>([]);
  const [selectedEmployeeName, setSelectedEmployeeName] = useState<string>("");
  const [selectedEquipmentType, setSelectedEquipmentType] =
    useState<string>("");
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<IInventoryItem | null>(null);
  const [sortConfig, setSortConfig] = useState<SortConfig | null | undefined>();
  const redirect = useNavigate();
  const isMatch = useMediaQuery("(min-width:650px)");

  useEffect(() => {
    fetchInventoryItems((items) => {
      setInventoryItems(items);
      setFilteredItems(items);
    });
  }, [selectedItem]);

  const handleSort = (key: keyof IInventoryItem) => {
    if (sortConfig && sortConfig.key === key) {
      const updatedSortConfig: SortConfig = {
        order: sortConfig.order === "Asc" ? "Desc" : "Asc",
        key,
      };
      setSortConfig(updatedSortConfig);
      setFilteredItems(sortItems(updatedSortConfig, filteredItems));
    } else {
      const updatedSortConfig: SortConfig = { order: "Asc", key: key };
      setSortConfig({ order: "Asc", key });
      setFilteredItems(sortItems(updatedSortConfig, filteredItems));
    }
  };

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
        <div style={{ ...styles.selectDivWrapper }}>
          <span
            style={{ ...styles.headerName }}
            onClick={() => {
              handleSort("employeeName");
            }}
          >
            {t("name")}
          </span>
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
      getName: () => t("name"),
      filter: {
        callback: handleSelectChange,
        values: initialEmployeeNames,
        selectName: "employeeName",
      },
      sort: () => handleSort("employeeName"),
    },
    {
      getHeader: () => (
        <div style={{ ...styles.selectDivWrapper }}>
          <span
            style={{ ...styles.headerName }}
            onClick={() => {
              handleSort("equipmentType");
            }}
          >
            {t("type")}
          </span>
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
        return <span>{object.equipmentType}</span>;
      },
      getName: () => t("type"),

      filter: {
        callback: handleSelectChange,
        values: initialEquipmentType,
        selectName: "equipmentType",
      },
      sort: () => handleSort("equipmentType"),
    },
    {
      getHeader: () => {
        return (
          <span
            style={{ ...styles.headerName }}
            onClick={() => {
              handleSort("manufactor");
            }}
          >
            {t("manufactor")}
          </span>
        );
      },
      getValue: (object: IInventoryItem) => object.manufactor,
      getName: () => t("manufactor"),
      sort: () => handleSort("manufactor"),
    },
    {
      getHeader: () => {
        return (
          <span
            style={{ ...styles.headerName }}
            onClick={() => {
              handleSort("model");
            }}
          >
            {t("model")}
          </span>
        );
      },
      getValue: (object: IInventoryItem) => object.model,
      getName: () => t("model"),
      sort: () => handleSort("model"),
    },
    {
      getHeader: () => {
        return (
          <div
            style={{ ...styles.headerName }}
            onClick={() => {
              handleSort("serialNumber");
            }}
          >
            {t("serialNumber")}
          </div>
        );
      },
      getValue: (object: IInventoryItem) => object.serialNumber,
      getName: () => t("serialNumber"),
      sort: () => handleSort("serialNumber"),
    },
    {
      getHeader: () => {
        return (
          <div
            style={{ ...styles.headerName }}
            onClick={() => {
              handleSort("warranty");
            }}
          >
            {t("warranty")}
          </div>
        );
      },
      getValue: (object: IInventoryItem) =>
        dayjs(object.warranty).format("MM/YYYY"),
      getName: () => t("warranty"),
      sort: () => handleSort("warranty"),
    },
    {
      getHeader: () => {
        return (
          <div
            style={{ ...styles.headerName }}
            onClick={() => {
              handleSort("inventoryNumber");
            }}
          >
            {t("inventoryNumber")}
          </div>
        );
      },
      getValue: (object: IInventoryItem) => object.inventoryNumber,
      getName: () => t("inventoryNumber"),
      sort: () => handleSort("inventoryNumber"),
    },
    {
      getHeader: () => "           ",
      getValue: (object: IInventoryItem) => (
        <div style={{ ...styles.actionsWrapper }}>
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
      getName: () => t("actions"),
    },
  ];

  return (
    <div style={{ ...styles.contentWrapper }}>
      {isMatch ? (
        <GenericTable data={filteredItems} config={config}></GenericTable>
      ) : (
        <Cards data={filteredItems} config={config}></Cards>
      )}

      <Dialog open={isModalOpen} onClose={closeModal} fullWidth>
        <div style={{ ...styles.dialogContentWrapper }}>
          <button style={{ ...styles.dialogCloseButton }} onClick={closeModal}>
            {" "}
            X
          </button>
          <div style={{ ...styles.dialogFormWrapper }}>
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
