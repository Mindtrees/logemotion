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
    if (error.code === 'auth/user-not-found') {
      throw new Error("No account found with this email address");
    }
    if (error.code === 'auth/wrong-password') {
      throw new Error("Incorrect password. Please try again");
    }
    if (error.code === 'auth/invalid-email') {
      throw new Error("Please enter a valid email address");
    }
    
    throw new Error("Login failed. Please try again");
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
    // 이메일 중복 에러 처리
    if (error.code === 'auth/email-already-in-use') {
      throw new Error("This email is already registered. Please try signing in instead");
    }
    if (error.code === 'auth/weak-password') {
      throw new Error("Password must be at least 6 characters long");
    }
    if (error.code === 'auth/invalid-email') {
      throw new Error("Please enter a valid email address");
    }
    
    throw new Error("Signup failed. Please try again");
  }
};

export const LoginWithGoogle = async (): Promise<User> => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error: any) {
    if (error.code === 'auth/popup-closed-by-user') {
      throw new Error("Sign-in was cancelled");
    }
    
    throw new Error("Google login failed. Please try again");
  }
};

export const Logout = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error: any) {
    throw new Error("Logout failed. Please try again");
  }
};