import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useCurrentUser from '../providers/current-user';

export default function useAuthenticated(to?: string) {
  const navigate = useNavigate();
  const { user } = useCurrentUser();

  useEffect(() => {
    if (!user) navigate(to || -1);
  }, [user]);
}
