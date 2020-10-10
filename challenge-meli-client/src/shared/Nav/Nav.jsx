import React from 'react';
import { NavLink } from 'react-router-dom';
import Search from 'shared/Search/Search';
import './Nav.scss';

function Nav(props) {
  return (
    <div className="Nav">
      <nav>
        <ul className="Nav-list">
          <li key="indentation" className="Nav-list-item Nav-indentation"></li>
          <li key="logo" className="Nav-list-item Nav-logo">
            <NavLink to="/">
              <img src="https://http2.mlstatic.com/frontend-assets/ui-navigation/5.10.3/mercadolibre/logo__small.png" alt="Mercado Libre"/>
            </NavLink>
          </li>
          <li key="searchbar" className="Nav-list-item Nav-searchbar">
            <Search />
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Nav;