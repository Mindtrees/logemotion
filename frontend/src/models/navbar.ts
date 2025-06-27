import { ReactNode } from 'react';

export interface NavItem {
  path: string;
  label: string;
  icon: ReactNode;
}

export interface UserMenuProps {
  isLoggedIn: boolean;
  onLogin: () => void;
  onLogout: () => void;
  onProfile: () => void;
}