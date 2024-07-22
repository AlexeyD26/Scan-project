import { useEffect, useState, useRef, forwardRef } from 'react';
import { useHistogramData, HistogramColumn } from '../../hooks/useHistogramData';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import 'swiper/swiper-bundle.css';
import styles1 from '../../searchResult.module.css';
import { useLocation } from 'react-router-dom';
import MOBILE_SCREEN_MAX_WIDTH from '../../../Home/Components/Cards/constans';

interface Info {
  period: string;
  total: number;
  risks: number;
}

interface InfoProps {
  columnData: HistogramColumn;
}

const Column: React.FC<InfoProps> = ({ columnData }) => {
  return (
    <div className="summaryInfoBlock">
      <p>{columnData.date}</p>
      <p>{columnData.totalDocuments}</p>
      <p>{columnData.riskFactors}</p>
    </div>
  );
};

const Histograms = forwardRef<SwiperCore | null>((props, ref) => {
  const { data, fetchData } = useHistogramData();
  const [width, setWidth] = useState<number>(window.innerWidth);
  const swiperRef = useRef<SwiperCore | null>(null);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);

    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (swiperRef.current && ref) {
      if (typeof ref === 'function') {
        ref(swiperRef.current);
      } else {
        ref.current = swiperRef.current;
      }
    }
  }, [ref]);

  return (
    <Swiper
      className="swiper-histogram"
      spaceBetween={20}
      slidesPerView={width < MOBILE_SCREEN_MAX_WIDTH ? 1 : 9}
      onSwiper={(swiper: SwiperCore) => (swiperRef.current = swiper)}
      loop
    >
      {data.map((item) => (
        <SwiperSlide key={item.date}>
          <Column columnData={item} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
});

export default Histograms;
