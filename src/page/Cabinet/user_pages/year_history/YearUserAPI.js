import $API from "../../../../utils/http.js";

export const Year_historyAPI = async (uuid, page = 1 , filtrData = {}) => {
    try {
        console.log(uuid, page, filtrData);
        let params = { page: page };
        if (filtrData?.title) {
            params.title = filtrData.title;
        } else if (filtrData?.status) {
            params.status = filtrData.status;
        }

        const res = await $API.get(`/product/user_year/${uuid}/`, { params });
        console.log(res)
        return res; // Ensure this is correctly placed within the try block
    } catch (err) {
        console.error('Error fetching year history:', err);
        throw err;
    }
};
