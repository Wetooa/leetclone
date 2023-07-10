import Image from "next/image";
import { Problem } from "@/utils/types/problem";

interface ProblemExampleProps {
	problem: Problem;
}

export default function ProblemExample({ problem }: ProblemExampleProps) {
	return (
		<div className="mt-4">
			{problem.examples.map((example, index) => {
				return (
					<div key={example.id}>
						<p className="font-medium text-white mb-2">Example {index + 1}: </p>

						{example.img && (
							<Image
								src={example.img}
								width={500}
								height={500}
								alt={"Image Example " + (index + 1)}
							/>
						)}
						<div className="example-card">
							<pre>
								<p>
									<strong className="text-white">Input: </strong>
									{example.inputText}
									<br />
								</p>

								<p>
									<strong>Output: </strong>
									{example.outputText}
									<br />
								</p>

								{example.explanation && (
									<p>
										<strong>Explanation: </strong>
										{example.explanation}
									</p>
								)}
							</pre>
						</div>
					</div>
				);
			})}
		</div>
	);
}
