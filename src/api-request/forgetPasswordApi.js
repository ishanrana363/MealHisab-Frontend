import useAxiosPublic from "../hook/UseAxiosPublic";


const axiosPublic = useAxiosPublic();


export const sendEmailApi = async (payload) => {
    let res = await axiosPublic.post(`/send-otp`, payload);
    if (res.data.status === "success") {
        return res.data.status;
    } else {
        return res.data.message;
    }
};

export const otpVerifyApi = async (payload) => {
    let res = await axiosPublic.post(`/verify-otp`, payload);
    if (res.data.status === "success") {
        return res.data.status;
    } else {
        return res.data.message;
    }
};