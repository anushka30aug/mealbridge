export interface BookMealResponseDto {
  _id: string;
  image: string;
  donorId: string;
  foodDesc: string;
  veg: boolean;
  feedsUpto: number;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: number;
  preferredTime: string;
  expiryDate: string;
  deliveryDate: string | null;
  status: "reserved";
  collectorId: string | null;
  createdAt: string;
  updatedAt: string;
  collectorOtp: Number | null;
}
