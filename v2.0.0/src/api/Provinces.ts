import axios from "axios"


export interface Province {
  code: number;
  name: string;
  division_type: string;
  codename: string;
  phone_code: number;
  districts?: District[];
}

export interface District {
  code: number;
  name: string;
  division_type: string;
  codename: string;
  province_code: number;
}



export const ProvincesAPI = {
    // Lấy thông tin Tỉnh Thành
    ProvinceCity() {
        return axios.get('https://provinces.open-api.vn/api/p/');
    },
    // Lấy thông tin Quận Huyện
    ProvinceDistrict(cityId: number) {
        return axios.get(`https://provinces.open-api.vn/api/p/${cityId}?depth=2`);
    }
}