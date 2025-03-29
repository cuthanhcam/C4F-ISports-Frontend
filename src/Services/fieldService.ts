import axios from "axios";

const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api/field`;


export const getFields = async (page: number = 1, pageSize: number = 10) => {
    try {
        const response = await axios.get(`${API_BASE_URL}`, {
            params: { page, pageSize },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching fields:", error);
        throw error;
    }
};
