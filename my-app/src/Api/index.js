import axios from "axios";

const token = localStorage.getItem('token');
export const API = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true,
});

API.defaults.headers.common["Authorization"] = `Bearer ${token}`;

