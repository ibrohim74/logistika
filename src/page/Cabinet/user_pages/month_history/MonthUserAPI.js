import $API from "../../../../utils/http.js";

export const Month_historyAPI = async (uuid, page = 1) => {
    try {
        const res = await $API.get(`/product/user_month/${uuid}/`, { params: { page } });
        console.log(res)
        return res;
    } catch (err) {
        console.error('Error fetching month history:', err);
        throw err;
    }
};

export const GetExcelAPI = async () => {
    try {
        const res = await $API.get(`/product/download-excel/`);
        console.log(res)
    }catch (e){
        console.log(e)}
}
