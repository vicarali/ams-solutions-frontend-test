import styles from "./ProductList.module.css";
import { Link } from "react-router";

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
			<Link to={`/product/${product.id}`}>
				<img
					src={product.imgUrl}
					alt={product.name}
					className={styles.productImg}
				/>
				<p>
					{product.brand} | {product.model}
				</p>
				<p className={styles.price}>{product.price}€</p>
			</Link>
		</li>
	);
}
