import {jwtDecode} from "jwt-decode";
import axios from "axios";
import { toast } from "react-toastify";
import { onLoginSuccess } from "../context/useAuthStore";

const API_URL = import.meta.env.VITE_API_BASE_URL;


export const register = async ({ username, email, password }) => {
  try {
    const res = await axios.post(`${API_URL}/auth/register`, {
      username,
      password,
      email
    });

    toast.success(res.data.message);

    return res.data;
  } catch (error) {
    const msg = error.response?.data?.message || error.message;
    // toast.error(msg);
    
    return { success: false, message: msg };
  }
};


export const login = async ({ email, password }) => {
  try {
    const res = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    });

    const token = res.data.data;

    localStorage.setItem("token", token);
    onLoginSuccess(token);

    const decoded = jwtDecode(token);
    toast.success(`Logged in as ${decoded.username}`);

    return res.data;
  } catch (error) {
    const msg = error.response?.data?.message || error.message;
    // toast.error(msg);
    return { success: false, message: msg };
  }
};

