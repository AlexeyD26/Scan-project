import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SearchResult from './Pages/SearchResult';
import Header from './Components/Header/MainHeader/Header';
import Footer from './Components/Footer/MainFooter/Footer';
import HomePage from './Pages/Home';
import LoginPage from './Pages/Login';
import Search from './Pages/Search';
import { UserContext } from './contexts/UserContext';
import './index.css';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem('accessToken'));

  const fetchInfo = () => {
    fetch('https://gateway.scan-interfax.ru/api/v1/account/info', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw Error('Ошибка на сервере');
        }

        return response.json();
      })
      .then((data: User) => {
        setUser(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (isAuth) {
      fetchInfo();
    }
  }, [isAuth]);

  return (
    <UserContext.Provider value={{ user, isAuth, setUser, setIsAuth }}>
      <Header />
      {/* <MobileMenu/> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/search"
          element={
            <ProtectedRoute>
              <Search />
            </ProtectedRoute>
          }
        />
        <Route
          path="/searchResult"
          element={
            <ProtectedRoute>
              <SearchResult />
            </ProtectedRoute>
          }
        />
        <Route path='*' element={ <Navigate to="/" replace /> }/>
      </Routes>
      <Footer />
    </UserContext.Provider>
  );
}
