export interface AddressDTO {
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

export interface GetCollectorProfileResponseDTO {
  _id: string;
  username: string;
  profilePicture: string;
  email: string;
  donationCount: number;
  contact: string | null;
  staticOtp: string;
  address: AddressDTO | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
