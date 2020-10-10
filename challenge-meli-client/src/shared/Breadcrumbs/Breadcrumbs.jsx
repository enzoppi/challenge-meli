import React from 'react';
import './Breadcrumbs.scss';

function Breadcrumbs(props) {
  return (
    <div className="Breadcrumbs">
      <ul className="Breadcrumbs-list">
        {props.breadcrumbs.map((crumb, index) => (
          <>
            <li className="Breadcrumbs-list-item" key={crumb}>
              <p>{crumb}</p>
            </li>
            {index + 1 !== props.breadcrumbs.length ? <li>&#62;</li>: ''}
          </>
          )
        )}
      </ul>
    </div>
  );
}

export default Breadcrumbs;
