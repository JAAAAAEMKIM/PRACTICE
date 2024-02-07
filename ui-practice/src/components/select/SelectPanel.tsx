import { ReactNode } from "react";

import styles from "./Select.module.scss";
interface SelectPanelProps {
  children: ReactNode;
}
const SelectPanel: React.FC<SelectPanelProps> = ({ children }) => {
  return <div className={styles.panel}>{children}</div>;
};

export default SelectPanel;
