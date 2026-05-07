import { createContext, Dispatch, FC, ReactNode, SetStateAction, useState } from "react";

export type TModalContext = {
  isModalVisible: boolean;

  showModal: Dispatch<SetStateAction<void>>;
  hideModal: Dispatch<SetStateAction<void>>;
};

export const ModalContext = createContext<TModalContext | undefined>(undefined);

export const ModalProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const showModal = () => setIsModalVisible(true);

  const hideModal = () => setIsModalVisible(false);

  return (
    <ModalContext.Provider
      value={{
        isModalVisible,
        showModal,
        hideModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
