import axios from "axios";
import $API from "../../utils/http.js";


export const LoginAPI = async (data)=>{
    try {
        const res = await $API.post("/auth/token/", data)
        return res
    }catch (e){
        console.log(e)
    }

}