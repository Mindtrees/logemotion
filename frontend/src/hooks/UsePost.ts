import { useMutation, useQuery } from "@tanstack/react-query";
import { SavePost, GetUserPosts } from "../api/postApi";

import { CreatePostData, EmotionAnalysisResponse } from "../models";
import { useAuthState } from "./UseLogin";


export const useSavePost = () => {
  const { user } = useAuthState();

  const mutation = useMutation({
    mutationFn: (data: { title: string; content: string; emotionAnalysis?: EmotionAnalysisResponse }) => {
      if (!user) {
        throw new Error("Please login first");
      }

      const postData: CreatePostData = {
        title: data.title,
        content: data.content,
        userId: user.uid,
        userEmail: user.email || '',
        emotionAnalysis: data.emotionAnalysis,
      };

      return SavePost(postData);
    },
    onSuccess: (postId) => {
      console.log("Post saved successfully with ID:", postId);
    },
    onError: (error) => {
      console.error("Failed to save post:", error);
    },
  });

  return {
    savePost: mutation.mutate, 
    isLoading: mutation.isPending,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
    data: mutation.data, 
    reset: mutation.reset,
  };
};


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