import AuthModalOverlay from "@/components/Modals/AuthModalOverlay";
import { Navbar } from "@/components/Navbar";
import Image from "next/image";

interface AuthPageProps {}

export default function AuthPage({}: AuthPageProps) {
	return (
		<div className="bg-gradient-to-b from-gray-600 to-black h-screen relative">
			<div className="max-w-7xl mx-auto">
				<Navbar />
				<AuthModalOverlay />

				<div className="flex items-center justify-center h-[calc(100vh-5rem)] pointer-events-none select-none">
					<Image
						src="/images/hero.png"
						alt="hero-image"
						width={600}
						height={300}
					/>
				</div>
			</div>
		</div>
	);
}
