import { ReactNode, createContext, useCallback } from "react";
import styles from "./Select.module.scss";
import { Dropdown, useDropdown } from "@components/dropdown";
import SelectPanel from "./SelectPanel";
import SelectItem from "./SelectItem";

export type SelectValue = string | string[] | number | number[];
type SelectContextState = {
  value: SelectValue | null;
  onSelect: (v: SelectValue) => void;
};
export const SelectContext = createContext<SelectContextState>({
  value: null,
  onSelect: () => {},
});

type SelectProps = {
  children: ReactNode;
  label: string | ReactNode;
  placeholder: string;
} & SelectContextState;

const Select: React.FC<SelectProps> & { Item: typeof SelectItem } = ({
  children,
  value,
  label,
  placeholder,
  onSelect,
}) => {
  const [dropdownRef, setVisible] = useDropdown();

  const handleClickButton = useCallback(() => {
    setVisible(true);
  }, []);

  return (
    <SelectContext.Provider value={{ value, onSelect }}>
      <Dropdown
        ref={dropdownRef}
        attachTo={
          <button className={styles.button} onClick={handleClickButton}>
            {value === null ? (
              <span className={styles.placeholder}>{placeholder}</span>
            ) : (
              <span className={styles.label}>{label}</span>
            )}
          </button>
        }
        content={<SelectPanel>{children}</SelectPanel>}
      />
    </SelectContext.Provider>
  );
};

Select.Item = SelectItem;

export default Select;
