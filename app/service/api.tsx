

import api, { API_BASE_URL } from "@/lib/axios";

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  photo: string;
  role: "student" | "admin";
};

export type UserProfileUpdate = {
  name?: string;
  photo?: File;
};

export const getProfilePhotoUrl = (photo: string): string => (
  photo.startsWith("/") ? `${API_BASE_URL}${photo}` : photo
);

export const getUserProfile = async (): Promise<UserProfile> => {
  const response = await api.get<{ user: UserProfile }>("/auth/userprofile");
  return response.data.user;
};

export const updateUserProfile = async (
  updatedProfile: UserProfileUpdate
): Promise<UserProfile> => {
  const formData = new FormData();

  if (updatedProfile.name !== undefined) {
    formData.append("name", updatedProfile.name);
  }
  if (updatedProfile.photo) {
    formData.append("photo", updatedProfile.photo);
  }

  const response = await api.put<{ user: UserProfile }>(
    "/auth/userprofile/update",
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return response.data.user;
};
