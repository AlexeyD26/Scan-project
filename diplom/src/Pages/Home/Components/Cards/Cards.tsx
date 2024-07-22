import React, { useCallback, useEffect, useState } from 'react';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import MOBILE_SCREEN_MAX_WIDTH from './constans';
import ArrowPrev from '../../../../assets/images/arrow1.svg';
import ArrowNext from '../../../../assets/images/arrow2.svg';
import { Rate, CardsProps } from '../Cards/types';
import { rates } from '../Cards/constans';

export const Card: React.FC<CardsProps> = ({ rate }) => {
  return (
    <div className="card">
      <img src={rate.img} alt={rate.alt} />
      <p>{rate.text}</p>
    </div>
  );
};

function Cards() {
  const [width, setWidth] = useState<number>(window.innerWidth);
  const [swiperRef, setSwiperRef] = useState<SwiperClass>();

  const handlePrevious = useCallback(() => {
    swiperRef?.slidePrev();
  }, [swiperRef]);

  const handleNext = useCallback(() => {
    swiperRef?.slideNext();
  }, [swiperRef]);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);

    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  return (
    <div className="swiper-container">
      <img src={ArrowPrev} alt="arrow1" className="swiper-button-prev" onClick={handlePrevious} />
      <Swiper
        className="swiper-home"
        spaceBetween={10}
        slidesPerView={width < MOBILE_SCREEN_MAX_WIDTH ? 1 : 3}
        onSwiper={setSwiperRef}
        loop
        navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        }}
      >
        {rates.map((rate) => (
          <SwiperSlide key={rate.code}>
            <Card rate={rate} />
          </SwiperSlide>
        ))}
      </Swiper>
      <img src={ArrowNext} alt="arrow2" className="swiper-button-next" onClick={handleNext} />
    </div>
  );
}

export default Cards;
