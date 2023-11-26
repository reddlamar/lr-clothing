import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from '../../store/cart/cart.action.js';
import { selectCartItems } from '../../store/cart/cart.selector.js';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import {
	Price,
	Name,
	Footer,
	ProductCardContainer,
} from './product-card.styles.jsx';

const ProductCard = ({ product }) => {
	const dispatch = useDispatch();
	const { name, price, imageUrl } = product;
	const cartItems = useSelector(selectCartItems);

	const addProductToCart = () => dispatch(addItemToCart(cartItems, product));

	return (
		<ProductCardContainer>
			<img alt={name} src={imageUrl} />
			<Footer>
				<Name>{name}</Name>
				<Price>{price}</Price>
			</Footer>
			<Button
				buttonType={BUTTON_TYPE_CLASSES.inverted}
				type='button'
				onClick={addProductToCart}>
				Add to cart
			</Button>
		</ProductCardContainer>
	);
};

export default ProductCard;
