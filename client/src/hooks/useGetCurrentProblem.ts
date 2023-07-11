import { firestore } from "@/firebase/firebase";
import { DBProblem } from "@/utils/types/problem";
import { doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";

export function useGetCurrentProblem(problemId: string) {
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
