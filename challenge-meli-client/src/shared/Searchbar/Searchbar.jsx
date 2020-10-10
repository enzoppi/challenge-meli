import React from 'react';
import './Searchbar.scss';

function Searchbar(props) {
  return (
    <div className="Searchbar">
      <form onSubmit={(e) => props.onSearchItems(e.target.value)}>
        <input className="Searchbar-input" type="text" placeholder={props.placeholderText} value={props.inputValue} />
        <button className="Searchbar-btn" type="submit">
          <div className="Searchbar-icon" aria-label="Buscar">
            <i className="fa fa-search"></i>
          </div>
        </button>
      </form>
    </div>
  );
}

export default Searchbar;
