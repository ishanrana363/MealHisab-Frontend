import axios from "axios"

const baseUrl = `http://match-mill-hisab.vercel.app/api/v1`


export const registrationApi = async (payload)=>{
    let res = await axios.post(`${baseUrl}/registration`,payload);
    if(res.data.status === "success" ){
        return res.data.status;
    }else{
        return res.data.message;
    }
};

export const loginApi = async (payload)=>{
    let res = await axios.post(`${baseUrl}/login`,payload);
    if(res.data.status === "success" ){
        localStorage.setItem("token",res.data.token);
        console.log(res)
        return res.data.status;
    }else{
        console.log(res.data.status);
        return res.data.message;
    }
};