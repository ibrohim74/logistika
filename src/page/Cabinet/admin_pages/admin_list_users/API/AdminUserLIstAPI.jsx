import axios from "axios";
import $API from "../../../../../utils/http.js";

export const GetUsersAPI = async () => {
    try {
        const res = await $API.get('/auth/user-list/');
        return res;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

export const CreateUsersAPI = async (data) => {
    try {
        const res = await $API.post('/auth/create/', data);
        console.log(res)
        return res;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

export const UpdateUsersAPI = async (data) => {
    console.log(data)
    try {
        const res = await $API.put(`/auth/user-update/${data.uuid}`, data); // Changed `uuid` to `id` for consistency
        return res;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};
