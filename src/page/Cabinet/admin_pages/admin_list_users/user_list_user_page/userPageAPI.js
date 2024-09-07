import $API from "../../../../../utils/http.js";


export const UpdateItemProduct = async (data) => {

    try {
        const res = await $API.put(`/product/product-update/${data.id}/`, data);

        return res;
    } catch (e) {

        throw e;
    }
};

export const CreateItemProduct = async (data) => {

    try {
        const res = await $API.post(`/product/product-create/`, data);

        return res;
    } catch (e) {

        throw e;
    }
};

export const DeleteItemProduct = async (uuid, id) => {
    try {
        const res = await $API.delete(`/product/users/${uuid}/delete_year_item/${id}/`);

        return res;
    } catch (e) {

        throw e;
    }
};
