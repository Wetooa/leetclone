"use client";

import TextField from "../TextField";
import { authModalState, AuthModalState } from "@/atoms/authModalAtom";
import { useSetRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebase";
import { useRouter } from "next/navigation";

interface SignUpProps {}

export default function SignUp({}: SignUpProps) {
	const setAuthModalState = useSetRecoilState(authModalState);

	const [inputs, setInputs] = useState({
		email: "",
		displayName: "",
		password: "",
		password2: "",
	});

	const router = useRouter();
	const notSimilarPasswords: boolean =
		inputs.password.length > 0 && inputs.password !== inputs.password2;

	const [createUserWithEmailAndPassword, user, loading, error] =
		useCreateUserWithEmailAndPassword(auth);

	const handleClick = (type: AuthModalState["type"]) => {
		setAuthModalState((prev) => ({ ...prev, type }));
	};

	const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputs({ ...inputs, [e.target.name]: e.target.value });
	};
	const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!inputs.email || !inputs.displayName || !inputs.password) {
			alert("Please enter all fields");
			return;
		}

		try {
			const newUser = await createUserWithEmailAndPassword(
				inputs.email,
				inputs.password
			);

			if (newUser) router.push("/");
		} catch (error: any) {
			alert(error.message);
		}
	};

	useEffect(() => {
		if (error) alert(error);
	}, [error]);

	return (
		<form onSubmit={handleRegister} className="space-y-6 px-6 pb-4">
			<h3 className="text-xl font-medium text-white">Sign In To LeetClone</h3>

			<TextField
				onChange={handleChangeInput}
				label="your email"
				type="email"
				name="email"
				id="email"
				placeholder="name@company.com"
			/>

			<TextField
				onChange={handleChangeInput}
				label="display name"
				type="text"
				name="name"
				id="name"
				placeholder="Adrian Sajulga"
			/>

			<TextField
				onChange={handleChangeInput}
				label="your password"
				type="password"
				name="password"
				id="password"
				placeholder="f*ck**u"
			/>

			<TextField
				onChange={handleChangeInput}
				label="Re-enter your password"
				type="password"
				name="password2"
				id="password2"
				error={notSimilarPasswords}
				errorMsg="Passwords do not match!"
				placeholder="f*ck**u"
			/>

			<button
				className="w-full text-white focus:right-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-brand-orange hover:bg-brand-orange-s"
				type="submit"
				unselectable={notSimilarPasswords ? "on" : "off"}
			>
				{loading ? "Registering..." : "Register"}
			</button>

			<div className="text-sm font-medium text-gray-300">
				Already have an account?{" "}
				<a
					href="#"
					className="text-blue-700 hover:underline"
					onClick={() => handleClick("login")}
				>
					Login
				</a>
			</div>
		</form>
	);
}
