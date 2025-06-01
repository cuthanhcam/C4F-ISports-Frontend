import { useState } from "react";
import type { SportField, SubField, FieldService, TimeSlot, PricingRule } from "../../../constants/fields";
import { Calendar, Clock, MapPin, Star, Plus, Minus, ShoppingCart, CreditCard } from 'lucide-react';

interface FieldBookingSectionProps {
  fieldData: SportField;
}

const FieldBookingSection = ({ fieldData }: FieldBookingSectionProps) => {
    const today = new Date();
    const formattedToday = today.toISOString().split('T')[0];
    const [selectedDate, setSelectedDate] = useState<string>(formattedToday);
    const [selectedSlots, setSelectedSlots] = useState<Set<string>>(new Set());
    const [selectedServices, setSelectedServices] = useState<Record<number, number>>({});
    const [showPayment, setShowPayment] = useState<boolean>(false);

  // Generate time slots based on subfield open and close times
  const generateTimeSlots = (openTime: string, closeTime: string): string[] => {
    const slots: string[] = [];
    const [openHour, openMinute] = openTime.split(":").map(Number);
    const [closeHour, closeMinute] = closeTime.split(":").map(Number);
    const startMinutes = openHour * 60 + openMinute;
    const endMinutes = closeHour * 60 + closeMinute;

    let currentMinutes = startMinutes;
    while (currentMinutes < endMinutes) {
      const hours = Math.floor(currentMinutes / 60);
      const minutes = currentMinutes % 60;
      slots.push(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`);
      currentMinutes += 30; // 30-minute increments
    }
    return slots;
  };

  // Get unique time slots across all subfields
  const timeSlots = fieldData.subFields.reduce((slots, subField) => {
    if (subField.status === 'Active') {
      const subFieldSlots = generateTimeSlots(subField.openTime, subField.closeTime);
      return [...new Set([...slots, ...subFieldSlots])].sort();
    }
    return slots;
  }, [] as string[]);

  // Get slot availability and price based on PricingRule
  const getSlotAvailability = (subField: SubField, timeSlot: string, selectedDate: string) => {
    const dayOfWeek = new Date(selectedDate).toLocaleString('en-US', { weekday: 'long' });
    const [slotHour, slotMinute] = timeSlot.split(":").map(Number);
    const slotMinutes = slotHour * 60 + slotMinute;

    // Check if subfield is active
    const isAvailable = subField.status === 'Active';
    if (!isAvailable) {
      return { isAvailable: false, isSelected: false, price: 0 };
    }

    // Find applicable pricing rule
    const pricingRule = subField.pricingRules.find(rule => rule.appliesToDays.includes(dayOfWeek));
    const defaultPrice = subField.defaultPricePerSlot;

    let price = defaultPrice;
    if (pricingRule) {
      const timeSlotMatch = pricingRule.timeSlots.find(slot => {
        const [startHour, startMinute] = slot.startTime.split(":").map(Number);
        const [endHour, endMinute] = slot.endTime.split(":").map(Number);
        const startMinutes = startHour * 60 + startMinute;
        const endMinutes = endHour * 60 + endMinute;
        return slotMinutes >= startMinutes && slotMinutes < endMinutes;
      });
      if (timeSlotMatch) {
        price = timeSlotMatch.pricePerSlot;
      }
    }

    const isSelected = selectedSlots.has(`${subField.subFieldId}-${timeSlot}`);

    return { isAvailable, isSelected, price };
  };

  const handleSlotClick = (subFieldId: number, timeSlot: string) => {
    const slotKey = `${subFieldId}-${timeSlot}`;
    const subField = fieldData.subFields.find(sf => sf.subFieldId === subFieldId);
    if (!subField) return;

    const { isAvailable } = getSlotAvailability(subField, timeSlot, selectedDate);
    if (!isAvailable) return;

    const newSelected = new Set(selectedSlots);
    if (newSelected.has(slotKey)) {
      newSelected.delete(slotKey);
    } else {
      newSelected.add(slotKey);
    }
    setSelectedSlots(newSelected);
  };

  const handleServiceQuantityChange = (serviceId: number, delta: number) => {
    setSelectedServices(prev => ({
      ...prev,
      [serviceId]: Math.max(0, (prev[serviceId] || 0) + delta)
    }));
  };

  const calculateTotal = (): number => {
    let total = 0;

    selectedSlots.forEach(slotKey => {
      const [subFieldId, timeSlot] = slotKey.split('-');
      const subField = fieldData.subFields.find(sf => sf.subFieldId === parseInt(subFieldId));
      if (subField) {
        const { price } = getSlotAvailability(subField, timeSlot, selectedDate);
        total += price;
      }
    });

    fieldData.services.forEach(service => {
      const quantity = selectedServices[service.fieldServiceId] || 0;
      if (quantity > 0 && service.isActive) {
        total += service.price * quantity;
      }
    });

    return total;
  };

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const getSlotStyle = (subField: SubField, timeSlot: string): string => {
    const { isAvailable, isSelected } = getSlotAvailability(subField, timeSlot, selectedDate);

    if (!isAvailable) {
      return 'bg-red-100 border-red-200 cursor-not-allowed opacity-50';
    }
    if (isSelected) {
      return 'bg-blue-500 border-blue-600 text-white cursor-pointer transform scale-105 shadow-lg';
    }
    return 'bg-green-100 border-green-300 hover:bg-green-200 hover:border-green-400 cursor-pointer transition-all duration-200 hover:scale-105';
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-white shadow-lg border-b mb-6">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">{fieldData.fieldName}</h1>
                <div className="flex items-center gap-4 mt-2 text-gray-600">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{fieldData.address}, {fieldData.city}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{fieldData.averageRating.toFixed(1)}/5</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-gray-500" />
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          <div className="xl:col-span-3">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex items-center gap-2 mb-6">
                <Clock className="w-5 h-5 text-blue-500" />
                <h2 className="text-xl font-semibold text-gray-800">Chọn thời gian đặt sân</h2>
              </div>
              <div className="flex items-center gap-6 mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-100 border-2 border-green-300 rounded"></div>
                  <span className="text-sm text-gray-600">Trống</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-500 border-2 border-blue-600 rounded"></div>
                  <span className="text-sm text-gray-600">Đã chọn</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-rose-500 border-2 border-rose-500 rounded opacity-50"></div>
                  <span className="text-sm text-gray-600">Đã đặt</span>
                </div>
              </div>
              <div className="overflow-x-auto">
                <div className="inline-block min-w-full">
                  <div className="flex border-b-2 border-gray-200 pb-2 mb-4">
                    <div className="w-32 flex-shrink-0"></div>
                    {timeSlots.map(slot => (
                      <div key={slot} className="w-16 text-center text-xs font-medium text-gray-600 px-1">
                        {slot}
                      </div>
                    ))}
                  </div>
                  {fieldData.subFields.filter(sf => sf.status === 'Active').map(subField => (
                    <div key={subField.subFieldId} className="flex items-center mb-3">
                      <div className="w-32 flex-shrink-0 pr-4">
                        <div className="text-sm font-semibold text-gray-800">{subField.subFieldName}</div>
                        <div className="text-xs text-gray-500">{subField.fieldType}</div>
                        <div className="text-xs text-blue-600">{subField.capacity} người</div>
                      </div>
                      {timeSlots.map(slot => {
                        const { isAvailable } = getSlotAvailability(subField, slot, selectedDate);
                        // Only render slots within subfield's open/close times
                        const [slotHour, slotMinute] = slot.split(":").map(Number);
                        const slotMinutes = slotHour * 60 + slotMinute;
                        const [openHour, openMinute] = subField.openTime.split(":").map(Number);
                        const [closeHour, closeMinute] = subField.closeTime.split(":").map(Number);
                        const openMinutes = openHour * 60 + openMinute;
                        const closeMinutes = closeHour * 60 + closeMinute;
                        if (slotMinutes < openMinutes || slotMinutes >= closeMinutes) {
                          return (
                            <div
                              key={`${subField.subFieldId}-${slot}`}
                              className="w-16 h-12 border-2 rounded-md mx-0.5 flex items-center justify-center text-xs font-medium bg-gray-100 border-gray-200 cursor-not-allowed opacity-50"
                            />
                          );
                        }
                        return (
                          <div
                            key={`${subField.subFieldId}-${slot}`}
                            className={`w-16 h-12 border-2 rounded-md mx-0.5 flex items-center justify-center text-xs font-medium ${getSlotStyle(subField, slot)}`}
                            onClick={() => handleSlotClick(subField.subFieldId, slot)}
                            title={`${subField.subFieldName} - ${slot} - ${formatPrice(getSlotAvailability(subField, slot, selectedDate).price)}`}
                          >
                            {getSlotAvailability(subField, slot, selectedDate).isSelected && '✓'}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-green-500" />
                Dịch vụ thêm
              </h3>
              {fieldData.services.filter(s => s.isActive).map(service => (
                <div key={service.fieldServiceId} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                  <div className="flex-1">
                    <div className="font-medium text-gray-800">{service.serviceName}</div>
                    <div className="text-xs text-gray-500">{service.description}</div>
                    <div className="text-sm font-semibold text-blue-600">{formatPrice(service.price)}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleServiceQuantityChange(service.fieldServiceId, -1)}
                      className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                      disabled={!selectedServices[service.fieldServiceId]}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-medium">
                      {selectedServices[service.fieldServiceId] || 0}
                    </span>
                    <button
                      onClick={() => handleServiceQuantityChange(service.fieldServiceId, 1)}
                      className="w-8 h-8 rounded-full bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Tổng kết đặt sân</h3>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Số khung giờ:</span>
                  <span className="font-medium">{selectedSlots.size}</span>
                </div>
                {Object.entries(selectedServices).map(([serviceId, quantity]) => {
                  if (quantity === 0) return null;
                  const service = fieldData.services.find(s => s.fieldServiceId === parseInt(serviceId));
                  return (
                    <div key={serviceId} className="flex justify-between text-sm">
                      <span className="text-gray-600">{service?.serviceName} x{quantity}:</span>
                      <span className="font-medium">{formatPrice((service?.price || 0) * quantity)}</span>
                    </div>
                  );
                })}
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold text-gray-800">Tổng cộng:</span>
                  <span className="text-2xl font-bold text-blue-600">{formatPrice(calculateTotal())}</span>
                </div>
                <button
                  onClick={() => setShowPayment(true)}
                  disabled={selectedSlots.size === 0}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-300 disabled:to-gray-400 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-5 h-5" />
                  {selectedSlots.size === 0 ? 'Chọn khung giờ để đặt sân' : 'Thanh toán ngay'}
                </button>
              </div>
            </div>
          </div>
        </div>
        {showPayment && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 transform transition-all duration-300 scale-100">
              <h3 className="text-xl font-semibold mb-4">Xác nhận thanh toán</h3>
              <div className="space-y-2 mb-6">
                <div className="flex justify-between">
                  <span>Tổng tiền:</span>
                  <span className="font-bold text-blue-600">{formatPrice(calculateTotal())}</span>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowPayment(false)}
                  className="flex-1 py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Hủy
                </button>
                <button
                  onClick={() => {
                    alert('Đặt sân thành công!');
                    setShowPayment(false);
                    setSelectedSlots(new Set());
                    setSelectedServices({});
                  }}
                  className="flex-1 py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                >
                  Xác nhận
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FieldBookingSection;