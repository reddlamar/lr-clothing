import { CART_ACTION_TYPES } from './cart.types';
import { createAction } from '../../utils/reducer/reducer.utils';

export const addItemToCart = (cartItems, product) => {
	const newCartItems = addCartItem(cartItems, product);
	return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
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

export const removeItemFromCart = (cartItems, cartItem) => {
	const newCartItems = removeCartItem(cartItems, cartItem);
	return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
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

export const clearItemFromCart = (cartItems, cartItem) => {
	const newCartItems = clearCartItem(cartItems, cartItem);
	return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

const clearCartItem = (cartItems, cartItemToClear) =>
	cartItems.filter((cartItem) => cartItemToClear.id !== cartItem.id);

export const setIsCartOpen = (bool) => {
	return createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool);
};
