import React, { useContext, useState, useEffect } from 'react';
import './Header.css';
import UserInfo from '../UserInfo/UserInfo';
import { UserContext } from '../../../contexts/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import MobileMenu from '../MobileMenu/MobileMenu';

const Header = () => {
  const { user, isAuth } = useContext(UserContext);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  const openMenu = () => {
    setIsVisible(!isVisible);
  };

  const goToLogin = () => {
    navigate('/login');
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 800) {
        setIsVisible(false);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      {isVisible === false ? (
        <header className="header">
          <Link to="/">
            <img src="/Logo.svg" alt="Лого" className="header__img" />
          </Link>
          <ul className="header__ul">
            <a href="/">Главная</a>
            <a href="">Тарифы</a>
            <a href="">FAQ</a>
          </ul>
          {isAuth ? (
            <UserInfo user={user} />
          ) : (
            <div className="header__entrance">
              <span>Зарегистрироваться</span>
              <div className="line"></div>
              <Link to={'/login'}>
                <button className="header__button" onClick={goToLogin}>
                  Войти
                </button>
              </Link>
            </div>
          )}
          <div id="nav-btn" onClick={openMenu}></div>
        </header>
      ) : (
        <MobileMenu />
      )}
    </>
  );
};

export default Header;
