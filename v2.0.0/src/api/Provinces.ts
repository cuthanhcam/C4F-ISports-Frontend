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
    return axios.get<Province[]>('https://provinces.open-api.vn/api/p/').then((response) => {
      const processedData = response.data.map((province: Province) => ({
        ...province,
        shortName: province.name.replace(/^(Thành phố|Tỉnh)\s+/, ''), // Loại bỏ "Thành phố" hoặc "Tỉnh"
      }));
      return { ...response, data: processedData };
    });
  },
   // Lấy thông tin Quận Huyện
  // Lấy thông tin Quận Huyện
  ProvinceDistrict(cityId: number) {
    return axios.get<{ name: string; code: number; districts: District[] }>(
      `https://provinces.open-api.vn/api/p/${cityId}?depth=2`
    );
  },
}