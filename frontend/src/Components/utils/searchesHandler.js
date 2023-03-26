export const addToLocalStorage = (data) => {
  // Retrieve the item from local storage
  let item = localStorage.getItem("recent");
  if (item) {
    // Parse the item as JSON
    item = JSON.parse(item);

    // Check if the product name is already in the item
    const isProductPresent = item.some((p) => p === data);

    if (!isProductPresent) {
      // If not, append the new product to the item
      item.push(data);

      // Save the updated item to local storage
      localStorage.setItem("recent", JSON.stringify(item));
    }
  } else {
    localStorage.setItem("recent", JSON.stringify([data]));
  }
};

export const removeFromLocalStorage = (data) => {
  // Retrieve the item from local storage
  let item = localStorage.getItem("recent");

  // Parse the item as JSON
  item = JSON.parse(item);

  // Find the index of the product to be removed
  const productIndex = item.findIndex((p) => p === data);

  // Remove the product from the array
  item.splice(productIndex, 1);

  // Save the updated item to local storage
  localStorage.setItem("recent", JSON.stringify(item));
};

export const getLocalStorage = () => {
  // Check if the item is already in local storage
  return localStorage.getItem("recent");
};
