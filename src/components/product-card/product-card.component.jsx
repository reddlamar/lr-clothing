import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import Button from '../button/button.component';
import './product-card.styles.scss';

const ProductCard = ({ product }) => {
    const { name, price, imageUrl } = product;
    const { addItemToCart } = useContext(CartContext);

    const addProductToCart = () => addItemToCart(product);

	return (
		<div className='product-card-container'>
			<img alt={ name } src={ imageUrl } />
			<div className='footer'>
				<span className='name'>{ name }</span>
				<span className='price'>{ price }</span>
			</div>
            <Button buttonType='inverted' type='button' onClick={addProductToCart}>Add to cart</Button>
		</div>
	);
};

export default ProductCard;
