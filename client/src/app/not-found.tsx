"use client";

import { useRouter } from "next/navigation";

export default function PageNotFound({}) {
	const router = useRouter();

	return (
		<div className="bg-dark-layer-1 text-center text-white w-full h-full">
			<p className="">page not found</p>
			<button
				className="p-2 rounded-sm hover:scale-105 transition-all animate-ping"
				onClick={() => {
					router.back();
				}}
			>
				go back
			</button>
		</div>
	);
}
