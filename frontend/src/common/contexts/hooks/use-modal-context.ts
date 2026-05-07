import { useContext } from "react";

import { ModalContext, TModalContext } from "@/common/contexts/modal-context";

export const useModalContext = (): TModalContext => {
  const ctx = useContext(ModalContext);
  if (ctx === undefined) {
    throw new Error("useModalContext must be used within an ModalContextProvider");
  }

  return ctx;
};
