import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <img src="./FooterLogo.svg" alt="Лого" className="footerImg" />
      <div className="footer__info">
        <span>г. Москва, Цветной б-р, 40</span>
        <span className="tel">+7 495 771 21 11</span>
        <span className="mail">info@skan.ru</span>
        <span className="year">
          <br />
          Copyright. 2022
        </span>
      </div>
    </footer>
  );
};

export default Footer;
