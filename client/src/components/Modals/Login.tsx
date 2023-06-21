import { AuthModalState, authModalState } from "@/atoms/authModalAtom";
import { useSetRecoilState } from "recoil";
import TextField from "../TextField";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebase";
import { toast } from "react-toastify";
import { defaultToastConfig } from "@/utils/toastConfig";
import { isEmptyInputs } from "@/utils/funcs";

interface LoginProps {}

export default function Login({}: LoginProps) {
	const setAuthModalState = useSetRecoilState(authModalState);

	const [inputs, setInputs] = useState({
		email: "",
		password: "",
	});
	const router = useRouter();

	const [signInWithEmailAndPassword, user, loading, error] =
		useSignInWithEmailAndPassword(auth);

	const handleClick = (type: AuthModalState["type"]) => {
		setAuthModalState((prev) => ({ ...prev, type }));
	};

	const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputs({ ...inputs, [e.target.name]: e.target.value });
	};
	const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (isEmptyInputs(inputs)) {
			toast.error("Please fill out all fields!", defaultToastConfig);
			return;
		}

		try {
			const newUser = await signInWithEmailAndPassword(
				inputs.email,
				inputs.password
			);
			if (newUser) router.push("/");
		} catch (error: any) {
			toast.error(error.message, defaultToastConfig);
		}
	};

	useEffect(() => {
		if (error) {
			// change message
			toast.error(error.message, defaultToastConfig);
		}
	}, [error]);

	return (
		<form onSubmit={handleLogin} className="space-y-6 px-6 pb-4">
			<h3 className="text-xl font-medium text-white">Log In To LeetClone</h3>

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
				label="your password"
				type="password"
				name="password"
				id="password"
				placeholder="f*ck**u"
			/>

			<button
				className="w-full text-white focus:right-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-brand-orange hover:bg-brand-orange-s"
				type="submit"
			>
				{loading ? "Logging in..." : "Login"}
			</button>

			<button
				className="flex w-full justify-end"
				type="button"
				onClick={() => handleClick("forgotPassword")}
			>
				<a
					href="#"
					className="text-sm block text-brand-orange hover:underline w-full text-right"
				>
					Forgot Password?
				</a>
			</button>

			<div className="text-sm font-medium text-gray-300">
				Not Registered?{" "}
				<a
					href="#"
					className="text-blue-700 hover:underline"
					onClick={() => handleClick("register")}
				>
					Create Account
				</a>
			</div>
		</form>
	);
}
