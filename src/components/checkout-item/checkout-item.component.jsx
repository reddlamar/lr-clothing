import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import {
	CheckoutItemContainer,
	ImageContainer,
	Arrow,
	Value,
	RemoveButton,
	NamePriceQuantiity,
} from './checkout-item.styles.jsx';

const CheckoutItem = ({ cartItem }) => {
	const { name, imageUrl, price, quantity } = cartItem;
	const { clearItemFromCart, addItemToCart, removeItemFromCart } =
		useContext(CartContext);

	const handleClearItem = () => clearItemFromCart(cartItem);
	const handleRemoveCartItem = () => removeItemFromCart(cartItem);
	const handleAddCartItem = () => addItemToCart(cartItem);

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
