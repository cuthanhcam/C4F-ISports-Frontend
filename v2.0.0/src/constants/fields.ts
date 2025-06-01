export interface TimeSlot  {
  startTime: string; // "06:00"
  endTime: string;   // "22:00"
  pricePerSlot: number;
};

export interface PricingRule {
  pricingRuleId: number;
  appliesToDays: string[]; // ["Monday", "Tuesday", ...]
  timeSlots: TimeSlot[];
};

export interface SubField {
  subFieldId: number;
  subFieldName: string;
  fieldType: string; // "5-a-side"
  description: string;
  status: string; // e.g., "Active"
  capacity: number;
  openTime: string;
  closeTime: string;
  defaultPricePerSlot: number;
  pricingRules: PricingRule[];
  child5aSideIds: number[];
};

export interface FieldService {
  fieldServiceId: number;
  serviceName: string;
  price: number;
  description: string;
  isActive: boolean;
};

export interface FieldAmenity {
  fieldAmenityId: number;
  amenityName: string;
  description: string;
  iconUrl: string;
};

export interface Iimages {
    fieldImageId: number;
    imageUrl: string;
    publicId: string;
    isPrimary: boolean;
    uploadedAt: string;
}

export interface SportField {
  fieldId: number;
  fieldName: string;
  description: string;
  address: string;
  city: string;
  district: string;
  latitude: number;
  longitude: number;
  openTime: string;
  closeTime: string;
  averageRating: number;
  sportId: number;
  minPricePerSlot: number;
  maxPricePerSlot: number;
  subFields: SubField[];
  services: FieldService[];
  amenities: FieldAmenity[];
  images: Iimages[]; 
};

export interface SportFieldResponse {
  data: SportField[];
  page: number;
  total: number;
}