import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Searchbar from 'shared/Searchbar/Searchbar';
import './Search.scss';

function Search(props) {
  const location = useLocation();
  const history = useHistory();
  const [searchValue, setSearchValue] = useState('');
  const handleOnSearch = useCallback(() => history.push('/items?q=' + searchValue), [history, searchValue]);

  useEffect(() => {
    const query = new URLSearchParams(location.search).get('q');
    if (query) {
      setSearchValue(query);
    }
  }, [location.search]);

  return (
    <div className="Search">
      <Searchbar placeholderText="Nunca dejes de buscar" inputValue={searchValue} onInputChange={setSearchValue} onSearchItems={handleOnSearch} />
    </div>
  );
}

export default Search;
