import { auth, firestore } from "@/firebase/firebase";
import { DBUser } from "@/utils/types/problem";
import { doc, getDoc } from "firebase/firestore";
import { Dispatch, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export function useGetUsersDataOnProblem(
	problemId: string,
	setData: Dispatch<{
		liked: boolean;
		disliked: boolean;
		starred: boolean;
		solved: boolean;
	}>
) {
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
	}, [problemId, user, setData]);
}
