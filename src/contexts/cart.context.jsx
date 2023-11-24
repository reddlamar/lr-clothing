import { createContext, useState, useEffect } from 'react';

const addCartItem = (cartItems, product) => {
	const existingCartItem = cartItems.find(
		(cartItem) => cartItem.id === product.id
	);

	if (existingCartItem) {
		return cartItems.map((cartItem) =>
			cartItem.id === product.id
				? { ...cartItem, quantity: cartItem.quantity + 1 }
				: cartItem
		);
	}

	return [...cartItems, { ...product, quantity: 1 }];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
	const existingCartItem = cartItems.find(
		(cartItem) => cartItemToRemove.id === cartItem.id
	);

	if (existingCartItem.quantity === 1) {
		return cartItems.filter((cartItem) => cartItemToRemove.id !== cartItem.id);
	}

	return cartItems.map((cartItem) =>
		cartItemToRemove.id === cartItem.id
			? { ...cartItem, quantity: cartItem.quantity - 1 }
			: cartItem
	);
};

const clearCartItem = (cartItems, cartItemToClear) =>
	cartItems.filter((cartItem) => cartItemToClear.id !== cartItem.id);

export const CartContext = createContext({
	isCartOpen: false,
	setIsCartOpen: () => {},
	cartItems: [],
	addItemToCart: () => {},
	removeItemFromCart: () => {},
	clearItemFromCart: () => {},
	cartCount: 0,
	totalPrice: 0,
});

export const CartProvider = ({ children }) => {
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [cartItems, setCartItems] = useState([]);
	const [cartCount, setCartCount] = useState(0);
	const [totalPrice, setTotalPrice] = useState(0);

	useEffect(() => {
		const newCartCount = cartItems.reduce(
			(total, cartItem) => total + cartItem.quantity,
			0
		);
		setCartCount(newCartCount);
	}, [cartItems]);

	useEffect(() => {
		const newTotalPrice = cartItems.reduce((totalPrice, cartItem) => {
			const currentPrice = cartItem.price * cartItem.quantity;
			return totalPrice + currentPrice;
		}, 0);
		setTotalPrice(newTotalPrice);
	}, [cartItems]);

	const addItemToCart = (product) => {
		setCartItems(addCartItem(cartItems, product));
	};

	const removeItemFromCart = (cartItem) => {
		setCartItems(removeCartItem(cartItems, cartItem));
	};

	const clearItemFromCart = (cartItem) => {
		setCartItems(clearCartItem(cartItems, cartItem));
	};

	const value = {
		isCartOpen,
		setIsCartOpen,
		cartItems,
		addItemToCart,
		cartCount,
		totalPrice,
		removeItemFromCart,
		clearItemFromCart,
	};

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
