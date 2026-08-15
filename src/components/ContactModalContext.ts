import { createContext, useContext } from "react";

// Kept apart from the provider component so that module exports only components,
// which is what React Fast Refresh needs to hot-reload it.
export interface ContactModalContextType {
  isOpen: boolean;
  open: (options?: { subject?: string }) => void;
  close: () => void;
}

export const ContactModalContext = createContext<ContactModalContextType | undefined>(undefined);

export const useContactModal = () => {
  const context = useContext(ContactModalContext);
  if (!context) throw new Error("useContactModal must be used within ContactModalProvider");
  return context;
};
