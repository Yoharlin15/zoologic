import removeAccentMark from "./remove-accent-mark";

/**
 * Checks whether a provided string, potentially with accents, contains a specific search text.
 * @param {string | undefined} option - The input string or undefined.
 * @param {string} searchText - The text to search for within the input string.
 * @returns {boolean} - Indicates whether the provided string, after removing accents, contains the search text.
 */
const matchesSearchText = (
  searchText?: string,
  option?: string | undefined,
): boolean =>
  removeAccentMark(option ?? "", true)?.includes(
    removeAccentMark(searchText ?? "", true),
  );

export default matchesSearchText;
