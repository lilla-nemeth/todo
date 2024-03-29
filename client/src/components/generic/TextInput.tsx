import { TextInputProps } from '../../types/types';

const TextInput = (props: TextInputProps) => {
	const { labelName, labelClassName, htmlFor, id, className, name, type, placeholder, autoComplete, required, autoFocus, value, onChange } = props;

	return (
		<>
			<label className={labelClassName} htmlFor={htmlFor}>
				{labelName}
			</label>
			<input
				type={type}
				id={id}
				className={className}
				name={name}
				placeholder={placeholder}
				autoComplete={autoComplete}
				required={required}
                autoFocus={autoFocus}
				value={value}
				onChange={onChange}
			/>
		</>
	);
};

export default TextInput;
