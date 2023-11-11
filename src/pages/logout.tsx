import React, { useEffect, FC } from 'react';
import useCurrentUser from '../providers/current-user';
import Loading from '../components/loading';

const LogoutPage: FC = function LogoutPage() {
  const { logout } = useCurrentUser();

  useEffect(() => {
    logout();
  }, []);

  return (
    <Loading />
  );
};

export default LogoutPage;
