import { Ref, useCallback, useRef } from "react";

import { DropdownRef } from "./Dropdown";

const useDropdown: () => [Ref<DropdownRef>, (v: boolean) => void] = () => {
  const ref = useRef(null);

  const setVisible = useCallback(
    (value: boolean) => {
      if (ref.current) {
        ref.current.setVisible(value);
      }
    },
    [ref.current],
  );
  return [ref, setVisible];
};
export default useDropdown;
