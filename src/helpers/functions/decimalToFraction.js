function decimalToFraction(decimal) {
  const lookup = {
    0.05: "1/20",
    0.1: "1/10",
    0.15: "3/20",
    0.2: "1/5",
    0.25: "1/4",
    0.3: "3/10",
    0.35: "7/20",
    0.4: "2/5",
    0.45: "9/20",
    0.5: "1/2",
    0.55: "11/20",
    0.6: "3/5",
    0.65: "13/20",
    0.7: "7/10",
    0.75: "3/4",
    0.8: "4/5",
    0.85: "17/20",
    0.9: "9/10",
    0.95: "19/20",
  };

  return lookup[decimal] || decimal;
}

export default decimalToFraction;