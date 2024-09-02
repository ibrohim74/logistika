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
