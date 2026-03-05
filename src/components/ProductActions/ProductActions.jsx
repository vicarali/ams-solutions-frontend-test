import styles from "./ProductActions.module.css";
import { useState, useContext } from "react";
import { addProductToCart } from "./cartAPI";
import { CartContext } from "../../contexts/CartContext/CartContext";

export function ProductActions({ product }) {
	const storages = product.options.storages || [];
	const colors = product.options.colors || [];
	const [selectedStorage, setSelectedStorage] = useState(storages[0]?.code);
	const [selectedColor, setSelectedColor] = useState(colors[0]?.code);
	const { setCartItemsCount } = useContext(CartContext);

	async function handleFormSubmit(e) {
		e.preventDefault();

		const productOptions = {
			storageCode: selectedStorage,
			colorCode: selectedColor
		};

		const cartItemsCount = await addProductToCart(product.id, productOptions);
		setCartItemsCount(cartItemsCount);
	}

	return (
		<form className={styles.actionsContainer} onSubmit={handleFormSubmit}>
			<select
				name="storage"
				id="storage"
				value={selectedStorage}
				onChange={(e) => setSelectedStorage(e.target.value)}
			>
				{storages.map((storage) => (
					<option key={storage.code} value={storage.code}>
						{storage.name}
					</option>
				))}
			</select>
			<select
				name="colors"
				id="colors"
				value={selectedColor}
				onChange={(e) => setSelectedColor(e.target.value)}
			>
				{colors.map((color) => (
					<option key={color.code} value={color.code}>
						{color.name}
					</option>
				))}
			</select>
			<button>Add to cart</button>
		</form>
	);
}
