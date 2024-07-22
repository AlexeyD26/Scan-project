import { Navigate } from 'react-router-dom';
import { ReactElement, useContext, useEffect } from 'react';
import { UserContext } from '../../contexts/UserContext';
import moment from 'moment/moment';

interface ProtectedRouteProps {
  redirectPath?: string;
  children: ReactElement;
}

const ProtectedRoute = (props: ProtectedRouteProps): ReactElement => {
  const { redirectPath = '/login', children } = props;

  const { isAuth, setUser, setIsAuth } = useContext(UserContext);

  useEffect(() => {
    const expire = localStorage.getItem('expire');

    if (!expire) {
      return;
    }

    const expireDate = moment(expire);
    if (expireDate < moment()) {
      setUser(null);
      setIsAuth(false);
    }
  }, []);

  if (!isAuth) {
    return <Navigate to={redirectPath} />;
  }

  return children;
};

export default ProtectedRoute;
