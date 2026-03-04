import viteLogo from "/vite.svg";
import styles from "./Header.module.css";

export function Header() {
	return (
		<header className={styles.header}>
			<a href="https://vite.dev" target="_blank">
				<img src={viteLogo} className="logo" alt="Vite logo" />
			</a>
		</header>
	);
}
