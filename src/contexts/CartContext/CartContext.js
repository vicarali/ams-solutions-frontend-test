import { createContext } from "react";

export const CartContext = createContext({
	cartItemsCount: 0,
	setCartItemsCount: () => {}
});
