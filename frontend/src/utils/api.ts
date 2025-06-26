import axios from "axios";
import { API_CONFIG } from "../configs/apiConfigs";

const { TWINWORD_API_KEY, TWINWORD_API_HOST, TWINWORD_API_URL } = API_CONFIG;

if (!TWINWORD_API_KEY || !TWINWORD_API_HOST || !TWINWORD_API_URL) {
  throw new Error("API config is missing. check .env file.");
}

const api = axios.create({
  baseURL: TWINWORD_API_URL,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    "x-rapidapi-key": TWINWORD_API_KEY,
    "x-rapidapi-host": TWINWORD_API_HOST,
  },
});

export default api;
