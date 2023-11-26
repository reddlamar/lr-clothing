import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { selectCartItems } from '../../store/cart/cart.selector.js';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import {
	CartDropdownContainer,
	CartItems,
	EmptyMessage,
} from './cart-dropdown.styles.jsx';

const CartDropdown = () => {
	const cartItems = useSelector(selectCartItems);
	const navigate = useNavigate();

	const goToCheckoutHandler = () => {
		navigate('/checkout');
	};

	return (
		<CartDropdownContainer>
			<CartItems>
				{cartItems.length ? (
					cartItems.map((item) => <CartItem key={item.id} cartITem={item} />)
				) : (
					<EmptyMessage>Your Cart Is Empty</EmptyMessage>
				)}
			</CartItems>
			<Button onClick={goToCheckoutHandler}>GO TO CHEKCOUT</Button>
		</CartDropdownContainer>
	);
};

export default CartDropdown;
