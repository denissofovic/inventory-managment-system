import { useTranslation } from "react-i18next";
import Columns from "../../models/genericColumns";
import styles from "./cardsStyles";

interface CardsProps<T> {
  data: T[];
  config: Columns<T>[];
}

function Cards<T>(props: CardsProps<T>) {
  const { t } = useTranslation();
  return (
    <div style={{ ...styles.contentWrapper }}>
      <div>
        <h3>{t("filter")}:</h3>
        {props.config.map((item, key) => {
          return (
            item.filter &&
            item.getName && (
              <div key={key + "filters"} style={{ ...styles.filterSection }}>
                {item.getName()}
                <select
                  onChange={item.filter.callback}
                  defaultValue={""}
                  name={item.filter.selectName}
                  style={{ ...styles.filterSelect }}
                >
                  {item.filter.values.map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>
            )
          );
        })}
      </div>
      <div style={{ ...styles.cardContainer }}>
        {props.data.map((item, index) => (
          <div key={index + "values"} style={{ ...styles.card }}>
            {props.config.map((column, key) => (
              <div key={key + "keys"} style={{ ...styles.cardContent }}>
                <span
                  style={{
                    fontWeight: "bold",
                    cursor: column.sort ? "pointer" : "default",
                  }}
                  onClick={() => {
                    if (column.sort) column.sort();
                  }}
                >
                  {column.getName && column.getName() + ":"}
                </span>
                <span style={{ marginLeft: "10px" }}>
                  {column.getValue(item)}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cards;
