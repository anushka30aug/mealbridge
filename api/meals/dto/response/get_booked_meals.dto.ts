export interface GetBookedMealDto {
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
  status: "reserved";
  collectorId: string | null;
  createdAt: string;
  updatedAt: string;
}

export type GetBookedMealsResponseDto = GetBookedMealDto[];
