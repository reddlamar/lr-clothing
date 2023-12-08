import { useSelector } from 'react-redux/es/hooks/useSelector';
import {
	selectCartItems,
	selectTotalPrice,
} from '../../store/cart/cart.selector.js';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import PaymentForm from '../../components/payment-form/payment-form.component.jsx';
import {
	CheckoutContainer,
	CheckoutHeader,
	HeaderBlock,
	Total,
} from './checkout.styles.jsx';

const Checkout = () => {
	const cartItems = useSelector(selectCartItems);
	const totalPrice = useSelector(selectTotalPrice);

	return (
		<CheckoutContainer>
			<CheckoutHeader>
				<HeaderBlock>Product</HeaderBlock>
				<HeaderBlock>Description</HeaderBlock>
				<HeaderBlock>Quantity</HeaderBlock>
				<HeaderBlock>Price</HeaderBlock>
				<HeaderBlock>Remove</HeaderBlock>
			</CheckoutHeader>
			{cartItems.map((item) => (
				<CheckoutItem key={item.id} cartItem={item} />
			))}
			<Total>Total: ${totalPrice}</Total>
			<PaymentForm />
		</CheckoutContainer>
	);
};

export default Checkout;
