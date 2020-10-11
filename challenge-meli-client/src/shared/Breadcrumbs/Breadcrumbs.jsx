import React from 'react';
import './Breadcrumbs.scss';

function Breadcrumbs(props) {
  return (
    <div className="Breadcrumbs">
      <ul className="Breadcrumbs-list">
        {props.breadcrumbs?.map((crumb, index) => (
          <li className="Breadcrumbs-list-item" key={crumb}>
            <span className="Breadcrumbs-list-item--name">{crumb}</span>
            {index + 1 !== props.breadcrumbs.length ? 
              <span key={crumb + 'Separator'}>&#62;</span> :
              ''}
          </li>
          )
        )}
      </ul>
    </div>
  );
}

export default Breadcrumbs;
