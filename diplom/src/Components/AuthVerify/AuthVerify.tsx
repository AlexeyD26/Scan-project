import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import moment from 'moment';

interface AuthVerifyProps {
  logOut: () => void;
}

const AuthVerify = (props: AuthVerifyProps) => {
  const { logOut } = props;

  const location = useLocation();

  useEffect(() => {
    const expire = localStorage.getItem('expire');

    if (!expire) {
      return;
    }

    const expireDate = moment(expire);
    if (expireDate < moment()) {
      logOut();
    }
  }, [location]);

  return null;
};

export default AuthVerify;
