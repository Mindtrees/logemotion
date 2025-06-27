import { useState, useCallback } from 'react';
import { AddPostRequest, AddPostResponse, Emotions } from '../models';
import { addDoc, collection, serverTimestamp, Timestamp } from 'firebase/firestore';
import { db } from '../utils/firebase';



interface UseAddDocumentReturn {
  addDocument: (postData: { content: string; title: string; userEmail: string; userId: string; emotionAnalysis: Emotions[]; }) => Promise<AddPostResponse>;
  isLoading: boolean;
  error: string | null;
  success: boolean;
  reset: () => void;
}

export const useAddDocument = (): UseAddDocumentReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const addDocument = useCallback(async (
    collectionName: string,
    documentData: AddPostRequest
  ): Promise<AddPostResponse> => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

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
      
      const docRef = await addDoc(collection(db, 'posts'), dataWithTimestamp);
      console.log(`Document written to posts with ID: `, docRef.id);
      
      const result = {
        id: docRef.id,
        ...documentData,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      };

      setSuccess(true);
      return result;

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : `Failed to add document to posts`;
      setError(errorMessage);
      console.error(`Error adding document to posts: `, err);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setError(null);
    setSuccess(false);
    setIsLoading(false);
  }, []);
  return {
    addDocument: (postData: { 
      content: string;
      title: string;
      userEmail: string;
      userId: string;
      emotionAnalysis: Emotions[];
    }) => addDocument('posts', postData),
    isLoading,
    error,
    success,
    reset
  };
};