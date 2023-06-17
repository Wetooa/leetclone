import { AuthModalState, authModalState } from "@/atoms/authModalAtom";
import { useSetRecoilState } from "recoil";
import TextField from "../TextField";

interface LoginProps {}

export default function Login({}: LoginProps) {
	const setAuthModalState = useSetRecoilState(authModalState);

	const handleClick = (type: AuthModalState["type"]) => {
		setAuthModalState((prev) => ({ ...prev, type }));
	};

	return (
		<form action="" className="space-y-6 px-6 pb-4">
			<h3 className="text-xl font-medium text-white">Log In To LeetClone</h3>

			<TextField
				label="your email"
				type="email"
				name="email"
				id="email"
				placeholder="name@company.com"
			/>

			<TextField
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
				Login
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
