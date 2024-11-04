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

    totalMoneyCalculation: [],
    borderMoneyDataList: [],
    totalMoneyCalculationApi: async (payload) => {
        let res = await axiosPublic.post('/money-calculation', payload);
        if (res.data.status === "success") {
            set({ totalMoneyCalculation: parseFloat(res.data.data) });
            set({ borderMoneyDataList: res.data.dataTow });
            return true;
        }
    },

    totalMill: [],
    takaDisa: [],
    takaPaba: [],
    millKhorajTka : [],
    takaDayarDate: [],
    millKayarDate: [],
    qrImg : [],
    total30DaysOfApi: async (payload) => {
        let res = await axiosPublic.post('/money-calculation-30days', payload);
        if (res.data.status === "success") {
            set({ totalMill: parseFloat(res.data.totalMill) });
            set({ takaDisa: parseFloat(res.data.takaDisa) });
            set({ takaPaba: parseFloat(res.data.takaPaba) });
            set({ takaDayarDate: res.data.takaDayarDate });
            set({ millKayarDate: res.data.millKayarDate });
            set({ millKhorajTka: res.data.millKhorajTka });
            set({ qrImg: res.data.qrImg });
            return true;
        }else{
            return false;
        }
    },

    totalEatenRiceOneBorder : [],
    totalGivenRiceOneBorder : [],
    millQrImg : [],
    chalPabane : [],
    borderDataList : [],
    totalRiceOneBorderApi: async (payload) => {
        let res = await axiosPublic.post('/rice-calculation-30days', payload);
        if(res.data.status === 'success'){
            set({ totalEatenRiceOneBorder: parseFloat(res.data.totalEatenRiceOneBorder) });
            set({ totalGivenRiceOneBorder: parseFloat(res.data.totalGivenRiceOneBorder) });
            set({ chalPabane: parseFloat(res.data.chalPabane) });
            set({ borderDataList: res.data.borderDataList});
            console.log(res.data.borderDataList)
            set({millQrImg : res.data.qrImg });
            return true;
        }
    },


}));

export default moneyStore;
