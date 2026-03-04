export function filterProducts(products, searchTerm) {
	return products.filter((product) => {
		const searchTermFilter = searchTerm.toLowerCase();
		const brand = product.brand.toLowerCase();
		const model = product.model.toLowerCase();

		return brand.includes(searchTermFilter) || model.includes(searchTermFilter);
	});
}
