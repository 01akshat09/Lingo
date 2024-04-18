import { create } from "zustand";
type HeartsModel = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};
export const useHeartsModal = create<HeartsModel>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
