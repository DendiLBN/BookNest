import { createContext, type FC, type ReactNode, useCallback, useMemo, useState } from "react";

export type TCartDrawerContext = {
  isCartDrawerOpen: boolean;
  closeCartDrawer: () => void;
  openCartDrawer: () => void;
};

export const CartDrawerContext = createContext<TCartDrawerContext | undefined>(undefined);

export const CartDrawerProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

  const openCartDrawer = useCallback(() => {
    setIsCartDrawerOpen(true);
  }, []);

  const closeCartDrawer = useCallback(() => {
    setIsCartDrawerOpen(false);
  }, []);

  const value = useMemo(
    () => ({
      closeCartDrawer,
      isCartDrawerOpen,
      openCartDrawer,
    }),
    [closeCartDrawer, isCartDrawerOpen, openCartDrawer],
  );

  return <CartDrawerContext.Provider value={value}>{children}</CartDrawerContext.Provider>;
};
