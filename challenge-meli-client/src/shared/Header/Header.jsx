import React from 'react';
import './Header.scss';

function Header(props) {
  return (
    <div className="Header">
      <header className="Header-header">
        <div className="Header-children">
          {props.children}
        </div>
      </header>
    </div>
  );
}

export default Header;