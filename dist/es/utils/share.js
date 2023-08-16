var toHump = function toHump(str) {
  var separator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '-';
  var reg = new RegExp('\\' + separator + '(\\w)', 'g');
  return str.replace(reg, function (all, letter) {
    return letter.toUpperCase();
  });
};

export { toHump };
