export interface AddressDTO {
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

export interface GetDonorProfileResponseDTO {
  _id: string;
  username: string;
  profilePicture: string;
  email: string;
  donationCount: number;
  contact: string | null;
  address: AddressDTO | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
