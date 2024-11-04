import axios from "axios"
import useAxiosPublic from './../hook/UseAxiosPublic';

const useAxios = useAxiosPublic()

export const registrationApi = async (payload)=>{
    let res = await useAxios.post(`/registration`,payload);
    if(res.data.status === "success" ){
        return res.data.status;
    }else{
        return res.data.message;
    }
};

export const loginApi = async (payload)=>{
    let res = await axios.post(`/https://match-mill-hisab.vercel.app/api/v1/login`,payload);
    if(res.data.status === "success" ){
        localStorage.setItem("token",res.data.token);
        console.log(res)
        return res.data.status;
    }else{
        console.log(res.data.status);
        return res.data.message;
    }
};