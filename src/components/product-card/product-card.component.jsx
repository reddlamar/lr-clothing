import './product-card.styles.scss';
import Button from '../button/button.component';

const ProductCard = ({ produect: product }) => {
    const { name, price, imageUrl } = product
	return (
		<div className='product-card-container'>
			<img alt={ name } src={ imageUrl } />
			<div className='footer'>
				<span className='name'>{ name }</span>
				<span className='price'>{ price }</span>
			</div>
            <Button buttonType='inverted' type='button'>Add to cart</Button>
		</div>
	);
};

export default ProductCard;
