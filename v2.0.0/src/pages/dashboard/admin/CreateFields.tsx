import { useState } from "react";
import { fieldsAPI } from "../../../api/fields";
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Select from "react-select";

// Danh sách ngày hợp lệ
const VALID_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

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

type Image = {
  imageUrl: string;
  publicId: string;
  isPrimary: boolean;
  uploadedAt: string;
};

type FieldData = {
  fieldName: string;
  address: string;
  description: string;
  city: string;
  district: string;
  openTime: string;
  closeTime: string;
  averageRating: number;
  sportId: number;
  subFields: SubField[];
  services: Service[];
  amenities: Amenity[];
  images: Image[];
};

const CreateFields = () => {
  const navigate = useNavigate();

  const [fieldData, setFieldData] = useState<FieldData>({
    fieldName: "",
    address: "",
    description: "",
    city: "",
    district: "",
    openTime: "",
    closeTime: "",
    averageRating: 0,
    sportId: 1,
    subFields: [],
    services: [],
    amenities: [],
    images: [],
  });

  const [subField, setSubField] = useState<SubField>({
    subFieldName: "",
    fieldType: "",
    description: "",
    capacity: 0,
    openTime: "",
    closeTime: "",
    defaultPricePerSlot: 0,
    pricingRules: [],
  });

  const [pricingRule, setPricingRule] = useState<PricingRule>({
    appliesToDays: [],
    timeSlots: [],
  });

  const [timeSlot, setTimeSlot] = useState<TimeSlot>({
    startTime: "",
    endTime: "",
    pricePerSlot: 0,
  });

  const [service, setService] = useState<Service>({
    serviceName: "",
    price: 0,
    description: "",
  });

  const [amenity, setAmenity] = useState<Amenity>({
    amenityName: "",
    description: "",
    iconUrl: "",
  });

  const [image, setImage] = useState<Image>({
    imageUrl: "",
    publicId: "",
    isPrimary: false,
    uploadedAt: new Date().toISOString(),
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFieldData((prev) => ({
      ...prev,
      [name]:
        name === "averageRating" || name === "sportId"
          ? Number(value)
          : value,
    }));
  };

  const handleAddTimeSlot = () => {
    if (!timeSlot.startTime || !timeSlot.endTime || timeSlot.pricePerSlot <= 0) {
      toast.error("Vui lòng điền đầy đủ thông tin khung giờ!");
      return;
    }
    if (timeSlot.startTime >= timeSlot.endTime) {
      toast.error("Giờ bắt đầu phải sớm hơn giờ kết thúc!");
      return;
    }
    setPricingRule((prev) => ({
      ...prev,
      timeSlots: [...prev.timeSlots, timeSlot],
    }));
    setTimeSlot({ startTime: "", endTime: "", pricePerSlot: 0 });
  };

  const handleAddPricingRule = () => {
    if (pricingRule.timeSlots.length === 0) {
      toast.error("Vui lòng thêm ít nhất một khung giờ!");
      return;
    }
    if (pricingRule.appliesToDays.length === 0) {
      toast.error("Vui lòng chọn ít nhất một ngày áp dụng!");
      return;
    }
    if (
      !pricingRule.appliesToDays.every((day) => VALID_DAYS.includes(day.trim()))
    ) {
      toast.error("Ngày áp dụng không hợp lệ! Vui lòng chọn: " + VALID_DAYS.join(", "));
      return;
    }
    setSubField((prev) => ({
      ...prev,
      pricingRules: [...prev.pricingRules, pricingRule],
    }));
    setPricingRule({ appliesToDays: [], timeSlots: [] });
  };

  const handleAddSubField = () => {
    if (!subField.subFieldName.trim()) {
      toast.error("Tên sân con không được để trống!");
      return;
    }
    if (subField.pricingRules.length === 0) {
      toast.error("Vui lòng thêm ít nhất một quy tắc giá!");
      return;
    }
    if (!subField.openTime || !subField.closeTime) {
      toast.error("Vui lòng điền giờ mở và đóng cửa cho sân con!");
      return;
    }
    if (subField.openTime >= subField.closeTime) {
      toast.error("Giờ mở cửa phải sớm hơn giờ đóng cửa!");
      return;
    }
    setFieldData((prev) => ({
      ...prev,
      subFields: [...prev.subFields, subField],
    }));
    setSubField({
      subFieldName: "",
      fieldType: "",
      description: "",
      capacity: 0,
      openTime: "",
      closeTime: "",
      defaultPricePerSlot: 0,
      pricingRules: [],
    });
    setPricingRule({ appliesToDays: [], timeSlots: [] });
  };

  const handleAddService = () => {
    if (!service.serviceName.trim()) {
      toast.error("Tên dịch vụ không được để trống!");
      return;
    }
    setFieldData((prev) => ({
      ...prev,
      services: [...prev.services, service],
    }));
    setService({ serviceName: "", price: 0, description: "" });
  };

  const handleAddAmenity = () => {
    if (!amenity.amenityName.trim()) {
      toast.error("Tên tiện ích không được để trống!");
      return;
    }
    if (amenity.iconUrl && !amenity.iconUrl.match(/^(https?:\/\/.*\.(?:png|jpg|jpeg|gif))$/i)) {
      toast.error("URL icon phải là định dạng hợp lệ (png, jpg, jpeg, gif) hoặc để trống!");
      return;
    }
    setFieldData((prev) => ({
      ...prev,
      amenities: [...prev.amenities, amenity],
    }));
    setAmenity({ amenityName: "", description: "", iconUrl: "" });
  };

  const handleAddImage = () => {
    if (!image.imageUrl.trim()) {
      toast.error("URL ảnh không được để trống!");
      return;
    }
    if (!image.imageUrl.match(/^(https?:\/\/.*\.(?:png|jpg|jpeg|gif))$/i)) {
      toast.error("URL ảnh phải là định dạng hợp lệ (png, jpg, jpeg, gif)!");
      return;
    }
    setFieldData((prev) => ({
      ...prev,
      images: [
        ...prev.images,
        {
          ...image,
          publicId: `image_${prev.images.length + 1}`,
          isPrimary: prev.images.length === 0,
          uploadedAt: new Date().toISOString(),
        },
      ],
    }));
    setImage({ imageUrl: "", publicId: "", isPrimary: false, uploadedAt: new Date().toISOString() });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!fieldData.fieldName.trim()) {
      toast.error("Tên sân không được để trống!");
      return;
    }
    if (!fieldData.address.trim()) {
      toast.error("Địa chỉ không được để trống!");
      return;
    }
    if (!fieldData.city.trim() || !fieldData.district.trim()) {
      toast.error("Thành phố và quận/huyện không được để trống!");
      return;
    }
    if (!fieldData.openTime || !fieldData.closeTime) {
      toast.error("Giờ mở và đóng cửa không được để trống!");
      return;
    }
    if (fieldData.openTime >= fieldData.closeTime) {
      toast.error("Giờ mở cửa phải sớm hơn giờ đóng cửa!");
      return;
    }
    if (fieldData.subFields.length === 0) {
      toast.error("Vui lòng thêm ít nhất một sân con!");
      return;
    }
    if (fieldData.sportId <= 0) {
      toast.error("Sport ID phải là số dương!");
      return;
    }
    if (fieldData.images.some((img) => !img.imageUrl.trim())) {
      toast.error("Tất cả URL ảnh phải hợp lệ!");
      return;
    }

    // Gửi fieldData trực tiếp, không bao bọc trong createFieldDto
    const payload = fieldData;
    console.log("Dữ liệu gửi lên:", JSON.stringify(payload, null, 2));

    try {
      await fieldsAPI.createFields(payload);
      toast.success("Thêm sân thành công!");
      navigate(-1);
    } catch (err: any) {
      const errors = err.response?.data?.errors;
      if (errors) {
        if (typeof errors === "object") {
          Object.entries(errors).forEach(([key, messages]: [string, any]) => {
            if (Array.isArray(messages)) {
              messages.forEach((msg: string) => toast.error(`${key}: ${msg}`));
            } else {
              toast.error(`${key}: ${messages}`);
            }
          });
        } else if (Array.isArray(errors)) {
          errors.forEach((error: string) => toast.error(error));
        } else {
          toast.error(err.response?.data?.message || err.message || "Lỗi không xác định");
        }
      } else {
        toast.error(err.response?.data?.message || err.message || "Lỗi không xác định");
      }
      console.error("Chi tiết lỗi:", err.response?.data || err);
    }
  };

  const dayOptions = VALID_DAYS.map((day) => ({ value: day, label: day }));

  return (
    <div className="container py-6">
      <button
        onClick={() => navigate(-1)}
        className="text-surface-on flex items-center gap-2 mb-6"
      >
        <IoArrowBackOutline />
        Quay lại
      </button>

      <h1 className="text-5xl text-surface-on font-medium text-center mb-16">
        Thêm sân mới
      </h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-xl space-y-6"
      >
        <h2 className="text-2xl font-semibold">Thông tin sân thể thao</h2>
        <input
          type="text"
          name="fieldName"
          value={fieldData.fieldName}
          onChange={handleChange}
          placeholder="Tên sân"
          className="w-full p-2 border rounded"
          required
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
          required
        />
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="city"
            value={fieldData.city}
            onChange={handleChange}
            placeholder="Thành phố"
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            name="district"
            value={fieldData.district}
            onChange={handleChange}
            placeholder="Quận/Huyện"
            className="p-2 border rounded"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="time"
            name="openTime"
            value={fieldData.openTime}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />
          <input
            type="time"
            name="closeTime"
            value={fieldData.closeTime}
            onChange={handleChange}
            className="p-2 border rounded"
            required
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
            step="0.1"
            min="0"
            max="5"
          />
          <input
            type="number"
            name="sportId"
            value={fieldData.sportId}
            onChange={handleChange}
            placeholder="Sport ID"
            className="p-2 border rounded"
            required
          />
        </div>

        <h2 className="text-xl font-semibold mt-6">Sân con</h2>
        <input
          type="text"
          name="subFieldName"
          value={subField.subFieldName}
          onChange={(e) => setSubField({ ...subField, subFieldName: e.target.value })}
          placeholder="Tên sân con"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="fieldType"
          value={subField.fieldType}
          onChange={(e) => setSubField({ ...subField, fieldType: e.target.value })}
          placeholder="Loại sân (ví dụ: 5-a-side)"
          className="w-full p-2 border rounded"
        />
        <textarea
          name="description"
          value={subField.description}
          onChange={(e) => setSubField({ ...subField, description: e.target.value })}
          placeholder="Mô tả sân con"
          className="w-full p-2 border rounded"
        />
        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            name="capacity"
            value={subField.capacity}
            onChange={(e) => setSubField({ ...subField, capacity: Number(e.target.value) })}
            placeholder="Sức chứa"
            className="p-2 border rounded"
            min="0"
          />
          <input
            type="number"
            name="defaultPricePerSlot"
            value={subField.defaultPricePerSlot}
            onChange={(e) =>
              setSubField({ ...subField, defaultPricePerSlot: Number(e.target.value) })
            }
            placeholder="Giá mặc định mỗi khung giờ"
            className="p-2 border rounded"
            min="0"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="time"
            name="openTime"
            value={subField.openTime}
            onChange={(e) => setSubField({ ...subField, openTime: e.target.value })}
            className="p-2 border rounded"
          />
          <input
            type="time"
            name="closeTime"
            value={subField.closeTime}
            onChange={(e) => setSubField({ ...subField, closeTime: e.target.value })}
            className="p-2 border rounded"
          />
        </div>

        <h3 className="text-lg font-semibold mt-4">Quy tắc giá</h3>
        <Select
          isMulti
          options={dayOptions}
          value={pricingRule.appliesToDays.map((day) => ({ value: day, label: day }))}
          onChange={(selected) =>
            setPricingRule({
              ...pricingRule,
              appliesToDays: selected.map((option) => option.value),
            })
          }
          placeholder="Chọn ngày áp dụng"
          className="mb-2"
        />
        <div className="grid grid-cols-3 gap-4">
          <input
            type="time"
            value={timeSlot.startTime}
            onChange={(e) => setTimeSlot({ ...timeSlot, startTime: e.target.value })}
            placeholder="Giờ bắt đầu"
            className="p-2 border rounded"
          />
          <input
            type="time"
            value={timeSlot.endTime}
            onChange={(e) => setTimeSlot({ ...timeSlot, endTime: e.target.value })}
            placeholder="Giờ kết thúc"
            className="p-2 border rounded"
          />
          <input
            type="number"
            value={timeSlot.pricePerSlot}
            onChange={(e) =>
              setTimeSlot({ ...timeSlot, pricePerSlot: Number(e.target.value) })
            }
            placeholder="Giá mỗi khung giờ"
            className="p-2 border rounded"
            min="0"
          />
        </div>
        <button
          type="button"
          onClick={handleAddTimeSlot}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Thêm khung giờ
        </button>
        {pricingRule.timeSlots.length > 0 && (
          <ul className="mt-2 list-disc list-inside text-gray-700">
            {pricingRule.timeSlots.map((ts, idx) => (
              <li key={idx}>
                {ts.startTime} - {ts.endTime}: {ts.pricePerSlot} VNĐ
              </li>
            ))}
          </ul>
        )}
        <button
          type="button"
          onClick={handleAddPricingRule}
          className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Thêm quy tắc giá
        </button>
        {subField.pricingRules.length > 0 && (
          <ul className="mt-2 list-disc list-inside text-gray-700">
            {subField.pricingRules.map((pr, idx) => (
              <li key={idx}>
                Ngày: {pr.appliesToDays.join(", ")}
                <ul className="ml-4 list-circle">
                  {pr.timeSlots.map((ts, tsIdx) => (
                    <li key={tsIdx}>
                      {ts.startTime} - {ts.endTime}: {ts.pricePerSlot} VNĐ
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
        <button
          type="button"
          onClick={handleAddSubField}
          className="mt-4 bg-green text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Thêm sân con
        </button>
        {fieldData.subFields.length > 0 && (
          <ul className="mt-2 list-disc list-inside text-gray-700">
            {fieldData.subFields.map((sf, idx) => (
              <li key={idx}>
                {sf.subFieldName} ({sf.fieldType})
                <br />
                <small>{sf.description}</small>
              </li>
            ))}
          </ul>
        )}

        <h2 className="text-xl font-semibold mt-6">Dịch vụ</h2>
        <input
          type="text"
          name="serviceName"
          value={service.serviceName}
          onChange={(e) => setService({ ...service, serviceName: e.target.value })}
          placeholder="Tên dịch vụ"
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="number"
          name="price"
          value={service.price}
          onChange={(e) => setService({ ...service, price: Number(e.target.value) })}
          placeholder="Giá dịch vụ"
          className="w-full p-2 border rounded mb-2"
          min="0"
        />
        <textarea
          name="description"
          value={service.description}
          onChange={(e) => setService({ ...service, description: e.target.value })}
          placeholder="Mô tả dịch vụ"
          className="w-full p-2 border rounded mb-2"
        />
        <button
          type="button"
          onClick={handleAddService}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Thêm dịch vụ
        </button>
        {fieldData.services.length > 0 && (
          <ul className="mt-2 list-disc list-inside text-gray-700">
            {fieldData.services.map((s, idx) => (
              <li key={idx}>
                {s.serviceName} - {s.price} VNĐ
                <br />
                <small>{s.description}</small>
              </li>
            ))}
          </ul>
        )}

        <h2 className="text-xl font-semibold mt-6">Tiện ích</h2>
        <input
          type="text"
          name="amenityName"
          value={amenity.amenityName}
          onChange={(e) => setAmenity({ ...amenity, amenityName: e.target.value })}
          placeholder="Tên tiện ích"
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="text"
          name="iconUrl"
          value={amenity.iconUrl}
          onChange={(e) => setAmenity({ ...amenity, iconUrl: e.target.value })}
          placeholder="URL icon (không bắt buộc)"
          className="w-full p-2 border rounded mb-2"
        />
        <textarea
          name="description"
          value={amenity.description}
          onChange={(e) => setAmenity({ ...amenity, description: e.target.value })}
          placeholder="Mô tả tiện ích"
          className="w-full p-2 border rounded mb-2"
        />
        <button
          type="button"
          onClick={handleAddAmenity}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Thêm tiện ích
        </button>
        {fieldData.amenities.length > 0 && (
          <ul className="mt-2 list-disc list-inside text-gray-700">
            {fieldData.amenities.map((a, idx) => (
              <li key={idx}>
                {a.iconUrl && <img src={a.iconUrl} alt={a.amenityName} className="inline-block w-5 h-5 mr-2" />}
                {a.amenityName}
                <br />
                <small>{a.description}</small>
              </li>
            ))}
          </ul>
        )}

        <h2 className="text-xl font-semibold mt-6">Ảnh (không bắt buộc)</h2>
        <input
          type="text"
          name="imageUrl"
          value={image.imageUrl}
          onChange={(e) => setImage({ ...image, imageUrl: e.target.value })}
          placeholder="URL ảnh (png, jpg, jpeg, gif)"
          className="w-full p-2 border rounded mb-2"
        />
        <button
          type="button"
          onClick={handleAddImage}
          className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
        >
          Thêm ảnh
        </button>
        {fieldData.images.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-3">
            {fieldData.images.map((img, idx) => (
              <div key={idx} className="relative">
                <img
                  src={img.imageUrl}
                  alt={`Ảnh ${idx + 1}`}
                  className="w-24 h-24 object-cover rounded"
                />
                {img.isPrimary && (
                  <span className="absolute top-0 right-0 bg-green-500 text-white text-xs px-1 rounded">
                    Chính
                  </span> 
                )}
              </div>
            ))}
          </div>
        )}

        <details className="mt-4">
          <summary className="cursor-pointer text-lg font-semibold">Xem trước dữ liệu</summary>
          <pre className="bg-gray-100 p-4 rounded text-sm">
            {JSON.stringify(fieldData, null, 2)}
          </pre>
        </details>

        <button
          type="submit"
          className="mt-8 w-full bg-indigo-600 text-white py-3 rounded text-xl hover:bg-indigo-700"
        >
          Thêm sân
        </button>
      </form>
    </div>
  );
};

export default CreateFields;
