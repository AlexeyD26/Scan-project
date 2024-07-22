interface ImageProps {
  src: string;
  alt: string;
}

interface PriceProps {
  newPrice: string;
  oldPrice: string;
  payment?: string;
}

interface InfoTextProps {
  one: string;
  two: string;
  three: string;
}

interface Rate {
  title: string;
  underTitle: string;
  img: ImageProps;
  price: PriceProps;
  infoText: InfoTextProps;
  buttonText: string;
  code: number;
}

export interface TariffProps {
  rate: Rate;
}
