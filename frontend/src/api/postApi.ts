import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  Timestamp,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../utils/firebase";
import { Posts, CreatePostData } from "../models";

export const SavePost = async (postData: CreatePostData): Promise<string> => {
  try {
    if (!postData.title.trim() || !postData.content.trim()) {
      throw new Error("Please enter title and content");
    }

    if (!postData.userId) {
      throw new Error("Please login first");
    }

    const docData: Posts = {
      ...postData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    };

    const docRef = await addDoc(collection(db, "posts"), docData);
    return docRef.id;
  } catch (error: any) {
    throw new Error(error.message || "Failed to save post");
  }
};

// 사용자의 글 목록 가져오기
export const GetUserPosts = async (userId: string): Promise<Posts[]> => {
  try {
    if (!userId) {
      throw new Error("User ID is required");
    }

    const q = query(
      collection(db, "posts"),
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );

    const querySnapshot = await getDocs(q);
    const posts: Posts[] = [];

    querySnapshot.forEach((doc) => {
      posts.push({
        id: doc.id,
        ...doc.data(),
      } as Posts);
    });

    return posts;
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch posts");
  }
};

// 글 수정
export const UpdatePost = async (
  postId: string,
  updatedData: Partial<Posts>
) => {
  try {
    if (!postId) throw new Error("Post ID is required");
    const postRef = doc(db, "posts", postId);
    const updateData = {
      ...updatedData,
      updatedAt: Timestamp.now(),
    };
    await updateDoc(postRef, updateData);
  } catch (error: any) {
    throw new Error(error.message || "Fail to fetch updated Data");
  }
};

// 글 삭제
export const DeletePost = async (postId: string) => {
  try {
    if (!postId) throw new Error("Post ID is required");
    const postRef = doc(db, "posts", postId);
    await deleteDoc(postRef);
  } catch (error: any) {
    throw new Error(error.message || "Fail to delete Data");
  }
};

// 전체 글 목록 불러오기
export const GetAllPosts = async () => {
  try {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const posts = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Posts[];
    return posts;
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch all posts");
  }
};
