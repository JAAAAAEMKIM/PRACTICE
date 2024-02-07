import { ReactNode, useContext } from "react";
import { SelectContext, SelectValue } from "./Select";

import styles from "./Select.module.scss";

interface SelectItemProps {
  children: ReactNode;
  value: SelectValue;
  isSelected: boolean;
}
const SelectItem: React.FC<SelectItemProps> = ({
  children,
  value,
  isSelected,
}) => {
  const { onSelect } = useContext(SelectContext);
  return (
    <div
      className={isSelected ? styles.itemSelected : styles.item}
      onClick={() => onSelect(value)}
    >
      {children}
    </div>
  );
};

export default SelectItem;
