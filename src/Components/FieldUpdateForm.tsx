import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const FieldUpdateForm = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    fieldName: "",
    address: "",
    phone: "",
    openHours: "",
    description: "",
    status: "Active",
    amenities: [{ name: "", description: "" }],
    services: [{ serviceName: "", price: 0, description: "" }],
    subFields: [{ subFieldName: "", size: "", pricePerHour: 0, status: "Active" }],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFieldData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/field/${id}`);
        const serverData = response.data;
        setFormData({
          fieldName: serverData.fieldName || "",
          address: serverData.address || "",
          phone: serverData.phone || "",
          openHours: serverData.openHours || "",
          description: serverData.description || "",
          status: serverData.status || "Active",
          amenities: serverData.amenities?.length
            ? serverData.amenities.map(a => ({ name: a.amenityName, description: a.description }))
            : [{ name: "", description: "" }],
          services: serverData.services?.length
            ? serverData.services.map(s => ({ serviceName: s.name, price: s.price, description: s.description }))
            : [{ serviceName: "", price: 0, description: "" }],
          subFields: serverData.subFields?.length
            ? serverData.subFields.map(sf => ({
                subFieldName: sf.name,
                size: sf.size,
                pricePerHour: sf.pricePerHour,
                status: sf.status
              }))
            : [{ subFieldName: "", size: "", pricePerHour: 0, status: "Active" }],
        });
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchFieldData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAmenityChange = (index, e) => {
    const { name, value } = e.target;
    const updatedAmenities = [...formData.amenities];
    updatedAmenities[index][name] = value;
    setFormData((prev) => ({
      ...prev,
      amenities: updatedAmenities,
    }));
  };

  const handleServiceChange = (index, e) => {
    const { name, value } = e.target;
    const updatedServices = [...formData.services];
    updatedServices[index][name] = name === "price" ? Number(value) : value;
    setFormData((prev) => ({
      ...prev,
      services: updatedServices,
    }));
  };

  const handleSubFieldChange = (index, e) => {
    const { name, value } = e.target;
    const updatedSubFields = [...formData.subFields];
    updatedSubFields[index][name] = name === "pricePerHour" ? Number(value) : value;
    setFormData((prev) => ({
      ...prev,
      subFields: updatedSubFields,
    }));
  };

  const addAmenity = () => {
    setFormData((prev) => ({
      ...prev,
      amenities: [...prev.amenities, { name: "", description: "" }],
    }));
  };

  const removeAmenity = (index) => {
    const updatedAmenities = formData.amenities.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      amenities: updatedAmenities,
    }));
  };

  const addService = () => {
    setFormData((prev) => ({
      ...prev,
      services: [...prev.services, { serviceName: "", price: 0, description: "" }],
    }));
  };

  const removeService = (index) => {
    const updatedServices = formData.services.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      services: updatedServices,
    }));
  };

  const addSubField = () => {
    setFormData((prev) => ({
      ...prev,
      subFields: [...prev.subFields, { subFieldName: "", size: "", pricePerHour: 0, status: "Active" }],
    }));
  };

  const removeSubField = (index) => {
    const updatedSubFields = formData.subFields.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      subFields: updatedSubFields,
    }));
  };

  const validateForm = () => {
    // Validate Field
    if (!formData.fieldName) return "Tên sân không được để trống";
    if (formData.fieldName.length > 100) return "Tên sân không được vượt quá 100 ký tự";
    if (!formData.address) return "Địa chỉ không được để trống";
    if (formData.address.length > 255) return "Địa chỉ không được vượt quá 255 ký tự";
    if (!formData.phone) return "Số điện thoại không được để trống";
    if (!/^\d{10}$/.test(formData.phone)) return "Số điện thoại phải là 10 chữ số";
    if (!formData.openHours) return "Giờ mở cửa không được để trống";
    if (formData.openHours.length > 100) return "Giờ mở cửa không được vượt quá 100 ký tự";
    if (formData.description && formData.description.length > 500) return "Mô tả không được vượt quá 500 ký tự";
    if (!["Active", "Inactive", "Maintenance"].includes(formData.status)) return "Trạng thái không hợp lệ";

    // Validate Amenities
    for (const amenity of formData.amenities) {
      if (!amenity.name) return "Tên tiện ích không được để trống";
      if (amenity.name.length > 100) return "Tên tiện ích không được vượt quá 100 ký tự";
      if (amenity.description && amenity.description.length > 200) return "Mô tả tiện ích không được vượt quá 200 ký tự";
    }

    // Validate Services
    for (const service of formData.services) {
      if (!service.serviceName) return "Tên dịch vụ không được để trống";
      if (service.serviceName.length > 100) return "Tên dịch vụ không được vượt quá 100 ký tự";
      if (service.price < 0 || service.price > 10000000) return "Giá dịch vụ phải từ 0 đến 10 triệu";
      if (service.description && service.description.length > 200) return "Mô tả dịch vụ không được vượt quá 200 ký tự";
    }

    // Validate SubFields
    for (const subField of formData.subFields) {
      if (!subField.subFieldName) return "Tên sân nhỏ không được để trống";
      if (subField.subFieldName.length > 50) return "Tên sân nhỏ không được vượt quá 50 ký tự";
      if (!subField.size) return "Kích thước sân nhỏ không được để trống";
      if (subField.size.length > 20) return "Kích thước sân nhỏ không được vượt quá 20 ký tự";
      if (subField.pricePerHour < 0 || subField.pricePerHour > 10000000) return "Giá mỗi giờ phải từ 0 đến 10 triệu";
      if (!["Active", "Inactive", "Maintenance"].includes(subField.status)) return "Trạng thái sân nhỏ không hợp lệ";
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    const token = localStorage.getItem("accessToken");
    if (!token) {
      setError("Không tìm thấy token. Vui lòng đăng nhập lại!");
      return;
    }

    const payload = {
      fieldName: formData.fieldName,
      address: formData.address,
      phone: formData.phone,
      openHours: formData.openHours,
      description: formData.description || "",
      status: formData.status,
      amenities: formData.amenities,
      services: formData.services,
      subFields: formData.subFields,
    };

    try {
      console.log("Dữ liệu gửi đi:", JSON.stringify(payload, null, 2));
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/field/${id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Phản hồi từ server:", response.data);
      alert("Cập nhật thông tin sân thành công!");
    } catch (err) {
      console.error("Chi tiết lỗi:", {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
      });
      setError(err.response?.data?.message || "Có lỗi xảy ra khi cập nhật dữ liệu!");
    }
  };

  if (loading) return <div>Đang tải dữ liệu...</div>;
  if (error) return <div className="text-red-500">Lỗi: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Cập nhật thông tin sân</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Thông tin cơ bản */}
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-xl font-semibold mb-4">Thông tin chung</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Tên sân</label>
              <input
                type="text"
                name="fieldName"
                value={formData.fieldName}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
                maxLength={100}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Địa chỉ</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
                maxLength={255}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Số điện thoại</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
                maxLength={10}
                pattern="\d{10}"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Giờ mở cửa</label>
              <input
                type="text"
                name="openHours"
                value={formData.openHours}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
                maxLength={100}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Trạng thái</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="Active">Đang hoạt động</option>
                <option value="Inactive">Không hoạt động</option>
                <option value="Maintenance">Đang bảo trì</option>
              </select>
            </div>
            <div className="mb-4 md:col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">Mô tả</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
                maxLength={500}
              />
            </div>
          </div>
        </div>

        {/* Tiện ích */}
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Tiện ích</h2>
            <button
              type="button"
              onClick={addAmenity}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-sm"
            >
              Thêm tiện ích
            </button>
          </div>
          {formData.amenities.map((amenity, index) => (
            <div key={index} className="mb-4 p-4 border rounded">
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => removeAmenity(index)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Xóa
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Tên tiện ích</label>
                  <input
                    type="text"
                    name="name"
                    value={amenity.name}
                    onChange={(e) => handleAmenityChange(index, e)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                    maxLength={100}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Mô tả</label>
                  <input
                    type="text"
                    name="description"
                    value={amenity.description}
                    onChange={(e) => handleAmenityChange(index, e)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    maxLength={200}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dịch vụ */}
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Dịch vụ</h2>
            <button
              type="button"
              onClick={addService}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-sm"
            >
              Thêm dịch vụ
            </button>
          </div>
          {formData.services.map((service, index) => (
            <div key={index} className="mb-4 p-4 border rounded">
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => removeService(index)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Xóa
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Tên dịch vụ</label>
                  <input
                    type="text"
                    name="serviceName"
                    value={service.serviceName}
                    onChange={(e) => handleServiceChange(index, e)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                    maxLength={100}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Giá (VND)</label>
                  <input
                    type="number"
                    name="price"
                    value={service.price}
                    onChange={(e) => handleServiceChange(index, e)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                    min={0}
                    max={10000000}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Mô tả</label>
                  <input
                    type="text"
                    name="description"
                    value={service.description}
                    onChange={(e) => handleServiceChange(index, e)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    maxLength={200}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sân con */}
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Sân con</h2>
            <button
              type="button"
              onClick={addSubField}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-sm"
            >
              Thêm sân con
            </button>
          </div>
          {formData.subFields.map((subField, index) => (
            <div key={index} className="mb-4 p-4 border rounded">
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => removeSubField(index)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Xóa
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Tên sân con</label>
                  <input
                    type="text"
                    name="subFieldName"
                    value={subField.subFieldName}
                    onChange={(e) => handleSubFieldChange(index, e)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                    maxLength={50}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Kích thước</label>
                  <input
                    type="text"
                    name="size"
                    value={subField.size}
                    onChange={(e) => handleSubFieldChange(index, e)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                    maxLength={20}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Giá mỗi giờ (VND)</label>
                  <input
                    type="number"
                    name="pricePerHour"
                    value={subField.pricePerHour}
                    onChange={(e) => handleSubFieldChange(index, e)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                    min={0}
                    max={10000000}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Trạng thái</label>
                  <select
                    name="status"
                    value={subField.status}
                    onChange={(e) => handleSubFieldChange(index, e)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="Active">Hoạt động</option>
                    <option value="Inactive">Không hoạt động</option>
                    <option value="Maintenance">Bảo trì</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cập nhật thông tin sân
          </button>
        </div>
      </form>
    </div>
  );
};

export default FieldUpdateForm;