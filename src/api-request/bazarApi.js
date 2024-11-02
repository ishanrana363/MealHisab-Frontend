import { create } from "zustand";
import useAxiosPublic from "../hook/UseAxiosPublic";

const axiosPublic = useAxiosPublic();

const bazarStore = create((set) => ({
    bazarInsertApi: async (payload) => {
        const res = await axiosPublic.post('/insert-daily-bazar', payload);
        if (res.data.status === "success") {
            return true;
        } else {
            return false;
        }
    },
    totalBazarData: [],
    borderBazarDataList: [],
    borderBazarDataApi: async (payload) => {
        const res = await axiosPublic.post('/total-bazar-calculation', payload);
        if (res.data.status === "success") {
            set({ totalBazarData: parseFloat(res.data.data) });
            set({ borderBazarDataList: res.data.dataTow });
            return;
        } else {
            return false;
        }
    },
    totalBazarMoney: [],
    bazarDataList: [],
    bazarDataListApi: async (payload) => {
        const res = await axiosPublic.post('/total-bazar-list', payload);
        if (res.data.status === "success") {
            set({ totalBazarMoney: parseFloat(res.data.data) });
            set({ bazarDataList: res.data.dataTow });
            return;
        } else {
            return false;
        }
    },
}));

export default bazarStore;