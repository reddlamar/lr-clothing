import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import {
	CartIconContainer,
	ShoppingIcon,
	ItemCount,
} from './cart-icon.styles.jsx';

const CartIcon = () => {
	const { cartCount, isCartOpen, setIsCartOpen } = useContext(CartContext);

	const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

	return (
		<CartIconContainer onClick={toggleIsCartOpen}>
			<ShoppingIcon />
			<ItemCount>{cartCount}</ItemCount>
		</CartIconContainer>
	);
};

export default CartIcon;
