import { TariffProps } from './types';
import { rates } from './constans';

const Tariff: React.FC<TariffProps> = ({ rate }) => {
  return (
    <div className="tariff">
      <div className={`tariffTitle tariffTitle-${rate.code}`}>
        <h3>{rate.title}</h3>
        <div className="titleAndImg">
          <p>{rate.underTitle}</p>
          <img src={rate.img.src} alt={rate.img.alt} className={`img img-${rate.code}`} />
        </div>
      </div>
      <div className={`tariffInfo tariffInfo-${rate.code}`}>
        <span className={rate.code === 2 ? 'spanInfo' : ''}>
          <strong className="newPrice">{rate.price.newPrice}</strong>
          {rate.price.oldPrice && <del className="oldPrice">{rate.price.oldPrice}</del>}
        </span>
        <p>{rate.price.payment}</p>
        <h4>В тариф входит:</h4>
        <div className="list">
          <p>{rate.infoText.one}</p>
          <p>{rate.infoText.two}</p>
          <p>{rate.infoText.three}</p>
        </div>
        <button>{rate.buttonText}</button>
      </div>
    </div>
  );
};

function Tariffs() {
  return (
    <>
      {rates.map((rate) => (
        <Tariff key={rate.code} rate={rate} />
      ))}
    </>
  );
}

export default Tariffs;
