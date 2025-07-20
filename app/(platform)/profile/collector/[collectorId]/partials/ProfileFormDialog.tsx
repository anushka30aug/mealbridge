"use client";

import { toast } from "sonner";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import {
  UpdateCollectorProfileRequestDTO,
  UpdateCollecotrProfileRequestSchema,
} from "@/api/collector/dto/request/update_collector_profile.dto";
import CollectorHooks from "@/api/collector/hooks";
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  Input,
  Label,
} from "@ui";

export default function ProfileFormDialog({
  open,
  setOpen,
  username,
  contact,
}: {
  open: boolean;
  setOpen: (val: boolean) => void;
  username: string;
  contact: string | null;
}) {
  const queryClient = useQueryClient();

  const form = useForm<UpdateCollectorProfileRequestDTO>({
    mode: "onBlur",
    resolver: zodResolver(UpdateCollecotrProfileRequestSchema),
    defaultValues: {
      username: username,
      contact: contact ?? "",
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = form;

  const { mutate: updateProfile } = CollectorHooks.useUpdateCollectorProfile({
    onSuccess: (data) => {
      toast.success("Profile updated successfully");
      queryClient.invalidateQueries({ queryKey: ["get-collector-profile"] });
      setOpen(false);
      reset({
        username: data.username,
        contact: data.contact ?? "",
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data: UpdateCollectorProfileRequestDTO) => {
    updateProfile(data);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md mx-auto bg-white rounded-2xl p-6 shadow-lg">
        <div className="mb-4 text-center">
          <DialogTitle className="text-2xl font-bold text-[#005e38]">
            Update Your Profile
          </DialogTitle>
        </div>

        <FormProvider {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="username" className="text-gray-700">
                Name
              </Label>
              <Input
                id="username"
                {...register("username")}
                className="bg-gray-50 border-gray-300 focus:border-[#005e38] focus:ring focus:ring-[#005e38]/50"
              />
              {errors.username && (
                <p className="text-red-500 text-sm">
                  {errors.username.message}
                </p>
              )}
            </div>
            <div className="space-y-1">
              <Label htmlFor="contact" className="text-gray-700">
                Contact number
              </Label>
              <Input
                id="contact"
                {...register("contact")}
                className="bg-gray-50 border-gray-300 focus:border-[#005e38] focus:ring focus:ring-[#005e38]/50"
              />
              {errors.contact && (
                <p className="text-red-500 text-sm">{errors.contact.message}</p>
              )}
            </div>

            <DialogFooter className="flex flex-col sm:flex-row gap-3">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-2/3 bg-[#005e38] hover:bg-[#00472d] text-white rounded-lg cursor-pointer"
              >
                {isSubmitting ? "Saving..." : "Save Profile"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                className="w-full sm:w-1/3 border-[#005e38] text-[#005e38] hover:bg-[#005e38]/10 rounded-lg flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>Cancel</span>
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
