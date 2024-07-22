import React, { ChangeEvent, FormEvent, InputHTMLAttributes, useState } from 'react';
import { SIGNS, TONALITIES } from './const';
import { Errors } from './types';
import DatePicker from 'react-datepicker';
import cn from 'classnames';
import 'react-datepicker/dist/react-datepicker.css';
import { validateDocs, validateInn, validateDates } from './validation';
import { useNavigate } from 'react-router-dom';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = (props: InputProps) => {
  const { className, ...restProps } = props;
  return <input {...restProps} type="text" className={cn('inputDate', className)} />;
};

const SearchForm = () => {
  const [inn, setInn] = useState('');
  const [docs, setDocs] = useState('');
  const [tonality, setTonality] = useState(TONALITIES[0].code);
  const [errors, setErrors] = useState<Errors>({});
  const [signs, setSigns] = useState(SIGNS);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const navigate = useNavigate();

  const handleChangeInn = (event: ChangeEvent<HTMLInputElement>) => {
    setInn(event.target.value);

    if (errors.inn) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        inn: undefined
      }));
    }
  };

  const handleChangeTonality = (event: ChangeEvent<HTMLSelectElement>) => {
    setTonality(event.target.value);

    if (errors.tonality) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        tonality: undefined
      }));
    }
  };

  const handleChangeDocs = (event: ChangeEvent<HTMLInputElement>) => {
    setDocs(event.target.value);

    if (errors.docs) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        docs: undefined
      }));
    }
  };

  const handleChangeSignValue = (event: ChangeEvent<HTMLInputElement>) => {
    const newSigns = signs.map((signItem) => {
      if (signItem.code === event.target.value) {
        return {
          ...signItem,
          value: !signItem.value
        };
      }

      return signItem;
    });

    setSigns(newSigns);
  };

  const handleStartDateChange = (date: Date | null) => {
    console.log('handleStartDateChange', date);
    setStartDate(date);

    if (errors.dates) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        dates: undefined
      }));
    }
  };

  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date);

    if (errors.dates) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        dates: undefined
      }));
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const formErrors = {
      ...validateInn(inn),
      ...validateDocs(docs),
      ...validateDates(startDate, endDate)
    };

    if (Object.keys(formErrors).length) {
      setErrors(formErrors);
    } else {
      const signParams: Record<string, boolean> = {};
      signs.forEach((sign) => {
        signParams[sign.code] = sign.value;
      });

      navigate('/searchResult', {
        state: {
          inn: Number(inn),
          tonality,
          limit: Number(docs),
          startDate,
          endDate,
          ...signParams
        }
      });
    }
  };

  // inn: 7710137066, limit: 1000
  // startDate: '2023-09-01T00:00:00+03:00',
  // endDate: '2024-04-13T23:59:59+03:00'
  // maxFullness: true, onlyMainRole: true, excludeTechNews: true,
  // excludeAnnouncements: true, excludeDigests

  return (
    <form className="searchForm" onSubmit={handleSubmit}>
      <div className="startForm">
        <h2>ИНН компании</h2>
        <input
          type="text"
          value={inn}
          onChange={handleChangeInn}
          placeholder="10 цифр"
          className={errors.inn ? 'formInputError1' : 'formInput'}
        />
        {errors.inn && <span className="error1">{errors.inn}</span>}
        <h2>Тональность</h2>
        <select value={tonality} onChange={handleChangeTonality} className="formList">
          {TONALITIES.map((item) => (
            <option key={item.code} value={item.code}>
              {item.title}
            </option>
          ))}
        </select>
        <h2>Количество документов в выдаче</h2>
        <input
          type="text"
          value={docs}
          onChange={handleChangeDocs}
          className={errors.docs ? 'formInputError2' : 'formInput'}
          placeholder="От 1 до 1000"
        />
        {errors.docs && <span className="error1">{errors.docs}</span>}
        <h2>Диапазон поиска</h2>
        <div className="twoInput">
          <DatePicker
            selected={startDate}
            onChange={handleStartDateChange}
            placeholderText="Дата начала"
            customInput={<Input className="startDate" />}
            dateFormat="dd.MM.yyyy"
          />

          <DatePicker
            selected={endDate}
            onChange={handleEndDateChange}
            placeholderText="Дата конца"
            customInput={<Input className="startDate" />}
            dateFormat="dd.MM.yyyy"
          />
        </div>
        {errors.dates && <span className="error1">{errors.dates}</span>}
      </div>
      <div className="endForm">
        <div className="labelList">
          {signs.map((item) => (
            <label key={item.code}>
              <input type="checkbox" value={item.code} onChange={handleChangeSignValue} />
              {item.title}
            </label>
          ))}
        </div>
        <button type="submit">Поиск</button>
        <p>* Обязательные к заполнению поля</p>
      </div>
    </form>
  );
};

export default SearchForm;
