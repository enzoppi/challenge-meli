import React from 'react';
import { NavLink } from 'react-router-dom';
import 'utils/currency-utils';
import { formatPrice, getDecimals } from 'utils/currency-utils';
import './ItemCard.scss';

function ItemCard(props) {
  const decimalDisplay = (price) => {
    const amount = price.amount.toFixed(price.decimals);
    const decimals = getDecimals(amount);
    if (decimals !== '00') {
      return <sup>{decimals}</sup>;
    }
  }

  return (
    <div className="ItemCard">
      <div className="ItemCard-image">
        <NavLink to={`/items/${props.item.id}`}>
          <img src={props.item.picture} alt={props.item.title} />
        </NavLink>
      </div>
      <div className="ItemCard-content">
        <div className="ItemCard-content-item ItemCard-content-price">
          <span>$  </span>
          <span>{formatPrice(props.item.price.amount)}</span>
          {decimalDisplay(props.item.price)}
        </div>
        <h2 className="ItemCard-content-item ItemCard-content-title">{props.item.title}</h2>
      </div>
    </div>
  );
}

export default ItemCard;
