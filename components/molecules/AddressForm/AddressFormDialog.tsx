import { AddressDTO } from "@/api/collector/dto/response/get_collector_profile.dto";
import { Button, Dialog, DialogContent, DialogFooter, DialogTitle } from "@ui";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  UpdateCollecotrAddressRequestDTO,
  UpdateCollecotrAddressRequestSchema,
} from "@/api/collector/dto/request/update_collector_address.dto";
import { toast } from "sonner";
import axios from "axios";
import { Locate } from "lucide-react";
import { useUpdateCollectorAddress } from "@/api/collector/hooks/update_collector_address";
import { useQueryClient } from "@tanstack/react-query";
export interface AddressFormDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  showContact?: boolean;
  address?: AddressDTO | null;
}
export default function AddressFormDialog({
  open,
  setOpen,
  showContact = false,
  address,
}: AddressFormDialogProps) {
  const queryClient = useQueryClient();
  const form = useForm<UpdateCollecotrAddressRequestDTO>({
    mode: "onBlur",
    resolver: zodResolver(UpdateCollecotrAddressRequestSchema),
    defaultValues: {
      address: {
        address: address?.address || "",
        city: address?.city || "",
        state: address?.state || "",
        country: address?.country || "India",
        postalCode: address?.postalCode || "",
      },
      contact: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = form;

  const handleUseMyLocation = async () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser.");
      return;
    }
    const locationLoadingId = toast.loading("Fetching your location...", {
      description:
        "Please check before submitting, as the data may not be 100% accurate.",
    });

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await axios.get(
            "https://api.opencagedata.com/geocode/v1/json",
            {
              params: {
                key: process.env.NEXT_PUBLIC_OPENCAGE_API_KEY,
                q: `${latitude},${longitude}`,
                pretty: 1,
                no_annotations: 1,
              },
            }
          );

          const details = res.data.results?.[0]?.components || {};
          if (!details) {
            toast.dismiss(locationLoadingId);
            toast.error("Could not retrieve location data.");
            return;
          }
          const formatted = res.data.results?.[0]?.formatted || "";

          reset({
            address: {
              address: formatted,
              city:
                details.city ||
                details.town ||
                details.village ||
                details.hamlet ||
                details.city_district ||
                details.state_district ||
                details.county ||
                "",

              state: details.state || details.region || "",

              country: details.country || "",

              postalCode: details.postcode || "",
            },
          });
          toast.dismiss(locationLoadingId);
          toast.success("Location auto-filled successfully!");
        } catch (err) {
          toast.dismiss(locationLoadingId);
          toast.error("Failed to fetch address from location.");
          console.error(err);
        }
      },
      () => {
        toast.error("Permission to access location was denied.");
      }
    );
  };

  const { mutate: updateAddress } = useUpdateCollectorAddress({
    onSuccess: () => {
      toast.success("Address updated successfully");
      queryClient.invalidateQueries({ queryKey: ["get-collector-profile"] });
      queryClient.invalidateQueries({ queryKey: ["get-meals"] });
      queryClient.invalidateQueries({ queryKey: ["get-booked-meals"] });
      setOpen(false);
      reset({
        address: {
          address: "",
          city: "",
          state: "",
          country: "India",
          postalCode: "",
        },
        contact: "",
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data: UpdateCollecotrAddressRequestDTO) => {
    updateAddress(data);
    console.log("Form submitted");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogTitle className="text-xl font-bold text-[#005e38] text-center">
          {address ? "Update Your Address" : "Add Your Details"}
        </DialogTitle>
        <FormProvider {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-[#005e38]"
                >
                  Address
                </label>
                <input
                  id="address"
                  type="text"
                  {...register("address.address")}
                  className={`mt-1 block w-full p-2 border rounded-md focus:border-blue-500 focus:ring-blue-500`}
                />
                {errors.address?.address && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.address.address.message}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-[#005e38]"
                  >
                    City
                  </label>
                  <input
                    id="city"
                    type="text"
                    {...register("address.city")}
                    className={`mt-1 block w-full p-2 border rounded-md focus:border-blue-500 focus:ring-blue-500`}
                  />
                  {errors.address?.city && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.address.city.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="state"
                    className="block text-sm font-medium text-[#005e38]"
                  >
                    State
                  </label>
                  <input
                    id="state"
                    type="text"
                    {...register("address.state")}
                    className={`mt-1 block w-full p-2 border rounded-md focus:border-blue-500 focus:ring-blue-500`}
                  />
                  {errors.address?.state && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.address.state.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="Postal Code"
                    className="block text-sm font-medium text-[#005e38]"
                  >
                    {" "}
                    Postal Code
                  </label>
                  <input
                    id="postalCode"
                    type="text"
                    {...register("address.postalCode")}
                    className={`mt-1 block w-full p-2 border rounded-md focus:border-blue-500 focus:ring-blue-500`}
                  />
                  {errors.address?.postalCode && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.address.postalCode.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-[#005e38]"
                  >
                    Country
                  </label>
                  <input
                    id="country"
                    type="text"
                    {...register("address.country")}
                    className={`mt-1 block w-full p-2 border rounded-md focus:border-blue-500 focus:ring-blue-500`}
                  />
                  {errors.address?.country && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.address.country.message}
                    </p>
                  )}
                </div>
              </div>
              {showContact && (
                <div className="space-y-2">
                  <label
                    htmlFor="contact"
                    className="block text-sm font-medium text-[#005e38]"
                  >
                    Contact Number
                  </label>
                  <input
                    id="contact"
                    type="text"
                    {...register("contact")}
                    className={`mt-1 block w-full p-2 border rounded-md focus:border-blue-500 focus:ring-blue-500`}
                  />
                  {errors.contact && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.contact.message}
                    </p>
                  )}
                </div>
              )}
            </div>
            <DialogFooter className="flex flex-col sm:flex-row gap-3 mt-5">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-2/3 bg-[#005e38] hover:bg-[#00472d] text-white rounded-lg cursor-pointer"
              >
                {isSubmitting ? "Saving..." : "Save Address"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleUseMyLocation}
                className="w-full sm:w-1/3 border-[#005e38] text-[#005e38] hover:bg-[#005e38]/10 rounded-lg flex items-center justify-center gap-1 cursor-pointer"
              >
                <Locate size={18} />
                <span>Use My Location</span>
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
