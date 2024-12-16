export function priceFormat(priceInCents){
  return (Math.round(priceInCents)/100).toFixed(2);
};
