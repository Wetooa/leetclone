import Split from "react-split";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { langs } from "@uiw/codemirror-extensions-langs";
import PreferenceNav from "./PreferenceNav/PreferenceNav";
import EditorFooter from "./EditorFooter";
import { Problem } from "@/utils/types/problem";
import { useState } from "react";

interface PlaygroundProps {
	problem: Problem;
}

export default function Playground({ problem }: PlaygroundProps) {
	const [activeTestCaseId, setActiveTestCaseId] = useState(0);

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
						value={problem.starterCode}
						theme={vscodeDark}
						extensions={[langs.tsx()]}
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
									className="mr-2 items-start mt-2 text-white"
								>
									<div className="flex flex-wrap items-center gap-y-4">
										<div className="font-medium items-center transition-all focus:outline-none inline-flex bg-dark-fill-3 hover:bg-dark-fill-2 relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap">
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

			<EditorFooter />
		</div>
	);
}
