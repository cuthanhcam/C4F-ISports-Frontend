import { useState } from "react";
import { fieldsAPI } from "../../../api/fields";
import { IoArrowBackOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
type TimeSlot = {
  startTime: string;
  endTime: string;
  pricePerSlot: number;
};

type PricingRule = {
  appliesToDays: string[];
  timeSlots: TimeSlot[];
};

type SubField = {
  subFieldName: string;
  fieldType: string;
  description: string;
  capacity: number;
  openTime: string;
  closeTime: string;
  defaultPricePerSlot: number;
  pricingRules: PricingRule[];
};

type Service = {
  serviceName: string;
  price: number;
  description: string;
};

type Amenity = {
  amenityName: string;
  description: string;
  iconUrl: string;
};

const CreateFields = () => {
    const [fieldData, setFieldData] = useState({
    fieldName: '',
    address: '',
    description: '',
    city: '',
    district: '',
    openTime: '',
    closeTime: '',
    averageRating: 0,
    sportId: 1,
    subFields: [] as SubField[],
    services: [] as Service[],
    amenities: [] as Amenity[],
    images: [] as string[],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFieldData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
        await fieldsAPI.createFields(fieldData);
    } catch (err) { 
        console.error(err);
    }
    // Gửi fieldData tới API backend
  };
  const navigate = useNavigate();
    return (
        
        <div className="container py-6">
            <button 
                onClick={() => navigate(-1)}
                className="text-surface-on flex items-center gap-2">
                <IoArrowBackOutline/>
                Quay lại
            </button>
            <h1 className="text-5xl text-surface-on font-medium text-center mb-16">Thêm sân mới</h1>
            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-xl space-y-4">
        <h2 className="text-2xl font-semibold">Thông tin sân thể thao</h2>

      <input
        type="text"
        name="fieldName"
        value={fieldData.fieldName}
        onChange={handleChange}
        placeholder="Tên sân"
        className="w-full p-2 border rounded"
      />

      <textarea
        name="description"
        value={fieldData.description}
        onChange={handleChange}
        placeholder="Mô tả"
        className="w-full p-2 border rounded"
      />

      <input
        type="text"
        name="address"
        value={fieldData.address}
        onChange={handleChange}
        placeholder="Địa chỉ"
        className="w-full p-2 border rounded"
      />

      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          name="city"
          value={fieldData.city}
          onChange={handleChange}
          placeholder="Thành phố"
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="district"
          value={fieldData.district}
          onChange={handleChange}
          placeholder="Quận/Huyện"
          className="p-2 border rounded"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <input
          type="time"
          name="openTime"
          value={fieldData.openTime}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          type="time"
          name="closeTime"
          value={fieldData.closeTime}
          onChange={handleChange}
          className="p-2 border rounded"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <input
          type="number"
          name="averageRating"
          value={fieldData.averageRating}
          onChange={handleChange}
          placeholder="Đánh giá trung bình"
          className="p-2 border rounded"
        />
        <input
          type="number"
          name="sportId"
          value={fieldData.sportId}
          onChange={handleChange}
          placeholder="Sport ID"
          className="p-2 border rounded"
        />
      </div>

      {/* Có thể render thêm SubFields, Services, Amenities tại đây nếu muốn */}
      {/* Tạm thời đơn giản hóa vì phần thêm danh sách sẽ cần nhiều state hơn */}

      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Lưu sân
      </button>
    </form>
        </div>
    )
}

export default CreateFields
