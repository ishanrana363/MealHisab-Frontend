import { create } from "zustand";
import useAxiosPublic from "../hook/UseAxiosPublic";

const axiosPublic = useAxiosPublic();




const millStore = create((set) => ({
    millCreateApi: async (payload) => {
        const res = await axiosPublic.post('/insert-vegetable-entry', payload);
        if (res.data.status === "success") {
            return true;
        } else {
            return false;
        }
    },
    totalMillData: [],
    borderMillDataList: [],
    borderMillDataApi: async (payload) => {
        const res = await axiosPublic.post('/total-mill-calculation', payload);
        if (res.data.status === "success") {
            set({ totalMillData: parseFloat(res.data.data) });
            set({ borderMillDataList: res.data.dataTow });
            return;
        } else {
            return false;
        }

    },
}));

export default millStore;