import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface LocationContextType {
  previousLocation: string | null;
  currentLocation: string;
  setPreviousLocation: (location: string) => void;
  redirectAfterLogin: () => string;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [previousLocation, setPreviousLocation] = useState<string | null>(null);
  const [currentLocation, setCurrentLocation] = useState<string>('/');

  useEffect(() => {
    // 로그인/회원가입 페이지가 아닐 때만 이전 위치 저장
    if (!['/login', '/signup'].includes(location.pathname)) {
      setPreviousLocation(currentLocation);
    }
    setCurrentLocation(location.pathname);
  }, [location.pathname, currentLocation]);

  const redirectAfterLogin = () => {
    // 이전 위치가 있고, 로그인/회원가입 페이지가 아니면 이전 위치로
    if (previousLocation && !['/login', '/signup', '/'].includes(previousLocation)) {
      return previousLocation;
    }
    return '/';
  };

  return (
    <LocationContext.Provider 
      value={{ 
        previousLocation, 
        currentLocation, 
        setPreviousLocation,
        redirectAfterLogin
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocationContext = () => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocationContext must be used within a LocationProvider');
  }
  return context;
};

// 커스텀 훅: 로그인 리다이렉트용
export const useLoginRedirect = () => {
  const { redirectAfterLogin } = useLocationContext();
  const navigate = useNavigate();
  
  const redirectToLogin = () => {
    navigate('/login');
  };
  
  const handleSuccessfulLogin = () => {
    const redirectTo = redirectAfterLogin();
    navigate(redirectTo, { replace: true });
  };
  
  return { redirectToLogin, handleSuccessfulLogin };
};