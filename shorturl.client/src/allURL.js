import axios from "axios";
export const fetchAllURL = async () => {
    try {
        const response = await axios.get('https://localhost:7043/api/UrlShortener');
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}