export default ({ rate, period }) =>
  (Math.pow(1 + rate, period) - 1) / rate / period;
