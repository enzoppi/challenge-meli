import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Breadcrumbs from 'shared/Breadcrumbs/Breadcrumbs';
import ItemCard from 'shared/ItemCard/ItemCard';
import './SearchResults.scss';

function SearchResults(props) {
  const location = useLocation();
  const [items, setItems] = useState([]);
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  useEffect(() => {
    const getItemsFromAPI = async () => {
      const {query} = new URLSearchParams(location.search).get('q');
      const res = await fetch(`${process.env.REACT_APP_API_URL}/items?q=${query}`);
      const items = await res.json();
      return items;
    };

    const initResults = async () => {
      const items = await getItemsFromAPI();
      setBreadcrumbs();
      setItems(items);
    };
  

    initResults();
  }, [location.search]);

  return (
    <div className="SearchResults">
      <div>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
      </div>
      <ul className="results-list">
        {items.map((item) => <ItemCard item={item} />)}
      </ul>
    </div>
  );
}

export default SearchResults;
