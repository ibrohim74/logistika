import $API from "../../../../utils/http.js";

export const Month_historyAPI = async (uuid, page = 1, filtrData) => {

    try {
        let params = {page: page};
        if (filtrData?.title) {
            params.title = filtrData.title;
        }
        if (filtrData?.status) {
            params.status = filtrData.status;
        }
        if (filtrData?.places) {
            params.places = filtrData.places;
        }
        const res = await $API.get(`/product/user_month/${uuid}/`, {params});

        return res;
    } catch (err) {
        console.error('Error fetching month history:', err);
        throw err;
    }
};

