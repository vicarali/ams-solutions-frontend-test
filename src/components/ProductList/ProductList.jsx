import styles from "./ProductList.module.css";

export function ProductList({ products }) {
	return (
		<ul className={styles.productList}>
			{products &&
				products.map((product) => (
					<ProductListItem key={product.id} product={product} />
				))}
		</ul>
	);
}

function ProductListItem({ product }) {
	return (
		<li className={styles.productItem}>
			<img src={product.imgUrl} alt={product.name} />
			<p>
				{product.brand} | {product.model}
			</p>
			<p className={styles.price}>{product.price}€</p>
		</li>
	);
}
