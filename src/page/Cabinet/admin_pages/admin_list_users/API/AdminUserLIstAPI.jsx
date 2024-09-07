import $API from "../../../../../utils/http.js";

export const GetUsersAPI = async (page, filtrData) => {
    try {
        const res = await $API.get('/auth/user-list/', {params: {page: page, search: filtrData}});

        return res;
    } catch (error) {
        throw error;
    }
};

export const CreateUsersAPI = async (data) => {
    try {
        const res = await $API.post('/auth/create/', data);

        return res;
    } catch (error) {

        throw error;
    }
};

export const UpdateUsersAPI = async (data) => {

    try {
        const res = await $API.put(`/auth/user-update/${data.uuid}`, data); // Changed `uuid` to `id` for consistency
        return res;
    } catch (error) {

        throw error;
    }
};
export const DeleteUsersAPI = async (data) => {

    try {
        const res = await $API.delete(`/auth/user-delete/${data.uuid}`); // Changed `uuid` to `id` for consistency
        return res;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};
