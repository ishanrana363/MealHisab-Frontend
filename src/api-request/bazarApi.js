import { create } from "zustand";
import useAxiosPublic from "../hook/UseAxiosPublic";

const axiosPublic = useAxiosPublic();

const bazarStore = create((set)=>({
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
    // Add other store properties as needed
}));

export default bazarStore;