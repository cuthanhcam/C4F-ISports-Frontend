import type { SportField } from "../constants/fields";
import axiosClient from "./axiosClient"

export const fieldsAPI = {
    // Lấy thông tin tất cả các sân.
    getFields(params?: { page?: number; pageSize?: number; city?: string; district?: string}) {
        return axiosClient.get('fields', { params });
    },
    // Lấy thông tin chi tiết 1 sân.
    getFieldsDetail(FieldId: number) {
        return axiosClient.get(`fields/${FieldId}`);
    },
    // Thêm sân mới
    createFields(data: SportField) {
        return axiosClient.post('/fields', data);
    },
    // Lấy thông tin sân của owner
    getMyFields(params?: { page?: number; pageSize?: number}) {
        return axiosClient.get('/fields/my-fields', { params });
    },
    // Cập nhật
    updateField(fieldId: number) {
        return axiosClient.put(`/fields/${fieldId}`);
    },
    // Xóa sân
    deleteField(fieldId: number) {
        return axiosClient.delete(`/fields/${fieldId}`);
    }
}