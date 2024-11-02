
import { create } from 'zustand';
import useAxiosPublic from './../hook/UseAxiosPublic';

const axioPublic = useAxiosPublic();


const riceEntryStore = create((set)=>({
    riceInsertApi : async (payload)=>{
        const res = await axioPublic.post('/insert-rice-entry', payload);
        if(res.data.status === "success"){
            return true;
        } else {
            return false;
        }
    }
}));

export default riceEntryStore;