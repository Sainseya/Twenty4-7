/**
 * A string array containing all existing and valid pages, use "" for the root
 */
const validPages: string[] = ["", "connexion", "nft", "cart"];
/**
 * Returns true if the page name passed in parameter is valid
 * @param pageName 
 * @returns true or false
 */
export const isPageValid = (pageName: string): boolean => {
    return validPages.includes(pageName.toLowerCase());
  };

export default validPages;