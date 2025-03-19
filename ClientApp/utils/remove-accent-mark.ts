/**
 * Removes accent marks (diacritics) from a string.
 * @param {string} str - The input string containing accent marks.
 * @param {boolean} [toLowerCase=false] - Flag to convert the string to lowercase after removing accent marks. Default is false.
 * @returns {string} - The string without accent marks.
 */
const removeAccentMark = (
  str: string,
  toLowerCase: boolean = false,
): string => {
  const normalizedStr = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return toLowerCase ? normalizedStr.toLowerCase() : normalizedStr;
};

export default removeAccentMark;
