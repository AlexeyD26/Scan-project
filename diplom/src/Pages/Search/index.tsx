import './search.css';
import SearchForm from './Components/SearchForm/SearchForm';

const Search = () => {
  return (
    <div className="searchContainer">
      <div className="searchTitle">
        <h1>
          Найдите необходимые
          <br /> данные в пару кликов.
        </h1>
        <p>
          Задайте параметры поиска.
          <br /> Чем больше заполните, тем точнее поиск
        </p>
        <SearchForm />
      </div>
      <div className="searchImages">
        <img src="./Document.svg" alt="Document" className="document" />
        <img src="./Folders.svg" alt="Folders" className="Folders" />
        <img src="./SearchMan.svg" alt="SearchMan" className="SearchMan" />
      </div>
    </div>
  );
};

export default Search;
