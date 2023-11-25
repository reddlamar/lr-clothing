import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import { CheckoutContainer, CheckoutHeader, HeaderBlock, Total } from './checkout.styles.jsx';

const Checkout = () => {
	const {
		cartItems,
        totalPrice,		
	} = useContext(CartContext);

	return (
		<CheckoutContainer>
			<CheckoutHeader>
				<HeaderBlock>Product</HeaderBlock>
				<HeaderBlock>Description</HeaderBlock>
				<HeaderBlock>Quantity</HeaderBlock>
				<HeaderBlock>Price</HeaderBlock>
				<HeaderBlock>Remove</HeaderBlock>
			</CheckoutHeader>
			{cartItems.map((item) => <CheckoutItem key={item.id} cartItem={item} />)}
            <Total>Total: ${ totalPrice }</Total>
		</CheckoutContainer>
	);
};

export default Checkout;
