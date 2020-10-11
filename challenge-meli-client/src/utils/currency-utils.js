export function formatPrice(amount) {
  return amount.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function getDecimals(amount) {
  return amount.toString().split('.')[1];
}

export default { formatPrice, getDecimals };