import axios from "axios";
import $API from "../../utils/http.js";


export const LoginAPI = async (data)=>{
    try {
        console.log(data)
        const res = await $API.post("/auth/token/", data)
        console.log(res)
        return res
    }catch (e){
        localStorage.setItem('user' , "")
       console.log(e)
    }

}