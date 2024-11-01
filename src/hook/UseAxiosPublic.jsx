import axios from 'axios';

// const backendUrl = `http://localhost:5500/api/v1`;
const backendUrl = `http://match-mill-hisab.vercel.app/api/v1`;


const axiosPublic = axios.create({
    baseURL: backendUrl
})

const useAxiosPublic = () => {
    return axiosPublic;
}


export default useAxiosPublic;