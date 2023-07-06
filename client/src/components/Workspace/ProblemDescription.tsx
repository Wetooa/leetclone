import Image from "next/image";
import { auth, firestore } from "@/firebase/firebase";
import { DBProblem, DBUser, Problem } from "@/utils/types/problem";
import {
	Transaction,
	arrayRemove,
	arrayUnion,
	doc,
	getDoc,
	runTransaction,
	updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import {
	AiFillLike,
	AiFillDislike,
	AiOutlineLoading3Quarters,
} from "react-icons/ai";
import { BsCheck2Circle } from "react-icons/bs";
import { TiStarFullOutline } from "react-icons/ti";
import CircleSkeleton from "../Skeleton/CircleSkeleton";
import RectangleSkeleton from "../Skeleton/RectangleSkeleton";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import { defaultToastConfig } from "@/utils/toastConfig";

interface ProblemDescriptionProps {
	problem: Problem;
}

export default function ProblemDescription({
	problem,
}: ProblemDescriptionProps) {
	const { currentProblem, loading, setCurrentProblem } = useGetCurrentProblem(
		problem.id
	);
	const [user] = useAuthState(auth);
	const { liked, disliked, solved, starred, setData } =
		useGetUsersDataOnProblem(problem.id);
	const [updating, setUpdating] = useState(false);

	const problemDifficultyClass: { [key: string]: string } = {
		Easy: "bg-olive text-olive",
		Medium: "bg-dark-yellow text-dark-yellow",
		Hard: "bg-dark-pink text-dark-pink",
	};

	async function returnUserDataAndProblemData(transaction: Transaction) {
		const userRef = doc(firestore, "users", user!.uid);
		const problemRef = doc(firestore, "problems", problem.id);

		const userDoc = await transaction.get(userRef);
		const problemDoc = await transaction.get(problemRef);

		return { userRef, userDoc, problemRef, problemDoc };
	}

	async function handleDislike() {
		if (!user) {
			toast.error("You must be logged in to dislike a problem", {
				...defaultToastConfig,
				position: "top-left",
			});
			return;
		}

		if (updating) return;
		setUpdating(true);

		await runTransaction(firestore, async (transaction) => {
			const { userRef, userDoc, problemRef, problemDoc } =
				await returnUserDataAndProblemData(transaction);

			if (!userDoc.exists() || !problemDoc.exists()) return;

			if (disliked) {
				transaction.update(userRef, {
					dislikedProblems: (userDoc.data() as DBUser).dislikedProblems.filter(
						(id: string) => id !== problem.id
					),
				});

				transaction.update(problemRef, {
					dislikes: (problemDoc.data() as DBProblem).dislikes - 1,
				});

				setCurrentProblem((prev) => ({
					...prev!,
					dislikes: prev!.dislikes - 1,
				}));
				setData((prev) => ({ ...prev, disliked: false }));
			} else {
				transaction.update(userRef, {
					dislikedProblems: [
						...(userDoc.data() as DBUser).dislikedProblems,
						problem.id,
					],
					likedProblems: (userDoc.data() as DBUser).likedProblems.filter(
						(id: string) => id !== problem.id
					),
				});

				transaction.update(problemRef, {
					likes: (problemDoc.data() as DBProblem).likes - (liked ? 1 : 0),
					dislikes: (problemDoc.data() as DBProblem).dislikes + 1,
				});

				setCurrentProblem((prev) => ({
					...prev!,
					likes: prev!.likes - (liked ? 1 : 0),
					dislikes: prev!.dislikes + 1,
				}));
				setData((prev) => ({ ...prev, liked: false, disliked: true }));
			}
		});

		setUpdating(false);
	}

	async function handleLike() {
		if (!user) {
			toast.error("You must be logged in to like a problem", {
				...defaultToastConfig,
				position: "top-left",
			});
			return;
		}

		if (updating) return;
		setUpdating(true);

		await runTransaction(firestore, async (transaction) => {
			const { userRef, userDoc, problemRef, problemDoc } =
				await returnUserDataAndProblemData(transaction);

			if (!userDoc.exists() || !problemDoc.exists()) return;

			if (liked) {
				transaction.update(userRef, {
					likedProblems: (userDoc.data() as DBUser).likedProblems.filter(
						(id: string) => id !== problem.id
					),
				});

				transaction.update(problemRef, {
					likes: (problemDoc.data() as DBProblem).likes - 1,
				});

				setCurrentProblem((prev) => ({ ...prev!, likes: prev!.likes - 1 }));
				setData((prev) => ({ ...prev, liked: false }));
			} else {
				transaction.update(userRef, {
					likedProblems: [
						...(userDoc.data() as DBUser).likedProblems,
						problem.id,
					],
					dislikedProblems: (userDoc.data() as DBUser).dislikedProblems.filter(
						(id: string) => id !== problem.id
					),
				});

				transaction.update(problemRef, {
					likes: (problemDoc.data() as DBProblem).likes + 1,
					dislikes:
						(problemDoc.data() as DBProblem).dislikes - (disliked ? 1 : 0),
				});

				setCurrentProblem((prev) => ({
					...prev!,
					likes: prev!.likes + 1,
					dislikes: prev!.dislikes - (disliked ? 1 : 0),
				}));
				setData((prev) => ({ ...prev, liked: true, disliked: false }));
			}
		});

		setUpdating(false);
	}

	async function handleStar() {
		if (!user) {
			toast.error("You must be logged in to start a problem", {
				...defaultToastConfig,
				position: "top-left",
			});
			return;
		}

		if (updating) return;
		setUpdating(true);

		const userRef = doc(firestore, "users", user.uid);
		const userDoc = await getDoc(userRef);

		if (!userDoc.exists()) return;

		if (starred) {
			updateDoc(userRef, {
				starredProblems: arrayRemove(problem.id),
			});

			setData((prev) => ({ ...prev, starred: false }));
		} else {
			updateDoc(userRef, {
				starredProblems: arrayUnion(problem.id),
			});

			setData((prev) => ({ ...prev, starred: true }));
		}

		setUpdating(false);
	}

	return (
		<div className="bg-dark-layer-1">
			<div className="flex h-11 w-full items-center pt-2 bg-dark-layer-2 text-white overflow-x-hidden">
				<div
					className={
						"bg-dark-layer-1 rounded-t-[5px] px-5 py-[10px] text-xs cursor-pointer"
					}
				>
					Description
				</div>
			</div>

			<div className="flex px-0 py-4 h-[calc(100vh-94px)] overflow-y-auto">
				<div className="px-5">
					<div className="w-full">
						<div className="flex space-x-4">
							<div className="flex-1 mr-2 text-lg text-white font-medium">
								{problem.title}
							</div>
						</div>
						{!loading && currentProblem ? (
							<div className="flex items-center mt-3">
								<div
									className={`${
										problemDifficultyClass[currentProblem.difficulty]
									} inline-block rounded-[21px] bg-opacity-[.15] px-2.5 py-1 text-xs font-medium capitalize `}
								>
									{currentProblem.difficulty}
								</div>

								{solved && (
									<div className="rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-green-s text-dark-green-s">
										<BsCheck2Circle />
									</div>
								)}
								<div
									onClick={handleLike}
									className="flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px]  ml-4 text-lg transition-colors duration-200 text-dark-gray-6"
								>
									{updating ? (
										<AiOutlineLoading3Quarters className="animate-spin" />
									) : (
										<>
											<AiFillLike className={liked ? "text-dark-blue-s" : ""} />
											<span className="text-xs">{currentProblem.likes}</span>
										</>
									)}
								</div>

								<div
									onClick={handleDislike}
									className="flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px]  ml-4 text-lg transition-colors duration-200 text-green-s text-dark-gray-6"
								>
									{updating ? (
										<AiOutlineLoading3Quarters className="animate-spin" />
									) : (
										<>
											<AiFillDislike
												className={disliked ? "text-dark-blue-s" : ""}
											/>
											<span className="text-xs">{currentProblem.dislikes}</span>
										</>
									)}
								</div>
								<div
									onClick={handleStar}
									className="cursor-pointer hover:bg-dark-fill-3  rounded p-[3px]  ml-4 text-xl transition-colors duration-200 text-green-s text-dark-gray-6 "
								>
									{updating ? (
										<AiOutlineLoading3Quarters className="animate-spin" />
									) : (
										<TiStarFullOutline
											className={starred ? "text-dark-yellow" : ""}
										/>
									)}
								</div>
							</div>
						) : (
							<div className="mt-3 flex space-x-2">
								<RectangleSkeleton />
								<CircleSkeleton />
								<RectangleSkeleton />
								<RectangleSkeleton />
								<CircleSkeleton />
							</div>
						)}

						<div className="text-white text-sm">
							<div
								dangerouslySetInnerHTML={{ __html: problem.problemStatement }}
							/>
						</div>

						<div className="mt-4">
							{problem.examples.map((example, index) => {
								return (
									<div key={example.id}>
										<p className="font-medium text-white mb-2">
											Example {index + 1}:{" "}
										</p>

										{example.img && (
											<Image
												src={example.img}
												width={500}
												height={500}
												alt={"Image Example " + (index + 1)}
											/>
										)}
										<div className="example-card">
											<pre>
												<p>
													<strong className="text-white">Input: </strong>
													{example.inputText}
													<br />
												</p>

												<p>
													<strong>Output: </strong>
													{example.outputText}
													<br />
												</p>

												{example.explanation && (
													<p>
														<strong>Explanation: </strong>
														{example.explanation}
													</p>
												)}
											</pre>
										</div>
									</div>
								);
							})}
						</div>

						<div className="my-5 text-sm pb-4">
							<div className="text-white font-medium">Constraints:</div>
							<ul className="text-white ml-5 list-disc">
								<div
									dangerouslySetInnerHTML={{
										__html: problem.constraints,
									}}
								/>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

function useGetCurrentProblem(problemId: string) {
	const [currentProblem, setCurrentProblem] = useState<DBProblem>();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const getCurrentProblem = async () => {
			setLoading(true);

			const docRef = doc(firestore, "problems", problemId);
			const docSnap = await getDoc(docRef);

			if (docSnap.exists()) {
				const problem = docSnap.data();

				setCurrentProblem({ id: docSnap.id, ...problem } as DBProblem);
			}

			setLoading(false);
		};

		getCurrentProblem();
	}, [problemId]);

	return { currentProblem, loading, setCurrentProblem };
}

function useGetUsersDataOnProblem(problemId: string) {
	const [data, setData] = useState({
		liked: false,
		disliked: false,
		starred: false,
		solved: false,
	});
	const [user] = useAuthState(auth);

	useEffect(() => {
		const getUsersDataOnProblem = async () => {
			const userRef = doc(firestore, "users", user!.uid);
			const userSnap = await getDoc(userRef);

			if (userSnap.exists()) {
				const data = userSnap.data() as DBUser;
				const {
					solvedProblems,
					likedProblems,
					dislikedProblems,
					starredProblems,
				} = data;

				setData({
					liked: likedProblems.includes(problemId),
					disliked: dislikedProblems.includes(problemId),
					starred: starredProblems.includes(problemId),
					solved: solvedProblems.includes(problemId),
				});
			}
		};

		if (user) getUsersDataOnProblem();
		return () =>
			setData({ liked: false, disliked: false, starred: false, solved: false });
	}, [problemId, user]);

	return { ...data, setData };
}
