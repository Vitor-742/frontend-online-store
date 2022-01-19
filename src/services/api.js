export async function getCategories() {
  const retorno = await fetch('https://api.mercadolibre.com/sites/MLB/categories').then((response) => response.json())
  return retorno
}

export async function getProductsFromCategoryAndQuery(/* categoryId, query */) {
  // Implemente aqui! Quando o fizer, descomente os parâmetros que essa função recebe
}
