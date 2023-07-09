"use client";

import ProblemsTable from "@/components/ProblemsTable/ProblemsTable";
import Topbar from "@/components/Topbar/Topbar";
import { auth, firestore } from "@/firebase/firebase";
import { useHasMounted } from "@/hooks/useHasMounted";
import { DBUser } from "@/utils/types/problem";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Home() {
	const [loadingProblems, setLoadingProblems] = useState(true);
	const solvedProblems = useGetSolvedProblems();

	const hasMounted = useHasMounted();
	if (!hasMounted) return null;

	return (
		<main className="bg-dark-layer-2 min-h-screen">
			<Topbar />

			<h1
				className="text-2xl text-center text-gray-700 dark:text-gray-400 font-medium
					uppercase mt-10 mb-5"
			>
				&ldquo; QUALITY OVER QUANTITY &rdquo; 👇
			</h1>
			<div className="relative overflow-x-auto mx-auto px-6 pb-10">
				{loadingProblems && (
					<div className="animate-pulse max-w-[1200px] mx-auto mb-10">
						{[...Array(20)].map((_, index) => {
							return <LoadingSkeleton key={index} />;
						})}
					</div>
				)}

				<table className="text-sm text-left text-gray-500 dark:text-gray-400 sm:w-7/12 w-full max-w-[1200px] mx-auto">
					{!loadingProblems && (
						<thead className="text-xs text-gray-700 uppercase dark:text-gray-400 border-b ">
							<tr>
								<th scope="col" className="px-1 py-3 w-0 font-medium">
									Status
								</th>
								<th scope="col" className="px-6 py-3 w-0 font-medium">
									Title
								</th>
								<th scope="col" className="px-6 py-3 w-0 font-medium">
									Difficulty
								</th>
								<th scope="col" className="px-6 py-3 w-0 font-medium">
									Category
								</th>
								<th scope="col" className="px-6 py-3 w-0 font-medium">
									Solution
								</th>
							</tr>
						</thead>
					)}

					<ProblemsTable
						setLoadingProblems={setLoadingProblems}
						solvedProblems={solvedProblems}
					/>
				</table>
			</div>

			{/* <AddProblemsForm /> */}
		</main>
	);
}

const LoadingSkeleton = () => {
	return (
		<div className="flex items-center space-x-12 mt-4 px-6">
			<div className="w-6 h-6 shrink-0 rounded-full bg-dark-layer-1"></div>
			<div className="h-4 sm:w-52  w-32  rounded-full bg-dark-layer-1"></div>
			<div className="h-4 sm:w-52  w-32 rounded-full bg-dark-layer-1"></div>
			<div className="h-4 sm:w-52 w-32 rounded-full bg-dark-layer-1"></div>
			<span className="sr-only">Loading...</span>
		</div>
	);
};

function useGetSolvedProblems() {
	const [solvedProblems, setsolvedProblems] = useState<string[]>([]);
	const [user] = useAuthState(auth);

	useEffect(() => {
		const getSolvedProblems = async () => {
			if (!user) return;

			const userRef = doc(firestore, "users", user.uid);
			const userDoc = await getDoc(userRef);

			if (userDoc.exists()) {
				setsolvedProblems((userDoc.data() as DBUser).solvedProblems);
			}
		};

		getSolvedProblems();
	}, [user]);

	return solvedProblems;
}
