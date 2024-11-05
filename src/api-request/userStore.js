import { create } from 'zustand';
import useAxiosPublic from './../hook/UseAxiosPublic';
const axiosPublic = useAxiosPublic();

const userStore = create((set) => ({
    userProfileData: [],

    userProfileDataApi: async () => {
        try {
            const token = localStorage.getItem('token');
            
            const config = {
                headers: { Authorization: `${token}` },
            };

            const res = await axiosPublic.get('/user-profile', config);
            if (res.data.status === "success") {
                set({ userProfileData: res.data.data });
            }
        } catch (error) {
            console.error("Failed to fetch user profile:", error);
        }
    },

    userProfileUpdateApi: async (payload) => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: { Authorization: `${token}` },
            };

            const res = await axiosPublic.put('/user-update', payload, config);
            return res.data.status === "success";
        } catch (error) {
            console.error("Failed to update user profile:", error);
            return false;
        }
    },
}));

export default userStore;
