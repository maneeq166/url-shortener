import axios from "axios"
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_BASE_URL;


export const createLink = async ({fullUrl,userSlug}) =>{
    const size = Math.floor(Math.random() * 10)
    const res = await axios.post(`${API_URL}/link`,{
        fullUrl,userSlug,size
    },{
        headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
        }
    })

    toast.success(res.data.message);

    return res.data
}