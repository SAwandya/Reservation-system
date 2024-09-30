import { create } from "zustand";

const useGameQueryStore = create((set) => ({
  selectedDate: null,
  SetSelectedDate: (selectedDate) => set({ selectedDate: selectedDate }),
  // selectedTheater: "",
  // SetSelectedTheater: (selectedTheater) =>
  //   set({ selectedTheater: selectedTheater }),
}));

export default useGameQueryStore;