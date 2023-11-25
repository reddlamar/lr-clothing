import { createContext, useReducer } from 'react';
import { createAction } from '../utils/reducer/reducer.utils';

const CART_ACTION_TYPES = {
	SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
	SET_CART_ITEMS: 'SET_CART_ITEMS',
};

const INITIAL_STATE = {
	isCartOpen: false,
	cartItems: [],
	cartCount: 0,
	totalPrice: 0,
};

const cartReducer = (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case CART_ACTION_TYPES.SET_CART_ITEMS:
			return {
				...state,
				...payload,
			};
		case CART_ACTION_TYPES.SET_IS_CART_OPEN:
			return {
				...state,
				isCartOpen: payload,
			};
		default:
			throw new Error(`Unhandled type ${type} in the cartReducer`);
	}
};

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
	const [{ isCartOpen, cartItems, cartCount, totalPrice }, dispatch] =
		useReducer(cartReducer, INITIAL_STATE);

	const addItemToCart = (product) => {
		const newCartItems = addCartItem(cartItems, product);
		updateCartItemsReducer(newCartItems);
	};

	const removeItemFromCart = (cartItem) => {
		const newCartItems = removeCartItem(cartItems, cartItem);
		updateCartItemsReducer(newCartItems);
	};

	const clearItemFromCart = (cartItem) => {
		const newCartItems = clearCartItem(cartItems, cartItem);
		updateCartItemsReducer(newCartItems);
	};

	const updateCartCount = (newCartItems) => {
		return newCartItems.reduce(
			(total, cartItem) => total + cartItem.quantity,
			0
		);
	};

	const updateTotalPrice = (newCartItems) => {
		return newCartItems.reduce((totalPrice, cartItem) => {
			const currentPrice = cartItem.price * cartItem.quantity;
			return totalPrice + currentPrice;
		}, 0);
	};

	const setIsCartOpen = (bool) => {
		dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));
	};

	const updateCartItemsReducer = (newCartItems) => {
		const newCartCount = updateCartCount(newCartItems);
		const newTotalPrice = updateTotalPrice(newCartItems);
		dispatch(
			createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
				cartItems: newCartItems,
				cartCount: newCartCount,
				totalPrice: newTotalPrice,
			})
		);
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
