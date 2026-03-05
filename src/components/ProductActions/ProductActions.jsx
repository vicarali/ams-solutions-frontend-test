import styles from "./ProductActions.module.css";
import { useState } from "react";

export function ProductActions({ product }) {
	const storages = product.options.storages || [];
	const colors = product.options.colors || [];
	const [selectedStorage, setSelectedStorage] = useState(storages[0]?.code);
	const [selectedColor, setSelectedColor] = useState(colors[0]?.code);

	return (
		<div className={styles.actionsContainer}>
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
			<button className="add-to-cart">Add to cart</button>
		</div>
	);
}
