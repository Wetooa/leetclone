import { Problem } from "@/utils/types/problem";

interface ProblemStatementProps {
	problem: Problem;
}

export default function ProblemStatement({ problem }: ProblemStatementProps) {
	return (
		<div className="text-white text-sm">
			<div dangerouslySetInnerHTML={{ __html: problem.problemStatement }} />
		</div>
	);
}
