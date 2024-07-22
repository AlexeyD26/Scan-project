import './login.css';
import LoginForm from './Components/LoginForm';

export const LoginPage = () => {
  return (
    <div className="container">
      <div className="titleInfo">
        <h1 className="title">
          Для оформления подписки
          <br /> на тариф, необходимо <br />
          авторизоваться.
        </h1>
        <img src="./key.svg" alt="Key" className="key" />
      </div>
      <LoginForm />
      <img src="./key.svg" alt="Key" className="key2" />
    </div>
  );
};

export default LoginPage;
