import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Breadcrumbs from 'shared/Breadcrumbs/Breadcrumbs';
import ItemCard from './ItemCard/ItemCard';
import './SearchResults.scss';

function SearchResults(props) {
  const location = useLocation();
  const [items, setItems] = useState([]);
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getItemsFromAPI = async () => {
      const query = new URLSearchParams(location.search).get('q');
      const res = await fetch(`${process.env.REACT_APP_API_URL}/items?q=${query}&limit=4`);
      return await res.json();
    };

    const initResults = async () => {
      const results = await getItemsFromAPI();
      setBreadcrumbs(results.categories || []);
      setItems(results.items || []);
      setLoading(false);
    };

    initResults();
  }, [location.search]);

  return (
    <div className="SearchResults">
      <div className="SearchResults-breadcrumbs">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
      </div>
      <ul className="SearchResults-list">
        {items.length || loading ? 
          items.map((item) => (
            <li className="SearchResults-list-item" key={item.id}>
              <ItemCard item={item} />
            </li>
            )
          ) :
          <p className="SearchResults-noresults">No se encontraron resultados</p>
        }
      </ul>
    </div>
  );
}

export default SearchResults;
