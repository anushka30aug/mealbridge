import { z } from "zod";

export const UpdateCollecotrAddressRequestSchema = z.object({
  address: z.object({
    address: z.string().min(1, { message: "Address is required" }),
    city: z.string().min(1, { message: "City is required" }),
    state: z.string().min(1, { message: "State is required" }),
    country: z.string().min(1, { message: "Country is required" }),
    postalCode: z.string().min(1, { message: "Postal code is required" }),
  }),
  contact: z
    .string()
    .regex(/^\d{10}$/, "Enter valid number")
    .or(z.literal(""))
    .optional(),
});

export type UpdateCollecotrAddressRequestDTO = z.infer<
  typeof UpdateCollecotrAddressRequestSchema
>;
