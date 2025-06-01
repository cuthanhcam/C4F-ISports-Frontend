import axiosClient from "./axiosClient"

export const fieldsAPI = {
    // Lấy thông tin tất cả các sân.
    getFields(params?: { page?: number; pageSize?: number; city: string; district: string}) {
        return axiosClient.get('fields', { params });
    },
    // Lấy thông tin chi tiết 1 sân.
    getFieldsDetail(FieldId: number) {
        return axiosClient.get(`fields/${FieldId}`);
    }
    //
}