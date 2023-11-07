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
import useToast from './toast';

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
  const toast = useToast();
  const navigate = useNavigate();
  const [user, setUser] = useState<CurrentUser | null>(null);

  useEffect(() => {
    const cachedValue = sessionStorage.getItem('currentUser');
    if (cachedValue) setUser(JSON.parse(cachedValue));
  }, []);

  async function login(email: string, password: string) {
    return apiClient.post<CurrentUser>('/login', { email, password })
      .then((res) => {
        setUser(res.data);
        sessionStorage.setItem('currentUser', JSON.stringify(res.data));
        return res.data;
      })
      .catch((ex) => {
        console.error(ex);
        toast.error('Authentication failed.');
        return Promise.reject(ex);
      });
  }

  async function logout() {
    await apiClient.post('/logout')
      .then(() => {
        sessionStorage.clear();
        navigate('/');
      })
      .catch((ex) => {
        console.error(ex);
        toast.error('Logout unsuccessful.');
        return Promise.reject(ex);
      });
  }

  return (
    <CurrentUserContext.Provider value={useMemo(() => ({ user, login, logout }), [user])}>
      {children}
    </CurrentUserContext.Provider>
  );
};
