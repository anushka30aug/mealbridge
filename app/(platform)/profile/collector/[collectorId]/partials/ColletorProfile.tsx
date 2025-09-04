"use client";
import CollectorHooks from "@/apiCalls/collector/hooks";
import ProfileSkeleton from "./ProfileSkeleton";
import { LogOutButton } from "@atoms";
import { useEffect, useState } from "react";
import CollectorProfileCard from "./CollectorProfileCard";
import ProfileFormDialog from "./ProfileFormDialog";
import { AddressCard, AddressFormDialog } from "@molecules";

export default function CollectorProfile({
  collectorId,
}: {
  collectorId: string;
}) {
  const { data, isPending, isError } =
    CollectorHooks.useGetCollectorProfile(collectorId);
  const [userId, setUserId] = useState<string | null>(null);
  const [editAddress, setEditAddress] = useState<boolean>(false);
  const [editProfile, setEditProfile] = useState<boolean>(false);
  useEffect(() => {
    const id = localStorage.getItem("collector_id");
    setUserId(id);
  }, []);

  if (isPending) {
    return <ProfileSkeleton />;
  }

  if (isError || !data) {
    throw new Error("Collector profile fetch failed");
  }

  const {
    username,
    profilePicture,
    email,
    donationCount,
    contact,
    staticOtp,
    address,
    createdAt,
  } = data;

  console.log(data);
  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <div className="flex items-center justify-end mb-8">
        <LogOutButton />
      </div>

      <CollectorProfileCard
        collectorId={collectorId}
        isEditable={userId === collectorId}
        username={username}
        profilePicture={profilePicture}
        email={email}
        donationCount={donationCount}
        createdAt={createdAt}
        contact={contact}
        staticOtp={staticOtp}
        onEdit={() => setEditProfile(true)}
      />

      <ProfileFormDialog
        open={editProfile}
        setOpen={setEditProfile}
        username={username}
        contact={contact}
      />
      {address && (
        <>
          <AddressCard
            mealAddress={address}
            isEditable={userId === collectorId}
            onEdit={() => setEditAddress(true)}
          />
          <AddressFormDialog open={editAddress} setOpen={setEditAddress} />
        </>
      )}
    </div>
  );
}
