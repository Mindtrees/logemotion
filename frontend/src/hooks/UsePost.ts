import { useMutation, useQuery } from "@tanstack/react-query";
import { GetUserPosts } from "../api/postApi";

import { CreatePostData, EmotionAnalysisResponse } from "../models";
import { useAuthState } from "./UseLogin";



export const useUserPosts = () => {
  const { user } = useAuthState();

  const query = useQuery({
    queryKey: ['userPosts', user?.uid],
    queryFn: () => {
      if (!user?.uid) {
        throw new Error("User not found");
      }
      return GetUserPosts(user.uid);
    },
    enabled: !!user?.uid, 
  });

  return {
    posts: query.data || [],
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
};