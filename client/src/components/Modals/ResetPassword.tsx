import TextField from "../TextField";

interface ResetPasswordProps {}

export default function ResetPassword({}: ResetPasswordProps) {
	return (
		<form action="" className="space-y-6 px-6 pb-4 sm:pb-6 xl:pb-8">
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
			/>

			<TextField
				label="enter new password"
				type="password"
				name="password"
				id="password"
				placeholder="f*ck**u"
			/>

			<TextField
				label="Re-enter new password"
				type="password2"
				name="password2"
				id="password2"
				placeholder="f*ck**u"
			/>

			<button
				className="w-full text-white focus:right-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-brand-orange hover:bg-brand-orange-s"
				type="submit"
			>
				Reset Password
			</button>
		</form>
	);
}
