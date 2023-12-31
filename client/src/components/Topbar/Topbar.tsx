"use client";

import Link from "next/link";
import Image from "next/image";
import { auth } from "@/firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Logout from "../Buttons/Logout";
import { useSetRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { BsList } from "react-icons/bs";
import Timer from "../Timer/Timer";
import { problems } from "@/utils/problems";
import { modulo } from "@/utils/funcs";
import { useRouter } from "next/navigation";

interface TopbarProps {
	problemPage?: boolean;
	pid?: string;
}

export default function Topbar({ problemPage, pid }: TopbarProps) {
	const [user] = useAuthState(auth);
	const router = useRouter();
	const setAuthModalState = useSetRecoilState(authModalState);

	const handleProblemChange = (isForward: boolean) => {
		if (!pid) return;

		const { order } = problems[pid];
		const direction = isForward ? 1 : -1;
		const length = Object.keys(problems).length;

		const nextProblemOrder = modulo(order + direction - 1, length) + 1;
		const nextProblemKey = Object.keys(problems).find(
			(p) => problems[p].order === nextProblemOrder
		);

		router.push(`/problems/${nextProblemKey}`);
	};

	return (
		<nav className="relative flex h-[50px] w-full shrink-0 items-center px-5 bg-dark-layer-1 text-dark-gray-7">
			<div
				className={`flex w-full items-center justify-between ${
					!problemPage ? "max-w-[1200px] mx-auto" : ""
				}`}
			>
				<Link href="/" className="h-[22px] flex-1">
					<Image
						src={user?.photoURL ?? "/images/logo-full.png"}
						alt="Logo"
						height={100}
						width={100}
					/>
				</Link>

				{problemPage && (
					<div className="flex items0center gap-4 flex-1 justify-center">
						<div
							onClick={() => handleProblemChange(false)}
							className="flex items-center justify-center rounded bg-dark-fill-3 hover:bg-dark-fill-2 h-8 w-8 cursor-pointer"
						>
							<FaChevronLeft />
						</div>

						<Link
							href="/"
							className="flex items-center gap-2 font-medium max-w-[170px] text-dark-gray-8"
						>
							<BsList /> Problems List
						</Link>

						<div
							onClick={() => handleProblemChange(true)}
							className="flex items-center justify-center rounded bg-dark-fill-3 hover:bg-dark-fill-2 h-8 w-8 cursor-pointer"
						>
							<FaChevronRight />
						</div>
					</div>
				)}

				<div className="flex items-center space-x-4 flex-1 justify-end">
					<div>
						<a
							href="https://www.buymeacoffee.com/burakorkmezz"
							target="_blank"
							rel="noreferrer"
							className="bg-dark-fill-3 py-1.5 px-3 cursor-pointer rounded text-brand-orange hover:bg-dark-fill-2"
						>
							Premium
						</a>
					</div>

					{user && problemPage && <Timer />}

					{!user ? (
						<Link
							href="/auth"
							onClick={() =>
								setAuthModalState((prev) => ({
									...prev,
									isOpen: true,
									type: "login",
								}))
							}
						>
							<button className="bg-dark-fill-3 py-1 px-2 cursor-pointer rounded ">
								Sign In
							</button>
						</Link>
					) : (
						<>
							<div className="cursor-pointer group relative">
								<Image
									src="/images/avatar.png"
									alt="avatar"
									className="g-8 w-8 rounded-full"
									width={100}
									height={100}
								/>

								<div
									className="absolute top-10 left-2/4 -translate-x-2/4  mx-auto bg-dark-layer-1 text-brand-orange p-2 rounded shadow-lg z-40 group-hover:scale-100 scale-0 
								transition-all duration-300 ease-in-out"
								>
									<p className="text-sm">{user.email}</p>
								</div>
							</div>

							<Logout />
						</>
					)}
				</div>
			</div>
		</nav>
	);
}
