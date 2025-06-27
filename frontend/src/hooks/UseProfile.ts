import { useMutation } from "@tanstack/react-query";
import { UpdateUserProfile, UpdateUserPassword } from "../api/profileApi";

export const useUpdateProfile = () => {
  const mutation = useMutation({
    mutationFn: async (data: { displayName?: string; password?: string }) => {
      if (data.displayName) {
        await UpdateUserProfile(data.displayName);
      }
      if (data.password) {
        await UpdateUserPassword(data.password);
      }
    },
    onSuccess: () => {
      console.log("Profile updated successfully");
    },
    onError: (error) => {
      console.error("Failed to update profile:", error);
    },
  });

  return {
    updateProfile: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
    reset: mutation.reset,
  };
};