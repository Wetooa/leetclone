import Split from "react-split";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { langs } from "@uiw/codemirror-extensions-langs";
import PreferenceNav from "./PreferenceNav/PreferenceNav";
import EditorFooter from "./EditorFooter";
import { Problem } from "@/utils/types/problem";
import { Dispatch, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "@/firebase/firebase";
import { defaultToastConfig } from "@/utils/toastConfig";
import { toast } from "react-toastify";
import { problems } from "@/utils/problems";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { vim } from "@replit/codemirror-vim";

interface PlaygroundProps {
	problem: Problem;
	setSuccess: Dispatch<boolean>;
	data: {
		liked: boolean;
		disliked: boolean;
		starred: boolean;
		solved: boolean;
	};
	setData: Dispatch<{
		liked: boolean;
		disliked: boolean;
		starred: boolean;
		solved: boolean;
	}>;
}

export default function Playground({
	problem,
	setSuccess,
	setData,
	data,
}: PlaygroundProps) {
	const [activeTestCaseId, setActiveTestCaseId] = useState(0);
	const [userCode, setUserCode] = useState(problem.starterCode);
	const [user] = useAuthState(auth);

	const handleSubmit = async () => {
		if (!user) {
			toast.error("Please log in to submit your code", defaultToastConfig);
			return;
		}

		try {
			const realUserCode = userCode.slice(
				userCode.indexOf(problem.starterFunctionName)
			);
			const cb = new Function(`return ${realUserCode}`)();
			const handlerFunction = problems[problem.id].handlerFunction as (
				fn: any
			) => boolean;
			const success = handlerFunction(cb);

			if (success) {
				toast.success("All testcases passed!", defaultToastConfig);
				setSuccess(true);
				setTimeout(setSuccess, 4000, false);

				const userRef = doc(firestore, "users", user.uid);
				await updateDoc(userRef, {
					solvedProblems: arrayUnion(problem.id),
				});
				setData({ ...data, solved: true });
			}
		} catch (error: any) {
			if (
				error.message.startsWith(
					"AssertionError [ERR_ASSERTION]: Expected values to be strictly deep-equal"
				)
			) {
				toast.error("One of more test cases failed!", defaultToastConfig);
			} else toast.error(error.message, defaultToastConfig);
		}
	};

	useEffect(() => {
		const code = localStorage.getItem(`code-${problem.id}`);

		setUserCode(code && user ? JSON.parse(code) : problem.starterCode);
	}, [user, problem]);

	const onChange = (value: string) => {
		setUserCode(value);

		localStorage.setItem(`code-${problem.id}`, JSON.stringify(value));
	};

	return (
		<div className="bg-dark-layer-1 flex flex-col relative overflow-x-hidden">
			<PreferenceNav />

			<Split
				className="h-[calc(100vh-94px)]"
				direction="vertical"
				sizes={[60, 40]}
				minSize={60}
			>
				<div className="w-full overflow-auto">
					<CodeMirror
						value={userCode}
						theme={vscodeDark}
						onChange={onChange}
						extensions={[langs.tsx(), vim()]}
						style={{ fontSize: 16 }}
					/>
				</div>

				<div className="w-full px-5 overflow-auto">
					<header className="flex h-10 items-center space-x-6">
						<div className="relative flex h-full flex-col justify-center cursor-pointer">
							<div className="text-sm text-white font-medium leading-5">
								Testcases
							</div>

							<hr className="absolute bottom-0 h-0.5 w-full rounded-full border-none bg-white" />
						</div>
					</header>

					<div className="flex">
						{/* change later to actual testcases users might have */}
						{problem.examples.map((_, index) => {
							return (
								<div
									onClick={() => setActiveTestCaseId(index)}
									key={_.id}
									className="mr-2 items-start mt-2 text-gray-400"
								>
									<div className="flex flex-wrap items-center gap-y-4">
										<div
											className={`font-medium items-center transition-all focus:outline-none inline-flex bg-dark-fill-3 hover:bg-dark-fill-2 relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap ${
												activeTestCaseId === index ? "text-white" : ""
											}`}
										>
											Case {index + 1}
										</div>
									</div>
								</div>
							);
						})}
					</div>

					<div className="font-semibold">
						<p className="text-sm font-medium mt-4 text-white">Input:</p>

						<div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2">
							{problem.examples[activeTestCaseId].inputText}
						</div>
					</div>

					<div className="font-semibold mb-16">
						<p className="text-sm font-medium mt-4 text-white">Output:</p>

						<div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2">
							{problem.examples[activeTestCaseId].outputText}
						</div>
					</div>
				</div>
			</Split>

			<EditorFooter handleSubmit={handleSubmit} />
		</div>
	);
}
