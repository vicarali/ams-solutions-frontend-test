const ENDPOINT = "/api/product";

export async function getProduct(id) {
	await storeProduct(id);
	return localStorage.getItem("lastProductViewed");
}

async function storeProduct(id) {
	const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds
	const product = await fetchProduct(id);
	const productTimestamp = localStorage.getItem("lastProductViewedTimestamp");
	const storedProduct = JSON.parse(localStorage.getItem("lastProductViewed"));

	if (
		storedProduct?.id !== id ||
		!productTimestamp ||
		productTimestamp < Date.now() - CACHE_DURATION
	) {
		localStorage.setItem("lastProductViewed", JSON.stringify(product));
		localStorage.setItem("lastProductViewedTimestamp", Date.now());
	}
}

async function fetchProduct(productId) {
	return fetch(`${ENDPOINT}/${productId}`)
		.then((response) => {
			if (!response.ok) {
				throw new Error("There was an error fetching the product");
			}

			return response.json();
		})
		.catch((error) => {
			console.error(error);
			throw error;
		});
}
