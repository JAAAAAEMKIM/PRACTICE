import { useCallback, useEffect } from "react";

const useOutsideClick = (callback: () => void) => {
  useEffect(() => {
    document.addEventListener("click", callback);
    return () => {
      document.removeEventListener("click", callback);
    };
  }, [callback]);

  const blockPropagation = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);
  return blockPropagation;
};

export default useOutsideClick;
