import viteLogo from "/vite.svg";
import cartIcon from "/cart-icon.png";
import styles from "./Header.module.css";
import { Link } from "react-router";
import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext/CartContext";

export function Header() {
	const { cartItemsCount } = useContext(CartContext);

	return (
		<header className={styles.header}>
			<Link to="/">
				<img src={viteLogo} alt="Vite logo" className={styles.icon} />
			</Link>
			<div className={styles.cartContainer}>
				<img
					src={cartIcon}
					alt="Cart icon"
					className={`${styles.icon} ${styles.cartIcon}`}
				/>
				{cartItemsCount > 0 && (
					<span className={styles.cartBadge}>{cartItemsCount}</span>
				)}
			</div>
		</header>
	);
}
