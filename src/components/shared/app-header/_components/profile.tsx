"use client";

import { useState } from "react";
import Image from "next/image";
import { useUser } from "@/providers/UserContext";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Camera, Loader2, User } from "lucide-react";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Profile = () => {
  const { user, refreshUser } = useUser();
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>(user?.name || "");
  const [avatarId] = useState<string | null>(user?.avatarId || null);
  const [avatar, setAvatar] = useState<File | string | null>(
    user?.avatar || null,
  );

  const handleUpdate = async () => {
    try {
      setLoading(true);

      let avatarUrl = avatar || "";
      let avatarPublicId = avatarId;

      if (avatar && avatar instanceof File) {
        const imgForm = new FormData();
        imgForm.append("file", avatar);

        if (avatarId) imgForm.append("oldAvatarPublicId", avatarId);

        const res = await fetch("/api/cloudinaryUpload", {
          method: "POST",
          body: imgForm,
        });

        const data = await res.json();

        if (data.success) {
          avatarUrl = data.result.secure_url;
          avatarPublicId = data.result.public_id;
        }
      }

      const res = await fetch("/api/user/update", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          avatar: avatarUrl,
          avatarId: avatarPublicId,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data?.message || "Failed to update profile");

      toast.success("Profile updated successfully.");
      refreshUser();
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error ? error.message : "Failed to update Profile!",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <DialogContent className="sm:max-w-sm">
      <DialogHeader>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogDescription>
          Update your profile picture and name.
        </DialogDescription>
      </DialogHeader>
      <div className="flex flex-col items-center justify-center gap-4">
        <div>
          <div className="relative size-32 rounded-md border bg-accent/70 flex items-center justify-center overflow-hidden">
            {avatar ? (
              <Image
                fill
                alt="Profile Picture"
                src={
                  typeof avatar === "string"
                    ? avatar
                    : URL.createObjectURL(avatar)
                }
                className="object-cover"
              />
            ) : (
              <User className="size-10 md:size-12 p-1.5 md:p-2" />
            )}
            <Label
              htmlFor="avatar-upload"
              className="absolute bottom-0.5 right-0.5 flex size-9 items-center justify-center rounded-full border bg-background shadow-sm cursor-pointer"
            >
              <Camera className="size-5" />
            </Label>
          </div>

          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            onChange={(e) => setAvatar(e.target.files?.[0] || null)}
            className="hidden"
          />

          <h2 className="text-2xl text-center">{user?.name}</h2>
        </div>

        <div className="w-full p-2 border border-amber-50 rounded-sm">
          <Label htmlFor="name">Edit name</Label>
          <input
            id="name"
            type="text"
            value={name}
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
            className="w-full outline-0 border-0 mt-2 bg-transparent"
          />
        </div>
      </div>

      <DialogFooter>
        <DialogClose
          render={
            <Button variant="outline" disabled={loading}>
              Cancel
            </Button>
          }
        />
        <Button type="button" onClick={handleUpdate} disabled={loading}>
          {loading && <Loader2 className="mr-2 size-4 animate-spin" />}

          {loading ? "Saving..." : "Save"}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default Profile;
