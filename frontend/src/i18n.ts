import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next) 
  .init({
    resources: {
      en: {
        translation: {
          "overview": "Overview",
          "manage": "Manage",
          "languages": "Languages",
          "name": "Name",
          "type": "Type",
          "manufactor": "Manufactor",
          "model": "Model",
          "serialNumber": "Serial Number",
          "warranty": "Warranty",
          "inventoryNumber": "Inventory Number",
          "notFound": "Not Found",
          "deleteItem": "Delete Inventory Item",
          "deleteQuestion": "Are You sure You want to delete this item?",
          "deleteYes": "Yes Delete It",
          "deleteBack": "Back",
          "save": "Save",
          "requiredFieldsMessage": "Required fields can't be empty",
          "employeeName": "Employee Name",
          "equipmentType": "Equipment Type",
          "itemCreated":"Inventory item created successfully",
          "itemUpdated":"Inventory item updated successfully",
          "itemDeleteError":"Item not found. It might be already deleted",
          "actions":"Actions",
          "filter":"Filters"
        },
      },
      de: {
        translation: {
          "overview": "Übersicht",
          "manage": "Verwalten",
          "languages": "Sprachen",
          "name": "Name",
          "type": "Typ",
          "manufactor": "Hersteller",
          "model": "Modell",
          "serialNumber": "Seriennummer",
          "warranty": "Garantie",
          "inventoryNumber": "Inventarnummer",
          "notFound": "Nicht Gefunden",
          "deleteItem": "Inventarartikel löschen",
          "deleteQuestion": "Sind Sie sicher, dass Sie diesen Artikel löschen möchten?",
          "deleteYes": "Ja, löschen",
          "deleteBack": "Zurück",
          "save": "Speichern",
          "requiredFieldsMessage": "Pflichtfelder dürfen nicht leer sein",
          "employeeName": "Mitarbeitername",
          "equipmentType": "Gerätetyp",
          "itemCreated": "Inventarartikel erfolgreich erstellt", 
          "itemUpdated": "Inventarartikel erfolgreich aktualisiert",
          "itemDeleteError": "Artikel nicht gefunden. Er könnte bereits gelöscht worden sein.",
          "actions":"Aktionen",
          "filter":"Filter"
          
        },
      },
    },
    lng: "en", 
    fallbackLng: "en", 

    interpolation: {
      escapeValue: false, 
    },
  });

export default i18n;
