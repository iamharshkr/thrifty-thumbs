const levenshtein = require("fast-levenshtein");

// function to compare product names and return the index of the matching product
const findMatchingProduct = (store, title) => {
  let minDistance = 120;
  let matchingIndex = -1;

  store.forEach((product, index) => {
    const distance = levenshtein.get(product.title, title);
    if (distance < minDistance) {
      minDistance = distance;
      matchingIndex = index;
    }
  });

  return matchingIndex;
};

export const findSimilarProducts = (store) => {
  let keys = Object.keys(store);
  const products = [];

  // loop through each product in Amazon
  store[keys[0]].result.forEach((product) => {
    let found = [];
    for (let x = 1; x < keys.length; x++) {
      // try to find a matching product in Flipkart
      const matchedIndex = findMatchingProduct(
        store[keys[x]].result,
        product.title
      );
      if (matchedIndex !== -1) {
        // matching product found in Flipkart, add both products to products array
        found["title"] = product.title;
        found[keys[0]] = product;
        found[keys[x]] = store[keys[x]].result[matchedIndex];
        products.push(found);
      }
    }
  });
  return products;
};
