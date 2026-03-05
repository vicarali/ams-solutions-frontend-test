import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import { ProductListPage } from "./views/ProductListPage/ProductListPage.jsx";
import { Header } from "./components/Header/Header.jsx";
import { ProductDetailsPage } from "./views/ProductDetailsPage/ProductDetailsPage.jsx";
import { CartContextProvider } from "./contexts/CartContext/CartContextProvider.jsx";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<BrowserRouter>
			<CartContextProvider>
				<Header />
				<main id="main">
					<Routes>
						<Route path="/" element={<ProductListPage />} />
						<Route path="/product/:id" element={<ProductDetailsPage />} />
					</Routes>
				</main>
			</CartContextProvider>
		</BrowserRouter>
	</StrictMode>
);
