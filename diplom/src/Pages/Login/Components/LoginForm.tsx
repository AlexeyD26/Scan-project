import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../contexts/UserContext';
import React, { useEffect } from 'react';
import { useContext } from 'react';

const LoginForm = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { isAuth, setIsAuth } = useContext(UserContext);

  const [formData, setFormData] = useState({ login: '', password: '' });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const sendData = (event: FormEvent) => {
    event.preventDefault();
    // const data = fetchData('/api/v1/account/login', 'POST', JSON.stringify(formData))
    fetch('/api/v1/account/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.errorCode && data.message) {
          setError(data.message);
        }

        const { accessToken, expire } = data;
        if (accessToken && expire) {
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('expire', expire);
          setIsAuth(true);
          navigate('/search');
        }
      })
      .catch((err) => console.error(err));
  };

  // const handleChangeLogin = (event: ChangeEvent<HTMLInputElement>) => {
  //   setLogin(event.target.value);
  // };

  // const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
  //   setPassword(event.target.value);
  // };

  useEffect(() => {
    if (isAuth) {
      navigate('/search');
    }
  }, [isAuth]);

  return (
    <form className="loginForm" onSubmit={sendData}>
      <img src="./lock.svg" alt="Lock" className="lock" />
      <div className="entrance">
        <span className="enter">Войти</span>
        <span className="register">Зарегистрироваться</span>
      </div>
      <div className="formInfo">
        <span>Логин или номер телефона:</span>
        <input
          type="text"
          className={error ? 'errorLogin1' : 'loginInput'}
          value={formData.login}
          name="login"
          onChange={handleChange}
        />
        <span>Пароль:</span>
        <input
          type="password"
          className={error ? 'errorLogin2' : 'loginInput'}
          value={formData.password}
          name="password"
          onChange={handleChange}
        />
        {error && <span className="loginError">{error}</span>}
        <button className="formButton" type="submit">
          ВОЙТИ
        </button>
        <span className="recover">Восстановить пароль</span>
        <span>Войти через:</span>
      </div>
      <div className="navButton">
        <button>
          <img src="./google.svg" alt="" />
        </button>
        <button>
          <img src="./facebook.svg" alt="" />
        </button>
        <button>
          <img src="./yandex.svg" alt="" />
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
