import styles from "./styles.module.scss";

const Dropdown = ({ data, selectedValue, keyName }) => (
  <select
    onChange={(e) => selectedValue(e.target.value)}
    className={styles.dropdown}
  >
    <option value="">Select {keyName}</option>
    {data.map((item, index) => (
      <option key={index} value={item}>
        {item}
      </option>
    ))}
  </select>
);

export default Dropdown;
