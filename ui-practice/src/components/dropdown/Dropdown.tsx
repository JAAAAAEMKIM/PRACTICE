import {
  useImperativeHandle,
  useState,
  forwardRef,
  useCallback,
  ReactNode,
} from "react";
import { createPortal } from "react-dom";
import styles from "./Dropdown.module.scss";
import useKeyboardEvent from "@hooks/useKeyboardEvent";
import useOutsideClick from "@hooks/useOutsideClick";

export interface DropdownRef {
  setVisible: (v: boolean) => void;
}

interface DropdownProps {
  attachTo: ReactNode;
  content: ReactNode;
}

const Dropdown = forwardRef<DropdownRef, DropdownProps>(
  ({ attachTo, content }, ref) => {
    const [visible, setVisible] = useState(false);

    const handleClose = useCallback(() => {
      visible && setVisible(false);
    }, [visible]);

    const blockPropagation = useOutsideClick(handleClose);
    useKeyboardEvent("Escape", handleClose);

    useImperativeHandle(ref, () => ({
      setVisible,
    }));

    return (
      <div onClick={blockPropagation} onKeyDown={handleClose}>
        {attachTo}
        {visible
          ? createPortal(
              <div className={styles.panel}>{content}</div>,
              document.body,
            )
          : null}
      </div>
    );
  },
);

export default Dropdown;
