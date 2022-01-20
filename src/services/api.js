export async function getCategories() {
  const retorno = await fetch('https://api.mercadolibre.com/sites/MLB/categories').then((response) => response.json());
  return retorno;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const retorno = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}_ID&q=${query}`).then((response) => response.json());
  return retorno;
}

export async function getProductsFromCategory(categoryId) {
  const results = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`)
    .then((response) => response.json());
  return results;
}

export async function getProductsFromQuery(query) {
  const retorno = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${query}`)
    .then((response) => response.json())
    .then((data) => data.results);
  return retorno;
}
