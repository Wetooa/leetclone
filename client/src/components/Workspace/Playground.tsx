import Split from "react-split";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { langs } from "@uiw/codemirror-extensions-langs";
import PreferenceNav from "./PreferenceNav/PreferenceNav";
import CaseButton from "./CaseButton";
import EditorFooter from "./EditorFooter";

interface PlaygroundProps {}

export default function Playground({}: PlaygroundProps) {
	const boilerPlate = `function twoSum(nums, target) {
	// Write your code here
}`;

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
						value={boilerPlate}
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
						<CaseButton name="Case 1" />
						<CaseButton name="Case 2" />
						<CaseButton name="Case 3" />
					</div>

					<div className="font-semibold">
						<p className="text-sm font-medium mt-4 text-white">Input:</p>

						<div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2">
							nums: [2, 7, 11, 15], target: 9
						</div>
					</div>

					<div className="font-semibold mb-16">
						<p className="text-sm font-medium mt-4 text-white">Output:</p>

						<div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2">
							[10, 11, 12]
						</div>
					</div>
				</div>
			</Split>

			<EditorFooter />
		</div>
	);
}
