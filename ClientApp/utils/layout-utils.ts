/**
 * Retrieves the tab index based on the current pathname and a mapping of paths to tab indices.
 *
 * This function searches through the provided `activeTabMap` for a key that matches the end of the `pathname`.
 * If a matching key is found, it returns the corresponding tab index from `activeTabMap`. Otherwise, it returns 0.
 *
 * @param {{pathname: string, activeTabMap: Record<string, number>}} params - An object containing the current pathname and the active tab map.
 * @param {string} params.pathname - The current pathname to search for a matching key in `activeTabMap`.
 * @param {Record<string, number>} params.activeTabMap - A record mapping pathnames to tab indices.
 * @returns {number} The tab index corresponding to the pathname, or 0 if no match is found.
 */
export const getTabIndexFromPathname = (
  pathname: string,
  activeTabMap: Record<string, number>,
): number | undefined => {
  const foundKey = Object.keys(activeTabMap).find((key) =>
    pathname.includes(key),
  );
  return foundKey ? activeTabMap[foundKey] : undefined;
};
