export const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID').format(price);
};

export const formatPriceWithCurrency = (price) => {
  return `Rp ${formatPrice(price)}`;
};

export const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('id-ID', options);
};

export const getInitials = (name) => {
  return name.charAt(0).toUpperCase();
};

export const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result.toISOString().split('T')[0];
};
