const camelCaseToNormalString = (string) => {
  return string
    .replace(/([A-Z])/g, " $1")
    .replace(/_/g, " ")
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
};

module.exports = {
  camelCaseToNormalString,
};
