import axios from "axios";

const BASE_URL = "http://localhost:4000";
const AUTH_API = `${BASE_URL}/api/auth`

const api = axios.create({
    withCredentials: true
});

export const signup = (user) =>
    api.post(`${AUTH_API}/signup`, user)
        .then(response => response.data);