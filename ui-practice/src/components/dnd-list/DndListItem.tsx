import { ReactNode, useContext } from "react";
import styles from "./DndList.module.scss";
import DndContext from "./DndContext";

interface DndListItemProps {
  children: ReactNode;
  id: string;
}
const DndListItem: React.FC<DndListItemProps> = ({ children, id }) => {
  const { onDragEnd, onDragStart } = useContext(DndContext);
  return (
    <li
      id={id}
      draggable
      className={styles.item}
      onDragEnd={onDragEnd}
      onDragStart={onDragStart}
      // onDrag={() => console.log("is dragging...")}
    >
      {children}
    </li>
  );
};

export default DndListItem;
