export async function addProductToCart(id, options) {
	const ENDPOINT = "/api/cart";
	const PAYLOAD = {
		id,
		storageCode: options.storageCode,
		colorCode: options.colorCode
	};

	return fetch(ENDPOINT, {
		method: "POST",
		body: JSON.stringify(PAYLOAD),
		headers: {
			"Content-Type": "application/json"
		}
	})
		.then(async (response) => {
			if (!response.ok) {
				throw new Error("There was an error adding the product to the cart");
			}

			const responseData = await response.json();
			localStorage.setItem("cartItemsCount", responseData.count);
			return responseData.count;
		})
		.catch((error) => {
			console.error(error);
			throw error;
		});
}
