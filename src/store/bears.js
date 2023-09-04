import { create } from 'zustand';

export const useBearsStore = create((set) => ({
  bears: [],
  addBear: (newBear) =>
    set((state) => ({
      ...state,
      bears: [...state.bears, newBear],
    })),
}));
