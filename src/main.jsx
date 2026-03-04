import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import { ProductListPage } from "./views/ProductListPage/ProductListPage.jsx";
import { Header } from "./components/Header/Header.jsx";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<BrowserRouter>
			<Header />
			<main id="main">
				<Routes>
					<Route path="/" element={<ProductListPage />} />
				</Routes>
			</main>
		</BrowserRouter>
	</StrictMode>
);
