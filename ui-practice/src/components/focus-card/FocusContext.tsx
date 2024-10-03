import { createContext, useState } from "react";

interface FocusContext<T = string> {
  focusKey: T | null;
  setFocusKey: (key: T) => void;
}

const FocusContext = createContext<FocusContext>({
  focusKey: null,
  setFocusKey: () => {},
});

export default FocusContext;

interface FocusProviderProps {
  children: React.ReactNode;
}

export const FocusProvider = ({ children }: FocusProviderProps) => {
  const [focusKey, setFocusKey] = useState(null);
  return (
    <FocusContext.Provider
      value={{
        focusKey,
        setFocusKey,
      }}
    >
      {children}
    </FocusContext.Provider>
  );
};
