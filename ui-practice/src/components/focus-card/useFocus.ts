import FocusContext, {
  FocusProvider,
} from "@components/focus-card/FocusContext";
import { useContext } from "react";

const useFocus = () => {
  return { ...useContext(FocusContext), FocusProvider };
};

export default useFocus;
