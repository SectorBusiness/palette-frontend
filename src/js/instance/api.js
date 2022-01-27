import axios from "axios";

const API_URL = 'data.xml';

const instance = axios.create({
   baseURL: `${API_URL}`,
    mode: 'no-cors',
   headers: {
       Accept: "application/xml",
       "Content-Type": "application/xml",
   },
   timeout: 5000,
});

export default instance;