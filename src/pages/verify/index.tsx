import React, { useEffect, useState, FC } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import apiClient from '../../api-client';

const VerifyEmailPage: FC = function VerifyEmailPage() {
  const navigate = useNavigate();
  const { token } = useParams<{ token: string }>();
  const [isInvalid, setIsInvalid] = useState(false);

  useEffect(() => {
    apiClient.post(`/users/verify/${token}`)
      .then(() => {
        navigate('/login');
      })
      .catch((ex) => {
        console.error(ex);
        setIsInvalid(true);
      });
  }, []);

  return isInvalid ? (
    <p>
      Invalid verification URL.
      <Link to="/verify/resend">Resend&hellip;</Link>
    </p>
  ) : (
    <p>Loading&hellip;</p>
  );
};

export default VerifyEmailPage;
