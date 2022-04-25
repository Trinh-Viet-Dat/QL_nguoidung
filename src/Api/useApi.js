import axiosClient from "./axiosClient";

const base_url = "/forms";
const api = {
    getAll(params) {
        const url = `${base_url}`
        return axiosClient.get(url, { params })
    },
    get(id) {
        const url = `${base_url}/${id}`
        return axiosClient.get(url)
    },
    delete(id) {
        const url = `${base_url}/${id}`
        return axiosClient.delete(url)
    },
    add(arr) {
        const url = `${base_url}`
        return axiosClient.post(url, arr)
    },
    edit(id, arr) {
        const url = `${base_url}/${id}`
        return axiosClient.patch(url, arr)
    }
};
export default api;