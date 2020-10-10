import React, { useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Searchbar from 'shared/Searchbar/Searchbar';
import './Search.scss';

function Search(props) {
  const location = useLocation();
  const history = useHistory();
  const handleOnSearch = useCallback((inputValue) => history.push('/items?q=' + inputValue), [history]);
  // @todo: is it okay not to use state in cases like this?
  const query = new URLSearchParams(location.search).get('q');

  return (
    <div className="Search">
      <Searchbar placeholderText="Nunca dejes de buscar" inputValue={query} onSearchItems={handleOnSearch} />
    </div>
  );
}

export default Search;
