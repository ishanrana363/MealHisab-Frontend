import axios from "axios"
import useAxiosPublic from './../hook/UseAxiosPublic';

const axiosPublic = useAxiosPublic()

export const registrationApi = async (payload)=>{
    let res = await axiosPublic.post(`/registration`,payload);
    if(res.data.status === "success" ){
        return res.data.status;
    }else{
        return res.data.message;
    }
};

export const loginApi = async (payload)=>{
    let res = await axiosPublic.post(`/login`,payload);
    if(res.data.status === "success" ){
        localStorage.setItem("token",res.data.token);
        console.log(res)
        return res.data.status;
    }else{
        console.log(res.data.status);
        return res.data.message;
    }
};