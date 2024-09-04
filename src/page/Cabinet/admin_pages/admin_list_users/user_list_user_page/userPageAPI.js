import $API from "../../../../../utils/http.js";


export const UpdateItemProduct = async (data) => {
    console.log(data);
    try {
        const res = await $API.put(`/product/product-update/${data.id}/`, data);
        console.log(res);
        return res;
    } catch (e) {
        console.error('Error updating product:', e);
        throw e;
    }
};

export const CreateItemProduct = async (data) => {
    console.log(data);
    try {
        const res = await $API.post(`/product/product-create/`, data);
        console.log(res);
        return res;
    } catch (e) {
        console.error('Error updating product:', e);
        throw e;
    }
};

export const DeleteItemProduct = async (uuid,id) => {
    try {
        const res = await $API.delete(`/product/users/${uuid}/delete_year_item/${id}/`);
        console.log(res);
        return res;
    } catch (e) {
        console.error('Error updating product:', e);
        throw e;
    }
};
