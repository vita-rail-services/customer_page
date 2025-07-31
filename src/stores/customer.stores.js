import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useCustomerStore = create(
    persist((set) => ({
    zone: "",
    station: "",
    trainDetails: {
        trainName: "",
        pnr: "",
        seatNumber: "",
        coach: "",
        trainNumber: null,
    },
    items: [],

    setZone: (zone) => set({ zone }),
    setStation: (station) => set({ station }),
    setTrainDetails: (trainDetails) => set({ trainDetails }),
    setItems: (items) => set({ items }),
}), {
    name: "customer-storage", // Name of the storage
    storage: createJSONStorage(() => sessionStorage), // Use sessionStorage
}));

export default useCustomerStore;