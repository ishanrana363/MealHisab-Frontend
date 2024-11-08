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
    totalUserLength: [],
    totalUserDataList: [],
    totalUserDataApi: async (pageNo, perPage, searchValue) => {
        const token = localStorage.getItem('token');

        const config = {
            headers: { Authorization: `${token}` },
        };
        let res = await axiosPublic.get(`/user-list/${pageNo}/${perPage}/${searchValue}`, config);
        if (res.data["status"] === "success") {
            if (res.data["data"]["0"]["Rows"].length > 0) {
                set({ totalUserDataList: res.data["data"]["0"]["Rows"] });
                set({ totalUserLength: res.data["data"]["0"]["Total"]["0"]["count"] })
            } else {
                return false;
            }
        } else {
            return false;
        }
    },
    userRoleUpdate: async (id, payload) => {
        const token = localStorage.getItem('token');
        const config = {
            headers: { Authorization: `${token}` },
        };
        const res = await axiosPublic.put(`/status-update/${id}`, payload, config);
        if (res.data.status === "success") {
            return true;
        } else {
            return false;
        }

    },
    totalDisableUserLength: [],
    totalDisableUserDataList: [],
    totalDisableUserDataApi: async (pageNo, perPage, searchValue) => {
        const token = localStorage.getItem('token');

        const config = {
            headers: { Authorization: `${token}` },
        };
        let res = await axiosPublic.get(`/disable-user/${pageNo}/${perPage}/${searchValue}`, config);
        if (res.data["status"] === "success") {
            if (res.data["data"]["0"]["Rows"].length > 0) {
                set({ totalDisableUserDataList: res.data["data"]["0"]["Rows"] });
                set({ totalDisableUserLength: res.data["data"]["0"]["Total"]["0"]["count"] })
            } else {
                return false;
            }
        } else {
            return false;
        }
    },
    activeUserApi: async (id) => {
        const token = localStorage.getItem('token');
        const config = {
            headers: { Authorization: `${token}` },
        };

        // Pass an empty object `{}` as the second parameter, and `config` as the third
        let res = await axiosPublic.put(`/enable-user/${id}`, {}, config);

        console.log(res);
        if (res.data["status"] === "success") {
            return true;
        } else {
            return false;
        }
    },

    disableUserApi : async (id)=>{
        const token = localStorage.getItem('token');
        const config = {
            headers: { Authorization: `${token}` },
        };
        let res = await axiosPublic.put(`/user/delete/${id}`, {}, config);
        console.log(res);
        if (res.data["status"] === "success") {
            return true;
        } else {
            return false;
        }

    }

}));

export default userStore;
