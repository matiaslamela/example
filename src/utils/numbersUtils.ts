function isNumber(value) {
  return !isNaN(value) && isFinite(value);
}

function isPositiveNumber(value: string | number) {
  return isNumber(value) && value > 0;
}

export default {
  isNumber,
  isPositiveNumber,
};
