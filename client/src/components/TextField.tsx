import _ from "lodash";

interface TextFieldProps {
	label: string;
	type: string;
	name: string;
	id: string;
	placeholder?: string;
	error?: boolean;
	errorMsg?: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function TextField({
	label,
	type,
	name,
	id,
	placeholder,
	error,
	errorMsg,
	onChange,
}: TextFieldProps) {
	return (
		<div>
			<label
				htmlFor={id}
				className="text-sm font-medium block mb-2 text-gray-300"
			>
				{_.capitalize(label)}
			</label>

			<input
				type={type}
				name={name}
				id={id}
				className={`border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 ${
					error ? "border-red-600" : "border-gray-600"
				} placeholder-gray-400 text-white transition-all duration-500 delay-300`}
				placeholder={placeholder}
				autoComplete={type === "password" ? "new-password" : ""}
				onChange={onChange}
			/>
		</div>
	);
}
