import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  Timestamp, 
  serverTimestamp
} from 'firebase/firestore';

import { db } from '../utils/firebase';
import { Posts, CreatePostData } from '../models';
import { AddPostRequest, AddPostResponse } from '../models';


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

    const docRef = await addDoc(collection(db, 'posts'), docData);
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
      collection(db, 'posts'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );

    const querySnapshot = await getDocs(q);
    const posts: Posts[] = [];

    querySnapshot.forEach((doc) => {
      posts.push({
        id: doc.id,
        ...doc.data()
      } as Posts);
    });

    return posts;
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch posts");
  }
};

export const addDocument = async (
  collectionName: string, 
  documentData: AddPostRequest
): Promise<AddPostResponse> => {
  try {
    if (!documentData.title?.trim() || !documentData.content?.trim()) {
      throw new Error("Please enter title and content");
    }
    
    if (!documentData.userId) {
      throw new Error("Please login first");
    }


      const dataWithTimestamp = {
          ...documentData,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
      };
      
             const docRef = await addDoc(collection(db, collectionName), dataWithTimestamp);
       console.log(`Document written to ${collectionName} with ID: `, docRef.id);
       return {
           id: docRef.id,
           ...documentData,
           createdAt: Timestamp.now(),
           updatedAt: Timestamp.now()
       };

  } catch (error) {
      console.error(`Error adding document to ${collectionName}: `, error);
      throw new Error(`Failed to add document to ${collectionName}`);
  }
};
