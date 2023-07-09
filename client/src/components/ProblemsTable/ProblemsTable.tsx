"use client";

import Link from "next/link";
import { BsCheckCircle } from "react-icons/bs";
import { AiFillYoutube } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import YouTube from "react-youtube";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { firestore } from "@/firebase/firebase";
import { DBProblem } from "@/utils/types/problem";

interface ProblemsTableProps {
	setLoadingProblems: Dispatch<SetStateAction<boolean>>;
	solvedProblems: string[];
}

export default function ProblemsTable({
	setLoadingProblems,
	solvedProblems,
}: ProblemsTableProps) {
	const problems: Array<DBProblem> = useGetProblems(setLoadingProblems);

	const [youtubePlayer, setYoutubePlayer] = useState({
		isOpen: false,
		videoId: "",
	});

	const difficultyColor: { [key: string]: string } = {
		Easy: "text-dark-green-s",
		Medium: "text-dark-yellow",
		Hard: "text-dark-pink",
	};

	const closeModal = () => {
		setYoutubePlayer({ isOpen: false, videoId: "" });
	};

	useEffect(() => {
		const handleEsc = (e: KeyboardEvent) => {
			if (e.key === "Escape") closeModal();
		};
		window.addEventListener("keydown", handleEsc);
		return () => window.removeEventListener("keydown", handleEsc);
	}, []);

	return (
		<>
			<tbody className="text-white">
				{problems.map((doc, index) => {
					return (
						<tr
							className={`${index % 2 == 0 ? "bg-dark-layer-1" : ""}`}
							key={doc.id}
						>
							<th className="px-2 py-4 font-medium whitespace-nowrap text-dark-green-s">
								{solvedProblems.includes(doc.id) && (
									<BsCheckCircle fontSize={"18"} width="18" />
								)}
							</th>

							<td className="px-6 py-4">
								<Link
									className="hover:text-blue-600 cursor-pointer"
									href={doc.link || `/problems/${doc.id}`}
								>
									{doc.order}
									{". "}
									{doc.title}
								</Link>
							</td>
							<td className={`px-6 py-4 ${difficultyColor[doc.difficulty]}`}>
								{doc.difficulty}
							</td>
							<td className="px-6 py-4">{doc.category}</td>
							<td className="px-6 py-4">
								{doc.videoId ? (
									<AiFillYoutube
										className="cursor-pointer hover:text-red-600"
										fontSize={"18"}
										onClick={() => {
											setYoutubePlayer({
												...youtubePlayer,
												isOpen: true,
												videoId: doc.videoId!,
											});
										}}
									/>
								) : (
									<p className="text-gray-400">Coming soon</p>
								)}
							</td>
						</tr>
					);
				})}
			</tbody>

			{youtubePlayer.isOpen && (
				<tfoot className="fixed top-0 left-0 h-screen w-screen flex items-center justify-center">
					<div
						className="bg-black z-10 opacity-70 top-0 left-0 w-screen h-screen absolute"
						onClick={closeModal}
					/>
					<div className="w-full z-50 h-full px-6 relative max-w-4xl">
						<div className="w-full h-full flex items-center justify-center relative">
							<div className="w-full relative">
								<IoClose
									fontSize={"35"}
									className="cursor-pointer absolute -top-16 right-0"
									onClick={closeModal}
								/>
								<YouTube
									videoId={youtubePlayer.videoId}
									loading="lazy"
									iframeClassName="w-full min-h-[500px]"
								/>
							</div>
						</div>
					</div>
				</tfoot>
			)}
		</>
	);
}

const useGetProblems = (
	setLoadingProblems: ProblemsTableProps["setLoadingProblems"]
): Array<DBProblem> => {
	const [problems, setProblems] = useState<Array<DBProblem>>([]);

	useEffect(() => {
		const getProblems = async () => {
			setLoadingProblems(true);

			const q = query(
				collection(firestore, "problems"),
				orderBy("order", "asc")
			);

			const querySnapshot = await getDocs(q);

			const tmp: any = [];
			querySnapshot.forEach((doc) => {
				tmp.push({ id: doc.id, ...doc.data() } as DBProblem);
			});
			setProblems(tmp);
			setLoadingProblems(false);
		};

		getProblems();
	}, [setLoadingProblems]);

	return problems;
};
