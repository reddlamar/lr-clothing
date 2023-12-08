import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsCartOpen } from '../../store/cart/cart.selector.js';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { selectCurrentUser } from '../../store/user/user.selector.js';
import { useDispatch } from 'react-redux';
import { signOutStart } from '../../store/user/user.action.js';
import {
	NavigationContainer,
	LogoContainer,
	NavLinks,
	NavLink,
} from './navigation.styles.jsx';

const Navigation = () => {
	const dispatch = useDispatch();
	const currentUser = useSelector(selectCurrentUser);
	const isCartOpen = useSelector(selectIsCartOpen);

	const handleSignOut = () => dispatch(signOutStart());

	return (
		<>
			<NavigationContainer>
				<LogoContainer to='/'>
					<CrwnLogo className='logo' />
				</LogoContainer>
				<NavLinks>
					<NavLink to='/shop'>Shop</NavLink>
					{currentUser ? (
						<NavLink as='span' onClick={handleSignOut}>
							{' '}
							Sign Out{' '}
						</NavLink>
					) : (
						<NavLink to='/auth'>Sign In</NavLink>
					)}
					<CartIcon />
				</NavLinks>
				{isCartOpen && <CartDropdown />}
			</NavigationContainer>
			<Outlet />
		</>
	);
};

export default Navigation;
