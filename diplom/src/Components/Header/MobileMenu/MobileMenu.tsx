import './MobileMenu.css';
import { useState, useContext } from 'react';
import Header from '../MainHeader/Header';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../../contexts/UserContext';

const MobileMenu = () => {
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();
  const { user, isAuth } = useContext(UserContext);

  const closeMenu = () => {
    setIsVisible(!isVisible);
  };

  const goToLogin = () => {
    setIsVisible(!isVisible);
    navigate('/login');
  };

  return (
    <>
      {isVisible === false ? (
        <Header />
      ) : (
        <div className="mobileMenuContainer">
          <div className="mobileMenuStart">
            <Link to="/">
              <img src="./MobileLogo.svg" alt="logo" />
            </Link>
            <img src="./cross.svg" alt="cross" onClick={closeMenu} />
          </div>
          <nav className="mobileMenuNavigation">
            <ul className="mobileMenuList">
              <a href="/">Главная</a>
              <a href="">Тарифы</a>
              <a href="">FAQ</a>
            </ul>
          </nav>
          {isAuth ? (
            <button className="exitButton">Выйти</button>
          ) : (
            <div className="mobileMenuButtons">
              <p>Зарегистрироваться</p>
              <Link to={'/login'} className="link">
                <button className="entranceButton" onClick={goToLogin}>
                  Войти
                </button>
              </Link>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default MobileMenu;
