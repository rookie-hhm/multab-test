export const toHump = (str, separator = '-') => {
  const reg = new RegExp('\\' + separator + '(\\w)', 'g')
  return str.replace(reg, (all, letter) => letter.toUpperCase())
}