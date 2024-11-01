import axios from "axios";
import { create } from "zustand";


const baseUrl = `http://match-mill-hisab.vercel.app/api/v1`;

const config = {
    headers: {
        Authorization: `${localStorage.getItem("token")}`,
    },
}

const borderStore = create((set)=>({
    borderCreateApi : async (payload)=>{
        const res = await axios.post(`${baseUrl}/create-border`,payload,config);
        if(res.data["status"]==="success"){
            return true;
        }else{
            return false;
        }
    }
}));

export default borderStore;
