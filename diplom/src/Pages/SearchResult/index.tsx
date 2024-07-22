import React, { useEffect, useState } from 'react';
import '../SearchResult/index.css';
import '../SearchResult/histogram.css';
import '../SearchResult/document.css';
import Histograms from './Components/Histograms/Histograms';
import Documents from './Components/Documents/Documents';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import SwiperCore from 'swiper';

const SearchResult = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const swiperRef = useRef<SwiperCore | null>(null);
  const [visibleCount, setVisibleCount] = useState(10);

  useEffect(() => {
    if (!state) {
      navigate('/search');
    }
  }, [navigate, state]);

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  const handleShowMoreDocuments = () => {
    setVisibleCount((prevCount) => prevCount + 10);
  };

  return (
    <main className="main">
      <div className="title1">
        <div className="titleText">
          <h1>
            Ищем. Скоро <br />
            будут результаты
          </h1>
          <p>
            Поиск может занять некоторое время,
            <br /> просим сохранять терпение.
          </p>
        </div>
        <img src="./girl.svg" alt="girl" />
      </div>
      <div className="summary">
        <h2>Общая сводка</h2>
        <div className="summaryContainer">
          <img src="./arrow1.svg" alt="arrow1" className="prevButton" onClick={handlePrev} />
          <div className="summaryInfoTitle">
            <p>Период</p>
            <p>Всего</p>
            <p>Риски</p>
          </div>
          <Histograms ref={swiperRef} />
          <img src="./arrow2.svg" alt="arrow2" className="nextButton" onClick={handleNext} />
        </div>
      </div>
      <h3>Список документов</h3>
      <div className="newsContainer">
        <Documents visibleCount={visibleCount} />
      </div>
      <button className="bottomButton" onClick={handleShowMoreDocuments}>
        Показать больше
      </button>
    </main>
  );
};

export default SearchResult;
