import { createContext } from "react";

interface DndContextValue {
  onDragStart: () => void;
  onDragEnd: () => void;
}

const DndContext = createContext<DndContextValue>({
  onDragStart: () => {},
  onDragEnd: () => {},
});

export default DndContext;
