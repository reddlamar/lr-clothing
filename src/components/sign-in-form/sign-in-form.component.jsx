import { useState } from 'react';
import FormInput from '../../components/form-input/form-input.component';
import Button, {
	BUTTON_TYPE_CLASSES,
} from '../../components/button/button.component';
import { useDispatch } from 'react-redux';
import {
	emailSignInStart,
	googleSignInStart,
} from '../../store/user/user.action.js';
import { SignInContainer, ButtonsContainer } from './sign-in-form.styles.jsx';

const defautFormFieds = {
	email: '',
	password: '',
};

const SignInForm = () => {
	const dispatch = useDispatch();
	const [formFields, setFormFields] = useState(defautFormFieds);
	const { email, password } = formFields;

	const resetFormFields = () => {
		setFormFields(defautFormFieds);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			dispatch(emailSignInStart(email, password));
			resetFormFields();
		} catch (error) {
			switch (error.code) {
				case 'aut/wrong-password':
					alert('incorrect password for email');
					break;
				case 'auth/user-not-found':
					alert('no user associated with this email');
					break;
				default:
					console.log(error);
			}
		}
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormFields({ ...formFields, [name]: value });
	};

	const signInWithGoogle = async () => {
		dispatch(googleSignInStart());
	};

	return (
		<SignInContainer>
			<h2>Already have an account</h2>
			<span>Sign in with your email and password</span>
			<FormInput
				label='Email'
				type='email'
				required
				onChange={handleChange}
				name='email'
				value={email}
			/>

			<FormInput
				label='Password'
				type='password'
				required
				onChange={handleChange}
				name='password'
				value={password}
			/>
			<ButtonsContainer>
				<Button
					type='submit'
					buttonType={BUTTON_TYPE_CLASSES.base}
					onClick={handleSubmit}>
					Sign In
				</Button>
				<Button
					type='button'
					buttonType={BUTTON_TYPE_CLASSES.google}
					onClick={signInWithGoogle}>
					Google Sign In
				</Button>
			</ButtonsContainer>
		</SignInContainer>
	);
};

export default SignInForm;
