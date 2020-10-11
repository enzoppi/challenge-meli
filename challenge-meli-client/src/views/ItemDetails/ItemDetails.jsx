import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumbs from 'shared/Breadcrumbs/Breadcrumbs';
import { conditionString } from 'utils/condition-utils';
import { formatPrice, getDecimals } from 'utils/currency-utils';
import './ItemDetails.scss';

function ItemDetails(props) {
  const { id } = useParams();
  const [item, setItem] = useState({});
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [loading, setLoading] = useState(true);

  const decimalDisplay = (price) => {
    if (!price) return;
    const amount = price.amount.toFixed(price.decimals);
    const decimals = getDecimals(amount);
    if (decimals !== 0) {
      return <sup>{decimals}</sup>;
    }
  }

  useEffect(() => {
    const getItemFromApi = async () => {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/items/${id}`);
      return await res.json();
    };

    const initResults = async () => {
      const result = await getItemFromApi();
      setBreadcrumbs(result.item.categories || []);
      setItem(result.item || {});
      setLoading(false);
    };
  
    initResults();
  }, []);

  return (
    <div className="ItemDetails">
      <div className="ItemDetails-breadcrumbs">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
      </div>
      {loading ? '' :
        <div className="ItemDetails-wrapper">
          <div className="ItemDetails-summary">
            <div className="ItemDetails-summary-image">
              <img src={item.picture} alt={item.title} />
            </div>
            <div className="ItemDetails-summary-description">
              <h2 className="ItemDetails-summary-description--title">
                Descripción del producto
              </h2>
              <p className="ItemDetails-summary-description--text">
                {item.description}
              </p>
            </div>
          </div>
          <div className="ItemDetails-details">
            <span className="ItemDetails-details-misc">{conditionString[item.condition]} - {item.sold_quantity} vendidos</span>
            <h2 className="ItemDetails-details-title">{item.title}</h2>
            <div className="ItemDetails-details-price">
              <span>$  </span>
              <span>{formatPrice(item.price.amount)}</span>
              {decimalDisplay(item.price)}
            </div>
            <button className="ItemDetails-details-btn">Comprar</button>
          </div>
        </div>
      }
    </div>
  );
}

export default ItemDetails;
