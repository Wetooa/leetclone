import { FiLogOut } from "react-icons/fi";
import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebase";

interface LogoutProps {}

export default function Logout({}: LogoutProps) {
	const [signOut, loading, error] = useSignOut(auth);

	const handleLogout = async () => {
		try {
			signOut();
		} catch (err: any) {
			alert(err);
		}
	};

	return (
		<button
			className="bg-dark-fill-3 py-1.5 px-3 cursor-pointer rounded text-brand-orange"
			onClick={handleLogout}
		>
			<FiLogOut />
		</button>
	);
}
