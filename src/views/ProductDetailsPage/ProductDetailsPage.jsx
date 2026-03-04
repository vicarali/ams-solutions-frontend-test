import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getProduct } from "./productAPI";
import styles from "./ProductDetailsPage.module.css";

export function ProductDetailsPage() {
	const { id } = useParams();
	const [product, setProduct] = useState();

	useEffect(() => {
		(async () => {
			const product = await getProduct(id);
			setProduct(JSON.parse(product));
		})();
	}, [id]);

	return (
		<div className={styles.productContainer}>
			{product && (
				<>
					<img src={product.imgUrl} alt={product.name} />
					<div>
						<h1 className={styles.title}>Product description</h1>
						<ul>
							<li>Brand: {product.brand}</li>
							<li>Model: {product.model}</li>
							<li>Price: {product.price}€</li>
							<li>CPU: {product.cpu}</li>
							<li>RAM: {product.ram}</li>
							<li>OS: {product.os}</li>
							<li>Display resolution: {product.displayResolution}</li>
							<li>Battery: {product.battery}</li>
							<li>Camera: {product.primaryCamera}</li>
							<li>Dimentions: {product.dimentions}</li>
							<li>Weight: {product.weight}</li>
						</ul>
					</div>
				</>
			)}
		</div>
	);
}
