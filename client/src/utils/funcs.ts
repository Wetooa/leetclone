import { firestore } from "@/firebase/firebase";
import { Transaction, doc } from "firebase/firestore";

export const isEmptyInputs = (input: any): boolean => {
	for (let key in input) {
		let val: string = input[key];
		if (val === "") return true;
	}
	return false;
};

export const modulo = (n: number, d: number): number => {
	return ((n % d) + d) % d;
};

export async function returnUserDataAndProblemData(
	transaction: Transaction,
	userId: string,
	problemId: string
) {
	const userRef = doc(firestore, "users", userId);
	const problemRef = doc(firestore, "problems", problemId);

	const userDoc = await transaction.get(userRef);
	const problemDoc = await transaction.get(problemRef);

	return { userRef, userDoc, problemRef, problemDoc };
}
