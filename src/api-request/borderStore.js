import { create } from "zustand";
import useAxiosPublic from "../hook/UseAxiosPublic";

const useAxios = useAxiosPublic();


const formerBorderStore = create((set)=>({
    formerBorderDataList: [],
    formerBorderApi: async () => {
        const res = await useAxios.get('/all-former-border');
        if(res.data.status === "success") {
            set({formerBorderDataList : res.data.data})
        } else {
            return false;
        }
    }
}));

export default formerBorderStore;