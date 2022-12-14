const sum = (n1, n2) => {
  const int1 = parseInt(n1);
  const int2 = parseInt(n2);
  if (Number.isNaN(int1) || Number.isNaN(int2)) {
    throw new Error('Please check the input');
  }
  return int1 + int2;
};

export default sum;
