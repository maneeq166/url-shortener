import axios from "axios";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_BASE_URL;

export const createLink = async ({ fullUrl, userSlug }) => {
  try {
    const size = Math.floor(Math.random() * 10);
    const res = await axios.post(
      `${API_URL}/link`,
      {
        fullUrl,
        userSlug,
        size,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    toast.success(res.data.message);

    return res.data;
  } catch (error) {
    const msg = error.response?.data?.message || error.message;
    toast.error(msg);

    return { success: false, message: msg };
  }
};

export const getLinks = async () => {
  try {
    const res = axios.get(`${API_URL}/link`,{
        headers:`Bearer ${localStorage.getItem("token")}`,
    });

    toast.success(res.data.message)

    return res.data;

  } catch (error) {
    const msg = error.response?.data?.message || error.message;
    toast.error(msg);

    return { success: false, message: msg };
  }
};
