import Split from "react-split";
import CodeMirror from "@uiw/react-codemirror"
import PreferenceNav from "./PreferenceNav/PreferenceNav";

interface PlaygroundProps {}

export default function Playground({}: PlaygroundProps) {
	return (
		<div className="bg-dark-layer-1 flex flex-col relative">
			<PreferenceNav />

			<Split
				className="h=[calc(100vh-94px)]"
				direction="vertical"
				sizes={[60, 40]}
				minSize={60}
			>
				<div className="w-full overflow-auto">
					<CodeMirr
				</div>
				<div></div>
			</Split>
		</div>
	);
}
