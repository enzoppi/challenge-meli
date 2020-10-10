import React from 'react';
import './Header.scss';

function Header(props) {
  return (
    <div className="Header">
      <header className="Header-header">
        {props.children}
      </header>
    </div>
  );
}

export default Header;
