import Split from "react-split";
import ProblemDescription from "./ProblemDescription";
import CodeEditor from "./CodeEditor";

interface WorkspaceProps {}

export default function Workspace({}: WorkspaceProps) {
	return (
		<Split className="split" minSize={0}>
			<ProblemDescription />
			<CodeEditor />
		</Split>
	);
}
