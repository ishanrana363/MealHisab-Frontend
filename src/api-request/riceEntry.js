
import { create } from 'zustand';
import useAxiosPublic from './../hook/UseAxiosPublic';

const axioPublic = useAxiosPublic();


const riceEntryStore = create((set) => ({
    riceInsertApi: async (payload) => {
        const res = await axioPublic.post('/insert-rice-entry', payload);
        if (res.data.status === "success") {
            return true;
        } else {
            return false;
        }
    },
    totalRiceData: [],
    borderRiceDataList: [],
    totalRiceDataApi: async (payload) => {
        console.log(payload)
        const res = await axioPublic.post('/total-rice-border', payload);
        if (res.data.status === "success") {
            set({ totalRiceData: parseFloat(res.data.data) });
            set({ borderRiceDataList: res.data.dataTow });
            return;
        } else {
            return false;
        }
    },
    dailyRiceEntryApi: async (payload) => {
        const res = await axioPublic.post('/insert-daily-rice-entry', payload);
        if (res.data.status === "success") {
            return true;
        } else {
            return false;
        }
    },
    dailyRiceTotal : [],
    dailyRiceDataList: [],
    dailyRiceDataApi: async (payload) => {
        const res = await axioPublic.post('/total-eaten-rice-border', payload);
        if (res.data.status === "success") {
            set({ dailyRiceTotal: parseFloat(res.data.data) });
            console.log(parseFloat(res.data.data));
            set({ dailyRiceDataList: res.data.dataTow });
            return;
        } else {
            return false;
        }
    },
}));

export default riceEntryStore;