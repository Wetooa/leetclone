import TextField from "../TextField";

interface SignUpProps {}

export default function SignUp({}: SignUpProps) {
	return (
		<form action="" className="space-y-6 px-6 pb-4">
			<h3 className="text-xl font-medium text-white">Sign In To LeetClone</h3>

			<TextField
				label="your email"
				type="email"
				name="email"
				id="email"
				placeholder="name@company.com"
			/>

			<TextField
				label="display name"
				type="text"
				name="name"
				id="name"
				placeholder="Adrian Sajulga"
			/>

			<TextField
				label="your password"
				type="password"
				name="password"
				id="password"
				placeholder="f*ck**u"
			/>

			<TextField
				label="Re-enter your password"
				type="password2"
				name="password2"
				id="password2"
				placeholder="f*ck**u"
			/>

			<button
				className="w-full text-white focus:right-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-brand-orange hover:bg-brand-orange-s"
				type="submit"
			>
				Sign Up
			</button>

			<div className="text-sm font-medium text-gray-300">
				Already have an account?{" "}
				<a href="#" className="text-blue-700 hover:underline">
					Login
				</a>
			</div>
		</form>
	);
}
