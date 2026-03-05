const ENDPOINT = "/api/product";

export async function getProducts() {
	await storeProducts();
	return localStorage.getItem("products");
}

async function storeProducts() {
	const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds
	const products = await fetchProducts();
	const productsTimestamp = localStorage.getItem("productsTimestamp");

	if (!productsTimestamp || productsTimestamp < Date.now() - CACHE_DURATION) {
		localStorage.setItem("products", JSON.stringify(products));
		localStorage.setItem("productsTimestamp", Date.now());
	}
}

async function fetchProducts() {
	return fetch(ENDPOINT)
		.then((response) => {
			if (!response.ok) {
				throw new Error("There was an error fetching the products");
			}

			return response.json();
		})
		.catch((error) => {
			console.error(error);
			throw error;
		});
}
