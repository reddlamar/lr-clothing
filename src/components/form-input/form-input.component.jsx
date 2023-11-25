import { FormInputLabel, Input, Group } from './form-input.styles.jsx';

const FormInput = ({ label, ...inputoptions }) => {
	return (
		<Group>
			<Input {...inputoptions} />
			{label && (
				<FormInputLabel $shrink={inputoptions?.value?.length}>
					{label}
				</FormInputLabel>
			)}
		</Group>
	);
};

export default FormInput;
