import './cart-item.styles.scss';

const CartItem = ({ cartITem }) => {
	const { name, price, imageUrl, quantity } = cartITem;
	return (
		<div className='cart-item-container'>
			<img src={imageUrl} alt={`${name}`} />
			<div className='item-details'>
				<span className='name'>{name}</span>
				<span className='price'>{quantity} X ${price}</span>
			</div>
		</div>
	);
};

export default CartItem;
