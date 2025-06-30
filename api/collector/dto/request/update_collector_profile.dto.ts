import { z } from "zod";
export const UpdateCollecotrProfileRequestSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  contact: z.string().regex(/^\d{10}$/, "Enter valid number"),
});

export type UpdateCollecotrProfileRequestDTO = z.infer<
  typeof UpdateCollecotrProfileRequestSchema
>;
