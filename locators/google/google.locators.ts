export const googleLocators = {
  searchBox: {
    description: "Google Search Box",
    primary: 'textarea[name="wrong"]', // intentionally wrong
    fallbacks: ['textarea[title="Search"]','textarea[name="q"]', 'input[type="search"]'],
    text: null
  },

  searchResults: {
    description: "Search Results",
    primary: 'h3',
    fallbacks: [],
    text: null
  }
};