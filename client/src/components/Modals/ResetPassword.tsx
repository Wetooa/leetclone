import { useEffect, useState } from "react";
import TextField from "../TextField";
import { useRouter } from "next/navigation";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebase";

interface ResetPasswordProps {}

export default function ResetPassword({}: ResetPasswordProps) {
	const [sendPasswordResetEmail, sending, error] =
		useSendPasswordResetEmail(auth);

	const [inputs, setInputs] = useState({
		email: "",
	});

	const router = useRouter();
	const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputs({ ...inputs, [e.target.name]: e.target.value });
	};
	const handleReset = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const success = await sendPasswordResetEmail(inputs.email);

		if (success) {
			alert("send email");
		}
	};

	useEffect(() => {
		if (error) {
			alert(error.message);
		}
	}, [error]);

	return (
		<form
			onSubmit={handleReset}
			className="space-y-6 px-6 pb-4 sm:pb-6 xl:pb-8"
		>
			<h3 className="text-xl font-medium text-white">Reset Password</h3>

			<p className="text-sm text-white">
				Lorem ipsum dolor, sit amet consectetur adipisicing elit. Culpa cum
				consequatur sit eveniet pariatur ullam ea nisi consequuntur earum saepe
				libero porro repellendus eum rerum nemo tempora eligendi, aperiam
				laudantium.
			</p>

			<TextField
				label="your email"
				type="email"
				name="email"
				id="email"
				placeholder="name@company.com"
				onChange={handleChangeInput}
			/>

			{/* <TextField
				label="enter new password"
				type="password"
				name="password"
				id="password"
				placeholder="f*ck**u"
				onChange={handleChangeInput}
			/>

			<TextField
				label="Re-enter new password"
				type="password"
				name="password2"
				id="password2"
				placeholder="f*ck**u"
				error={notSimilarPasswords}
				errorMsg="Passwords do not match!"
				onChange={handleChangeInput}
			/> */}

			<button
				className="w-full text-white focus:right-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-brand-orange hover:bg-brand-orange-s"
				type="submit"
			>
				Reset Password
			</button>
		</form>
	);
}
