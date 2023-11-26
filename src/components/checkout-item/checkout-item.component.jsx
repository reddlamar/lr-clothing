import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector.js';
import {
	addItemToCart,
	removeItemFromCart,
	clearItemFromCart,
} from '../../store/cart/cart.action.js';
import {
	CheckoutItemContainer,
	ImageContainer,
	Arrow,
	Value,
	RemoveButton,
	NamePriceQuantiity,
} from './checkout-item.styles.jsx';

const CheckoutItem = ({ cartItem }) => {
	const dispatch = useDispatch();
	const cartItems = useSelector(selectCartItems);
	const { name, imageUrl, price, quantity } = cartItem;

	const handleClearItem = () =>
		dispatch(clearItemFromCart(cartItems, cartItem));

	const handleRemoveCartItem = () =>
		dispatch(removeItemFromCart(cartItems, cartItem));

	const handleAddCartItem = () => dispatch(addItemToCart(cartItems, cartItem));

	return (
		<CheckoutItemContainer>
			<ImageContainer>
				<img src={imageUrl} alt={`${name}`} />
			</ImageContainer>
			<NamePriceQuantiity>{name}</NamePriceQuantiity>
			<NamePriceQuantiity>
				<Arrow onClick={handleRemoveCartItem}>&#10094;</Arrow>
				<Value>{quantity}</Value>
				<Arrow onClick={handleAddCartItem}>&#10095;</Arrow>
			</NamePriceQuantiity>
			<NamePriceQuantiity>{price}</NamePriceQuantiity>
			<RemoveButton onClick={handleClearItem}>&#10005;</RemoveButton>
		</CheckoutItemContainer>
	);
};

export default CheckoutItem;
