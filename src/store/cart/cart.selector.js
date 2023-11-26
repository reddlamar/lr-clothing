import { createSelector } from 'reselect';

const selectCartReducer = (state) => state.cart;

export const selectCartItems = createSelector(
	[selectCartReducer],
	(cart) => cart.cartItems
);

export const selectIsCartOpen = createSelector(
	[selectCartReducer],
	(cart) => cart.isCartOpen
);

export const selectCartCount = createSelector([selectCartItems], (cartItems) =>
	getNewCartCount(cartItems)
);

export const selectTotalPrice = createSelector([selectCartItems], (cartItems) =>
	getNewTotalPrice(cartItems)
);

const getNewCartCount = (newCartItems) => {
	return newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
};

const getNewTotalPrice = (newCartItems) => {
	return newCartItems.reduce((totalPrice, cartItem) => {
		const currentPrice = cartItem.price * cartItem.quantity;
		return totalPrice + currentPrice;
	}, 0);
};
