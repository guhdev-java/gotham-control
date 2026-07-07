import { useContext } from "react";

import { GothamContext } from "./gothamContext";

export function useGotham() {
  const context = useContext(GothamContext);

  if (!context) {
    throw new Error("useGotham must be used inside GothamProvider");
  }

  return context;
}
