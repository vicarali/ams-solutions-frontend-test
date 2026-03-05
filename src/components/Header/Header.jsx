import viteLogo from "/vite.svg";
import cartIcon from "/cart-icon.png";
import styles from "./Header.module.css";
import { Link, NavLink, useLocation } from "react-router";
import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext/CartContext";

export function Header() {
	const { cartItemsCount } = useContext(CartContext);
	const { pathname: currentPathname } = useLocation();

	return (
		<header className={styles.header}>
			<div className={styles.linksContainer}>
				<Link to="/">
					<img src={viteLogo} alt="Vite logo" className={styles.icon} />
				</Link>
				<NavLink to="/">Home</NavLink>
				{currentPathname !== "/" && (
					<>
						<span>{">"}</span>
						<NavLink to={currentPathname}>Product details</NavLink>
					</>
				)}
			</div>
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
