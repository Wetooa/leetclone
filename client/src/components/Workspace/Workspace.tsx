"use client";

import Split from "react-split";
import ProblemDescription from "./ProblemDescription";
import Playground from "./Playground";
import { Problem } from "@/utils/types/problem";
import Confetti from "react-confetti";
import { useState } from "react";

interface WorkspaceProps {
	problem: Problem;
}

export default function Workspace({ problem }: WorkspaceProps) {
	const [success, setSuccess] = useState(false);

	const [data, setData] = useState({
		liked: false,
		disliked: false,
		starred: false,
		solved: false,
	});

	return (
		<Split className="split" minSize={0}>
			<ProblemDescription problem={problem} data={data} setData={setData} />

			<div className="bg-dark-fill-2">
				<Playground
					problem={problem}
					setSuccess={setSuccess}
					data={data}
					setData={setData}
				/>

				{success && <Confetti gravity={0.3} tweenDuration={4000} />}
			</div>
		</Split>
	);
}
