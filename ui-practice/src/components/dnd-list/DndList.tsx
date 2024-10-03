import { ReactNode, useCallback, useState } from "react";
import clsx from "clsx";
import styles from "./DndList.module.scss";

interface DndListProps<T> {
  list: Array<T>;
  setList: ReturnType<typeof useState>[1];
  renderItem: (item: T) => ReactNode;
}

const move = <T,>(arr: Array<T>, from: number, to: number) => {
  arr.splice(to, 0, arr.splice(from, 1)[0]);
};

const DndList = <T extends { key: string }>({
  list,
  setList,
  renderItem,
}: DndListProps<T>): ReactNode => {
  const [insertPosition, setInsertPosition] = useState<number | undefined>(
    undefined,
  );
  const [dragTarget, setDragTarget] = useState<number | undefined>(undefined);
  const [indicatorPosition, setIndicatorPosition] = useState<
    undefined | "up" | "down"
  >(undefined);

  const handleDrop = useCallback(
    (e: React.DragEvent, idx: number) => {
      const next = [...list];
      move(next, dragTarget, idx);
      setList(next);
    },
    [dragTarget, list, setList],
  );

  const handleDragStart = useCallback((idx: number) => {
    setInsertPosition(idx);
    setDragTarget(idx);
  }, []);

  const handleDragEnd = useCallback(() => {
    setIndicatorPosition(undefined);
    setInsertPosition(undefined);
    setDragTarget(undefined);
  }, []);

  const handleDragOver = useCallback(
    (e: React.DragEvent<HTMLElement>, index: number) => {
      e.preventDefault();
      const rect = e.currentTarget.getBoundingClientRect();
      const targetThreshold = rect.top + rect.height / 2;

      if (e.clientY > targetThreshold) {
        setInsertPosition(index + 1);
        setIndicatorPosition("down");
      } else {
        setInsertPosition(index);
        setIndicatorPosition("up");
      }
    },
    [],
  );

  return (
    <ul>
      {list.map((item, idx) => (
        <li
          key={item.key}
          draggable
          className={clsx(styles.item, {
            [styles.indicatorBottom]:
              indicatorPosition === "down" && idx === insertPosition - 1,
            [styles.indicatorTop]:
              indicatorPosition === "up" && idx === insertPosition,
            [styles.dragging]: dragTarget === idx,
          })}
          onDragStart={() => handleDragStart(idx)}
          onDragEnd={handleDragEnd}
          onDragOver={(e) => handleDragOver(e, idx)}
          onDrop={(e) => handleDrop(e, idx)}
        >
          {renderItem(item)}
        </li>
      ))}
      <div className={styles.ghost}></div>
    </ul>
  );
};

export default DndList;
