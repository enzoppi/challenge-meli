import React from 'react';
import './Searchbar.scss';

function Searchbar(props) {
  const searchItems = (e) => {
    e.preventDefault();
    props.onSearchItems();
  }

  return (
    <div className="Searchbar">
      <form onSubmit={searchItems} className="Searchbar-form">
        <input className="Searchbar-form-input" type="text" placeholder={props.placeholderText} value={props.inputValue} onChange={(e) => props.onInputChange(e.target.value)} />
        <button className="Searchbar-form-btn" type="submit">
          <div className="Searchbar-form-icon" aria-label="Buscar">
            <i className="fa fa-search"></i>
          </div>
        </button>
      </form>
    </div>
  );
}

export default Searchbar;
