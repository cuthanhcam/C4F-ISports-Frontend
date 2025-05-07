import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";

interface Slot {
  startTime: string;
  endTime: string;
  status: string;
}

interface SubField {
  subFieldId: number;
  name: string;
  pricePerHour: number;
  slots: Slot[];
}

interface FieldData {
  fieldId: number;
  fieldName: string;
  openHours: string;
  subFields: SubField[];
}

interface Service {
  serviceId: number;
  name: string;
  price: number;
}

const services: Service[] = [
  { serviceId: 0, name: "Thuê giày", price: 50000 },
  { serviceId: 1, name: "Thuê vợt", price: 30000 },
];

const FieldBooking = () => {
  const { id } = useParams();
  const [fieldData, setFieldData] = useState<FieldData | null>(null);
  const [selectedSlots, setSelectedSlots] = useState<Record<number, Slot[]>>({});
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const [bookingDate, setBookingDate] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/field/${id}/availability`)
      .then((response) => {
        setFieldData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching field data:", err);
        setError("Không thể tải dữ liệu sân. Vui lòng thử lại!");
        setLoading(false);
      });
  }, [id]);

  const toggleSlotSelection = (subFieldId: number, slot: Slot) => {
    if (slot.status !== "Available") return;
  
    setSelectedSlots((prev) => {
      const updatedSlots = { ...prev };
      const existingSlots = updatedSlots[subFieldId] ? [...updatedSlots[subFieldId]] : [];
  
      const exists = existingSlots.some(
        (s) => s.startTime === slot.startTime && s.endTime === slot.endTime
      );
  
      if (exists) {
        updatedSlots[subFieldId] = existingSlots.filter(
          (s) => s.startTime !== slot.startTime || s.endTime !== slot.endTime
        );
      } else {
        updatedSlots[subFieldId] = [...existingSlots, slot];
      }
  
      return updatedSlots;
    });
  };

  const toggleServiceSelection = (serviceId: number) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId) ? prev.filter((id) => id !== serviceId) : [...prev, serviceId]
    );
  };

  const handleBooking = async () => {
    if (!bookingDate) {
      alert("Vui lòng chọn ngày đặt sân!");
      return;
    }

    if (Object.values(selectedSlots).every((slots) => slots.length === 0)) {
      alert("Vui lòng chọn ít nhất một khung giờ!");
      return;
    }

    const bookingData = {
      subFields: Object.entries(selectedSlots)
        .filter(([_, slots]) => slots.length > 0)
        .map(([subFieldId, slots]) => ({
          subFieldId: Number(subFieldId),
          timeSlots: slots.map(({ startTime, endTime }) => ({ startTime, endTime })),
        })),
      bookingDate,
      serviceIds: selectedServices,
    };

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/booking`, bookingData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
      });

      alert("Đặt sân thành công!");

      setFieldData((prev) => {
        if (!prev) return prev;

        return {
          ...prev,
          subFields: prev.subFields.map((subField) => ({
            ...subField,
            slots: subField.slots.map((slot) => {
              const isBooked = selectedSlots[subField.subFieldId]?.some(
                (s) => s.startTime === slot.startTime && s.endTime === slot.endTime
              );
              return isBooked ? { ...slot, status: "Booked" } : slot;
            }),
          })),
        };
      });

      setSelectedSlots({});
      setSelectedServices([]);
    } catch (error: any) {
      console.error("Booking failed:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Đặt sân thất bại. Vui lòng thử lại!");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!fieldData) return null;

  return (
    <div className="h-fit pt-24">
      <div className="p-4 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-2">{fieldData.fieldName}</h2>
        <p className="text-gray-600">Giờ mở cửa: {fieldData.openHours}</p>
        <input
          type="date"
          value={bookingDate}
          onChange={(e) => setBookingDate(e.target.value)}
          className="border p-2 rounded-md mt-4"
        />
        <h3 className="text-xl font-semibold mt-4">Sân con</h3>
        {fieldData.subFields.map((subField) => (
          <div key={subField.subFieldId} className="border p-3 rounded-md shadow mt-3">
            <h4 className="text-lg font-semibold">{subField.name}</h4>
            <p className="text-gray-600">Giá: {subField.pricePerHour.toLocaleString()}đ/giờ</p>
            <h4 className="font-semibold mt-2">Khung giờ trống:</h4>
            <div className="grid grid-cols-3 gap-3 mt-2">
              {subField.slots.map((slot) => {
                const isSelected = selectedSlots[subField.subFieldId]?.some(
                  (s) => s.startTime === slot.startTime && s.endTime === slot.endTime
                );
                const isBooked = slot.status === "Booked";

                return (
                  <button
                    key={`${subField.subFieldId}-${slot.startTime}-${slot.endTime}`}
                    className={`p-2 border rounded-md text-sm transition-all
                      ${isBooked ? "bg-gray-300 text-gray-500 cursor-not-allowed" : isSelected
                        ? "bg-blue-500 text-white"
                        : "bg-green-200 hover:bg-green-300"
                      }`}
                    onClick={() => !isBooked && toggleSlotSelection(subField.subFieldId, slot)}
                    disabled={isBooked}
                  >
                    {slot.startTime} - {slot.endTime}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
        
        <h3 className="text-xl font-semibold mt-6">Chọn dịch vụ</h3>
        <div className="flex flex-wrap gap-3 mt-2">
          {services.map((service) => (
            <button
              key={service.serviceId}
              className={`p-2 border rounded-md text-sm transition-all
                ${selectedServices.includes(service.serviceId) ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
              onClick={() => toggleServiceSelection(service.serviceId)}
            >
              {service.name} ({service.price.toLocaleString()}đ)
            </button>
          ))}
        </div>

        <button onClick={handleBooking} className="mt-6 px-6 py-2 rounded-md bg-blue-500 text-white">
          Xác nhận đặt sân
        </button>
      </div>
    </div>
  );
};

export default FieldBooking;
