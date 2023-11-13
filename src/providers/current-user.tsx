import React, {
  createContext,
  useContext,
  useMemo,
  useEffect,
  useState,
  ReactNode,
  FC,
} from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api-client';

interface CurrentUser {
  id: string;
  email: string;
}

interface Context {
  user: CurrentUser | null;
  login(email: string, password: string): Promise<CurrentUser>;
  logout(): Promise<void>;
}

const CurrentUserContext = createContext<Context | null>(null);

export default function useCurrentUser() {
  const ctx = useContext(CurrentUserContext);
  if (!ctx) throw new Error('Must be child of <CurrentUserProvider>');
  return ctx;
}

interface Props {
  children: ReactNode;
}

export const CurrentUserProvider: FC<Props> = function CurrentUserProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState<CurrentUser | null>(null);

  useEffect(() => {
    const cachedValue = sessionStorage.getItem('currentUser');
    if (cachedValue) setUser(JSON.parse(cachedValue));
  }, []);

  async function login(email: string, password: string) {
    const res = await apiClient.post<CurrentUser>('/login', { email, password });
    setUser(res.data);
    sessionStorage.setItem('currentUser', JSON.stringify(res.data));
    return res.data;
  }

  async function logout() {
    await apiClient.post('/logout');
    sessionStorage.clear();
  }

  return (
    <CurrentUserContext.Provider value={useMemo(() => ({ user, login, logout }), [user])}>
      {children}
    </CurrentUserContext.Provider>
  );
};
