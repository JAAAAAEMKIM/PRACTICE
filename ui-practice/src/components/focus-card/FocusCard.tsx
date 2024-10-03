import Card from "@components/card/Card";
import useFocus from "@components/focus-card/useFocus";
import styles from "./FocusCard.module.scss";
import clsx from "clsx";

interface FocusCardProps {
  id: string;
  onFocus: () => void;
  children: React.ReactNode;
}

const FocusCard = ({ id, onFocus, children }: FocusCardProps) => {
  const { focusKey, setFocusKey } = useFocus();
  const isFocused = focusKey === id;

  const handleFocus = () => {
    if (focusKey === id) return;
    setFocusKey(id);
    onFocus?.();
  };

  const handleKeydown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      handleFocus();
    }
  };

  return (
    <Card
      className={clsx([styles.card, isFocused && styles.focus])}
      onClick={handleFocus}
      onKeyDown={handleKeydown}
      tabIndex={0}
    >
      {children}
    </Card>
  );
};

export default FocusCard;
