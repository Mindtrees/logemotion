import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  SavePost,
  GetUserPosts,
  UpdatePost,
  DeletePost,
  GetAllPosts,
} from "../api/postApi";

import { CreatePostData, EmotionAnalysisResponse, Posts } from "../models";
import { useAuthState } from "./UseLogin";

export const useSavePost = () => {
  const { user } = useAuthState();

  const mutation = useMutation({
    mutationFn: (data: {
      title: string;
      content: string;
      emotionAnalysis?: EmotionAnalysisResponse;
    }) => {
      if (!user) {
        throw new Error("Please login first");
      }

      const postData: CreatePostData = {
        title: data.title,
        content: data.content,
        userId: user.uid,
        userEmail: user.email || "",
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

export const useGetUserPosts = () => {
  const { user } = useAuthState();

  const query = useQuery({
    queryKey: ["userPosts", user?.uid],
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

interface UpdatePostsResponse {
  postId: string;
  updatedData: Partial<Posts>;
}

// 글 수정
export const useUpdatePost = () => {
  const { user } = useAuthState();
  const mutation = useMutation({
    mutationFn: ({ postId, updatedData }: UpdatePostsResponse) => {
      if (!user) throw new Error("Please login first");
      return UpdatePost(postId, updatedData);
    },
    onSuccess: (postId) => {
      console.log("Post updated successfully with ID: ", postId);
    },
    onError: (error) => {
      console.error("Failed to update post:", error);
    },
  });

  return {
    updatePost: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
};

// 글 삭제
export const useDeletePost = () => {
  const { user } = useAuthState();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (postId: string) => {
      if (!user) throw new Error("Please login first");
      return DeletePost(postId);
    },
    onSuccess: (postId) => {
      console.log("Post deleted successfully with ID: ", postId);
      queryClient.invalidateQueries({ queryKey: ["userPosts"] }); // 리액트쿼리 버전4 이후는 {queryKey:[..]} 형태의 객체로 감싸서 전달해야 함.
      queryClient.invalidateQueries({ queryKey: ["all Posts"] });
    },
    onError: (error) => {
      console.error("Failed to delete post:", error);
    },
  });

  return {
    deletePost: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
};

// 전체 글 목록 불러오기
export const useGetAllPosts = () => {
  const query = useQuery({
    queryKey: ["all Posts"],
    queryFn: GetAllPosts,
  });

  return {
    allPosts: query.data || [],
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
};
