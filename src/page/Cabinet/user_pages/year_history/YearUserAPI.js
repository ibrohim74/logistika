import $API from "../../../../utils/http.js";

export const Year_historyAPI = async (uuid, page = 1 , filtrData = {}) => {
    try {

        let params = { page: page };
        if (filtrData?.title) {
            params.title = filtrData.title;
        }
        if (filtrData?.status) {
            params.status = filtrData.status;
        }
        if (filtrData?.places) {
            params.places = filtrData.places;
        }

        const res = await $API.get(`/product/user_year/${uuid}/`, { params });

        return res;
    } catch (err) {

        throw err;
    }
};
