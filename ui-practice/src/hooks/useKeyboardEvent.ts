import { useEffect } from "react";

const useKeyboardEvent = (key: KeyboardEvent["key"], callback: () => void) => {
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === key) {
        callback();
      }
    };

    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [callback]);
};

export default useKeyboardEvent;
