import { useMutation } from "@tanstack/react-query";
import { LoginWithEmail, SignupWithEmail, LoginWithGoogle, Logout } from "../api/authApi";
import { useState, useEffect } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";

export const useLogin = () => {
  const mutation = useMutation({
    mutationFn: LoginWithEmail,
    onSuccess: () => {
      console.log("Login success");
    },
    onError: (error) => {
      console.log("Login failed:", error);
    },
  });

  return {
    login: mutation.mutate,
    user: mutation.data,
    isLoading: mutation.isPending,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
    reset: mutation.reset,
  };
};

export const useSignup = () => {
  const mutation = useMutation({
    mutationFn: SignupWithEmail,
    onSuccess: () => {
      console.log("Signup success");
    },
    onError: (error) => {
      console.log("Signup failed:", error);
    },
  });

  return {
    signup: mutation.mutate,
    user: mutation.data,
    isLoading: mutation.isPending,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
    reset: mutation.reset,
  };
};

export const useGoogleLogin = () => {
  const mutation = useMutation({
    mutationFn: LoginWithGoogle,
    onSuccess: () => {
      console.log("Google login success");
    },
    onError: (error) => {
      console.log("Google login failed:", error);
    },
  });

  return {
    loginWithGoogle: mutation.mutate,
    user: mutation.data,
    isLoading: mutation.isPending,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
    reset: mutation.reset,
  };
};

export const useLogout = () => {
  const mutation = useMutation({
    mutationFn: Logout,
    onSuccess: () => {
      console.log("Logout success");
    },
    onError: (error) => {
      console.log("Logout failed:", error);
    },
  });

  return {
    logout: mutation.mutate, 
    isLoading: mutation.isPending,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
    reset: mutation.reset,
  };
};
 
export const useAuthState = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return {
    user,
    loading,
    isAuthenticated: !!user,
  };
};