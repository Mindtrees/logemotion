import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  updateProfile,
  User,
} from 'firebase/auth';
import { auth } from '../utils/firebase';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  email: string;
  password: string;
  displayName?: string;
}

const googleProvider = new GoogleAuthProvider();

export const LoginWithEmail = async (
  credentials: LoginCredentials
): Promise<User> => {
  try {
    if (!credentials.email.trim() || !credentials.password.trim()) {
      throw new Error("Please enter email and password");
    }
    
    const userCredential = await signInWithEmailAndPassword(
      auth,
      credentials.email,
      credentials.password
    );
    return userCredential.user;
  } catch (error: any) {
    throw new Error(error.message || "Login failed");
  }
};

export const SignupWithEmail = async (
  credentials: SignupCredentials
): Promise<User> => {
  try {
    if (!credentials.email.trim() || !credentials.password.trim()) {
      throw new Error("Please enter email and password");
    }
    
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      credentials.email,
      credentials.password
    );

    if (credentials.displayName) {
      await updateProfile(userCredential.user, {
        displayName: credentials.displayName,
      });
    }

    return userCredential.user;
  } catch (error: any) {
    throw new Error(error.message || "Signup failed");
  }
};

export const LoginWithGoogle = async (): Promise<User> => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error: any) {
    throw new Error(error.message || "Google login failed");
  }
};

export const Logout = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error: any) {
    throw new Error(error.message || "Logout failed");
  }
};