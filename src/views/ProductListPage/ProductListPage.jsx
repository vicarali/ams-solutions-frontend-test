import { ProductList } from "../../components/ProductList/ProductList";
import { useState, useEffect } from "react";
import { getProducts } from "./productsAPI";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { filterProducts } from "./searchFilter";

export function ProductListPage() {
	const [products, setProducts] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");

	useEffect(() => {
		(async () => {
			const products = await getProducts();
			setProducts(JSON.parse(products));
		})();
	}, []);

	function handleSearch(newSearchTerm) {
		setSearchTerm(newSearchTerm);
	}

	return (
		<>
			<SearchBar onChangeSearchTerm={handleSearch} searchTerm={searchTerm} />
			<ProductList products={filterProducts(products, searchTerm)} />
		</>
	);
}
