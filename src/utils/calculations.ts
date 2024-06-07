// item price after discount calculation

export function calculateItemPriceAfterDiscount(
  e: Event,
  items: any[],
  priceKey: string,
  discountKey: string,
  priceAfterDiscountKey: string
) {
  const target = e.target as HTMLInputElement;
  const [name, index] = target.id.split("-");
  if (name === priceKey || name === discountKey) {
    items[index][priceAfterDiscountKey] = getPriceAfterDiscount(
      items[index][priceKey],
      items[index][discountKey]
    ).toFixed(2);
  }
}

export function getPriceAfterDiscount(price: number, discount: number) {
  return price - price * (discount / 100);
}
