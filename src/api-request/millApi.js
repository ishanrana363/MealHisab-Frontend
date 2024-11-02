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
    // Add more state variables as needed for mill data
}));

export default millStore;