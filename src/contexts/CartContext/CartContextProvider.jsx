import { CartContext } from "./CartContext";
import { useState } from "react";

export function CartContextProvider({ children }) {
	const [cartItemsCount, setCartItemsCount] = useState(
		localStorage.getItem("cartItemsCount")
	);
	const value = { cartItemsCount, setCartItemsCount };

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
