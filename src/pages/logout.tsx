import React, { useEffect, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import useCurrentUser from '../providers/current-user';
import Loading from '../components/loading';

const LogoutPage: FC = function LogoutPage() {
  const navigate = useNavigate();
  const { logout } = useCurrentUser();

  useEffect(() => {
    logout().then(() => {
      navigate('/login');
    });
  }, []);

  return (
    <Loading />
  );
};

export default LogoutPage;
