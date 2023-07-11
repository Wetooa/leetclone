import { Problem } from "@/utils/types/problem";

interface ProblemConstraintsProps {
	problem: Problem;
}

export default function ProblemConstraints({
	problem,
}: ProblemConstraintsProps) {
	return (
		<div className="my-5 text-sm pb-4">
			<div className="text-white font-medium">Constraints:</div>
			<ul className="text-white ml-5 list-disc">
				<div
					dangerouslySetInnerHTML={{
						__html: problem.constraints,
					}}
				/>
			</ul>
		</div>
	);
}
