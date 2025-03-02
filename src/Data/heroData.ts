import { heroSearchChiocePlayType, heroSearchCityType, heroSearchDistrictType, heroType } from "../Types/heroType";
import { CustomIcons } from "../Components/Icons/Icon";
export const heroData: heroType[] = [
    { id: 1, name: "Bóng đá" },
    { id: 2, name: "Cầu lông" },
    { id: 3, name: "Bóng rổ" },
    { id: 4, name: "Bóng chuyền" },
];


export const heroSearchCityData: heroSearchCityType[] = [
    { id: 1, nameCity: "TP Hồ Chí Minh"},
    { id: 2, nameCity: "TP Phan Thiết"},
    { id: 3, nameCity: "TP Đà Lạt"},
    { id: 4, nameCity: "TP Quảng Ngãi"},
];

export const heroSearchDistrict: heroSearchDistrictType[] = [
    { id: 1, nameDistrict: "Quận Thủ Đức"},
    { id: 2, nameDistrict: "Quận 1"},
    { id: 3, nameDistrict: "Quận 2"},
    { id: 4, nameDistrict: "Quận 3"},
    { id: 5, nameDistrict: "Quận 4"},
    { id: 6, nameDistrict: "Quận 5"},
    { id: 7, nameDistrict: "Quận 6"},
    { id: 8, nameDistrict: "Quận 7"},
    { id: 9, nameDistrict: "Quận 8"},
    { id: 10, nameDistrict: "Quận 9"},
    { id: 11, nameDistrict: "Quận 10"},
    { id: 12, nameDistrict: "Quận 11"},
    { id: 13, nameDistrict: "Quận 12"},
    { id: 14, nameDistrict: "Quận Bình Tân"},
    { id: 15, nameDistrict: "Quận Bình Thạnh"},
    { id: 16, nameDistrict: "Quận Gò Vấp"},
    { id: 17, nameDistrict: "Quận Phú Nhuận "},
    { id: 18, nameDistrict: "Quận Tân Bình"},
    { id: 19, nameDistrict: "Quận Tân Phú"},
    { id: 20, nameDistrict: "Quận Bình Chánh"},
    { id: 21, nameDistrict: "Quận Cần Giờ"},
    { id: 22, nameDistrict: "Quận Củ Chi"},
    { id: 23, nameDistrict: "Quận Hóc Môn"},
    { id: 24, nameDistrict: "Quận Nhà Bè "},
];


export const heroSearchChoicePlayData: heroSearchChiocePlayType[] = [
    { id: 1, image: CustomIcons.Badminton, name: "Badminton" },
    { id: 2, image: CustomIcons.Basketball, name: "Basketball" },
    { id: 3, image: CustomIcons.Sccoser, name: "Sccoser"},
    { id: 4, image: CustomIcons.Volleyball, name: "Volleyball" },
];