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
    totalCalculationMoney : [],
    millQrImg : [],

    borderMillDataApi: async (payload) => {
        const res = await axiosPublic.post('/total-mill-calculation', payload);
        if (res.data.status === "success") {
            set({ totalCalculationMoney: parseFloat(res.data.data) });
            set({ totalMillData: parseFloat(res.data.dataThree) });
            set({ borderMillDataList: res.data.dataTow });
            set({ millQrImg : res.data.qrImg}); 

            return;
        } else {
            return false;
        }

    },
}));

export default millStore;