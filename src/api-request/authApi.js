import axios from "axios"

const baseUrl = `http://match-mill-hisab.vercel.app/api/v1`

export const registrationApi = async (payload)=>{
    let res = await axios.post(`${baseUrl}/registration`,payload);
    if(res.data.status === "success" ){
        console.log(res)
        return res.data.status;
    }else{
        console.log(res.data.status);
        return res.data.message;
    }
}