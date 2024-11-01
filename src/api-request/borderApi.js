import axios from "axios";
import { create } from "zustand";


const baseUrl = `http://match-mill-hisab.vercel.app/api/v1`;

const config = {
    headers: {
        Authorization: `${localStorage.getItem("token")}`,
    },
}

const borderStore = create((set) => ({
    borderCreateApi: async (payload) => {
        const res = await axios.post(`${baseUrl}/create-border`, payload, config);
        if (res.data["status"] === "success") {
            return true;
        } else {
            return false;
        }
    },
    totalBorderLength: [],
    totalBorderDataList: [],
    totalBorderDataApi: async (pageNo, perPage, searchValue) => {
        let res = await axios.get(`${baseUrl}/all-border/${pageNo}/${perPage}/${searchValue}`);
        if (res.data["status"] === "success") {
            if (res.data["data"]["0"]["Rows"].length > 0) {
                set({ totalBorderDataList: res.data["data"]["0"]["Rows"] });
                set({ totalBorderLength: res.data["data"]["0"]["Total"]["0"]["count"] })
            } else {
                return false;
            }
        } else {
            return false;
        }
    },
    deleteBorderApi: async (id) => {
        const res = await axios.delete(`${baseUrl}/border-delete/${id}`);
        if (res.data["status"] === "success") {
            return true;
        } else {
            return false;
        }
    },
    singleBorderDataList: [],
    singleBorderDataApi: async (id) => {
        const res = await axios.get(`${baseUrl}/single-border/${id}`);
        if (res.data["status"] === "success") {
            return set({ singleBorderDataList: res.data.data });
        } else {
            return false;
        }
    },
    updateBorderApi: async (id, payload) => {
        const res = await axios.put(`${baseUrl}/border-update/${id}`, payload,);
        if (res.data["status"] === "success") {
            return true;
        } else {
            return false;
        }
    },
}));

export default borderStore;
