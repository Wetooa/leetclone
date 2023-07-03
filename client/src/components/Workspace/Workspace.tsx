"use client";

import Split from "react-split";
import ProblemDescription from "./ProblemDescription";
import Playground from "./Playground";
import { Problem } from "@/utils/types/problem";

interface WorkspaceProps {
	problem: Problem;
}

export default function Workspace({ problem }: WorkspaceProps) {
	return (
		<Split className="split" minSize={0}>
			<ProblemDescription problem={problem} />

			<div className="bg-dark-fill-2">
				<Playground problem={problem} />
			</div>
		</Split>
	);
}
