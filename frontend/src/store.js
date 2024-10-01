import { create } from "zustand";

const useGameQueryStore = create((set) => ({
  selectedDate: null,
  SetSelectedDate: (selectedDate) => set({ selectedDate: selectedDate }),
  selectedTheater: "66f431f9114c8d537ff71c4a",
  SetSelectedTheater: (selectedTheater) =>
    set({ selectedTheater: selectedTheater }),
  selectedTime: null,
  SetSelectedTime: (selectedTime) => set({ selectedTime: selectedTime }),
}));

export default useGameQueryStore;