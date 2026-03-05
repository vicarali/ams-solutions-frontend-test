import viteLogo from "/vite.svg";
import styles from "./Header.module.css";
import { Link } from "react-router";

export function Header() {
	return (
		<header className={styles.header}>
			<Link to="/">
				<img src={viteLogo} className="logo" alt="Vite logo" />
			</Link>
		</header>
	);
}
