import { useState } from 'react';
import FormInput from '../../components/form-input/form-input.component';
import Button from '../../components/button/button.component';
import {
	signWithGooglePopup,
	signInAuthUserWithEmailAndPassword,
	createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';
import './sign-in-form.styles.scss';

const defautFormFieds = {
	email: '',
	password: '',
};

const SignInForm = () => {
	const [formFields, setFormFields] = useState(defautFormFieds);
	const { email, password } = formFields;

	const resetFormFields = () => {
		setFormFields(defautFormFieds);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			await signInAuthUserWithEmailAndPassword(email, password);
			resetFormFields();
		} catch (error) {
            switch(error.code) {
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
		const { user } = await signWithGooglePopup();
	    await createUserDocumentFromAuth(user);
	};

	return (
		<div className='sign-in-container'>
        <h2>Already have an account</h2>
        <span>Sign in with your email and password</span>
			<FormInput
				label='Email'
				inputOptions={{
					type: 'email',
					required: true,
					onChange: handleChange,
					name: 'email',
					value: email,
				}}
			/>

			<FormInput
				label='Password'
				inputOptions={{
					type: 'password',
					required: true,
					onChange: handleChange,
					name: 'password',
					value: password,
				}}
			/>
            <div className='buttons-container'>
                <Button type='submit' onClick={handleSubmit}>Sign In</Button>
                <Button type='button' buttonType='google' onClick={signInWithGoogle}>
                    Google Sign In
                </Button>
            </div>
		</div>
	);
};

export default SignInForm;