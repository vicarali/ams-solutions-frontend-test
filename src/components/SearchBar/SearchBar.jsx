import searchIcon from "/search-icon.png";
import styles from "./SearchBar.module.css";

export function SearchBar({ onChangeSearchTerm, searchTerm }) {
	return (
		<div className={styles.searchBarContainer}>
			<img src={searchIcon} alt="" className={styles.searchIcon} />
			<input
				type="text"
				placeholder="Search for a product..."
				className={styles.searchBar}
				value={searchTerm}
				onChange={(e) => onChangeSearchTerm(e.target.value)}
			/>
		</div>
	);
}
