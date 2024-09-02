import $API from "../../../../utils/http.js";

export const Year_historyAPI = async (uuid, page = 1) => {
    try {
        console.log(uuid , page)
        const res = await $API.get(`/product/user_year/${uuid}/`, { params: { page } });
        console.log(res)
        return res;
    } catch (err) {
        console.error('Error fetching month history:', err);
        throw err;
    }
};