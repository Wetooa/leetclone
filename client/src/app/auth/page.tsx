"use client";

import AuthModalOverlay from "@/components/Modals/AuthModalOverlay";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { useRecoilValue } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";

export default function AuthPage() {
	const authModal = useRecoilValue(authModalState);

	return (
		<div className="bg-gradient-to-b from-gray-600 to-black h-screen relative">
			<div className="max-w-7xl mx-auto">
				<Navbar />

				<div className="flex items-center justify-center h-[calc(100vh-5rem)] pointer-events-none select-none">
					<Image
						src="/images/hero.png"
						alt="hero-image"
						width={600}
						height={300}
					/>
				</div>

				{authModal.isOpen && <AuthModalOverlay />}
			</div>
		</div>
	);
}
