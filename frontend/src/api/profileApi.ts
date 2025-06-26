import { updateProfile, updatePassword } from 'firebase/auth';
import { auth } from '../utils/firebase';

export const UpdateUserProfile = async (displayName: string): Promise<void> => {
  try {
    if (!auth.currentUser) {
      throw new Error("No user is currently signed in");
    }

    await updateProfile(auth.currentUser, {
      displayName: displayName.trim()
    });

  } catch (error: any) {
    throw new Error(error.message || "Failed to update profile");
  }
};

export const UpdateUserPassword = async (newPassword: string): Promise<void> => {
  try {
    if (!auth.currentUser) {
      throw new Error("No user is currently signed in");
    }

    if (newPassword.length < 6) {
      throw new Error("Password must be at least 6 characters long");
    }

    await updatePassword(auth.currentUser, newPassword);

  } catch (error: any) {
    throw new Error(error.message || "Failed to update password");
  }
};