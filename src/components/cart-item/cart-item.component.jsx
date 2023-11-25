import { CartItemContainer, ItemDetails, Name } from './cart-item.styles.jsx';

const CartItem = ({ cartITem }) => {
	const { name, price, imageUrl, quantity } = cartITem;
	return (
		<CartItemContainer>
			<img src={imageUrl} alt={`${name}`} />
			<ItemDetails>
				<Name>{name}</Name>
				<span className='price'>
					{quantity} X ${price}
				</span>
			</ItemDetails>
		</CartItemContainer>
	);
};

export default CartItem;
