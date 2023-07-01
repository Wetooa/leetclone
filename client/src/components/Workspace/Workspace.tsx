import Split from "react-split";
import ProblemDescription from "./ProblemDescription";
import Playground from "./Playground";

interface WorkspaceProps {}

export default function Workspace({}: WorkspaceProps) {
	return (
		<Split className="split" minSize={0}>
			<ProblemDescription />
			<Playground />
		</Split>
	);
}
