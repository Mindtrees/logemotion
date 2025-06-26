import { useState, useEffect } from 'react';
import { 
  collection, 
  addDoc, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  Timestamp,
  onSnapshot
} from 'firebase/firestore';
import { db } from '../api/firebase';
import { UserText, CreateUserTextData, UpdateUserTextData } from '../models/userText';
import { useAuthContext } from '../contexts/AuthContext';

export const useUserTexts = () => {
  const { user } = useAuthContext();
  const [texts, setTexts] = useState<UserText[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setTexts([]);
      return;
    }

    setLoading(true);
    const textsQuery = query(
      collection(db, 'userTexts'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(textsQuery, (snapshot) => {
      const userTexts: UserText[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as UserText));
      
      setTexts(userTexts);
      setLoading(false);
    }, (err) => {
      setError('Failed to load texts');
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const saveText = async (textData: CreateUserTextData): Promise<string | null> => {
    if (!user) {
      setError('Login required');
      return null;
    }

    try {
      setLoading(true);
      setError(null);

      const docRef = await addDoc(collection(db, 'userTexts'), {
        ...textData,
        userId: user.uid,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      });

      return docRef.id;
    } catch (err: any) {
      setError('Failed to save text');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateText = async (textId: string, updateData: UpdateUserTextData): Promise<boolean> => {
    if (!user) {
      setError('Login required');
      return false;
    }

    try {
      setLoading(true);
      setError(null);

      const textRef = doc(db, 'userTexts', textId);
      await updateDoc(textRef, {
        ...updateData,
        updatedAt: Timestamp.now()
      });

      return true;
    } catch (err: any) {
      setError('Failed to update text');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteText = async (textId: string): Promise<boolean> => {
    if (!user) {
      setError('Login required');
      return false;
    }

    try {
      setLoading(true);
      setError(null);

      await deleteDoc(doc(db, 'userTexts', textId));
      return true;
    } catch (err: any) {
      setError('Failed to delete text');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const getTextsByEmotion = (emotion: string): UserText[] => {
    return texts.filter(text => 
      text.dominantEmotion.toLowerCase() === emotion.toLowerCase()
    );
  };

  const getRecentTexts = (count: number): UserText[] => {
    return texts.slice(0, count);
  };

  return {
    texts,
    loading,
    error,
    saveText,
    updateText,
    deleteText,
    getTextsByEmotion,
    getRecentTexts
  };
};