import { create } from 'zustand';
import useAxiosPublic from './../hook/UseAxiosPublic';
const axiosPublic = useAxiosPublic();

const moneyStore = create((set) => ({
    moneyInsertApi: async (payload) => {
        try {
            const res = await axiosPublic.post('/money-entry', payload);
            return res.data.status === "success";
        } catch (error) {
            console.error("Error inserting money entry:", error);
            return false;
        }
    },
    
    totalMoneyCalculation : [],
    borderMoneyDataList : [],
    totalMoneyCalculationApi : async (payload)=>{
        let res = await axiosPublic.post('/money-calculation', payload);
        if(res.data.status === "success"){
            set({ totalMoneyCalculation: parseFloat(res.data.data) });
            set({ borderMoneyDataList: res.data.dataTow });
            return true;
        }
    }

    
}));

export default moneyStore;
