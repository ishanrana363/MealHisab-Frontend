
import { create } from 'zustand';
import useAxiosPublic from './../hook/UseAxiosPublic';
const useAxios = useAxiosPublic();

const moneyStore = create((set)=>({
    moneyInsertApi: async (payload) => {
        const res = await useAxios.post('/money-entry', payload);
        if(res.data.status === "success") {
            return true;
        } else {
            return false;
        }
    }
}));

export default moneyStore;