export interface GetMealDto {
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
  deliveryDate: string | null;
  expiryDate: string;
  status: "available" | "delivered" | "expired" | "cancelled";
  collectorId: string | null;
  createdAt: string;
  updatedAt: string;
  collectorOtp: Number | null;
}

export type GetMealsResponseDto = GetMealDto[];
