"use client";

import { authModalState } from "@/atoms/authModalAtom";
import Image from "next/image";
import Link from "next/link";
import { useSetRecoilState } from "recoil";

interface NavbarProps {}

export function Navbar({}: NavbarProps) {
	const setAuthModalState = useSetRecoilState(authModalState);

	const handleClick = () => {
		setAuthModalState((prev) => ({ ...prev, isOpen: true }));
	};

	return (
		<div className="flex items-center justify-between sm:px-12 px-2 md:px-24">
			<Link href="/" className="flex items-center justify-center h-20">
				<Image
					src="/images/logo.png"
					alt="leetclone-logo"
					className="h-full"
					width={200}
					height={100}
				/>
			</Link>

			<div className="flex items-center">
				<button
					className="bg-brand-orange text-white px-2 py-1 sm:px-4 rounded-md font-medium border-2 border-brand-orange hover:text-brand-orange hover:bg-white hover:border-2 transition duration-300 ease-in-out"
					onClick={handleClick}
				>
					Sign In
				</button>
			</div>
		</div>
	);
}
