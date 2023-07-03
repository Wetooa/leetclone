import { Problem } from "@/utils/types/problem";
import Image from "next/image";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { BsCheck2Circle } from "react-icons/bs";
import { TiStarOutline } from "react-icons/ti";

interface ProblemDescriptionProps {
	problem: Problem;
}

export default function ProblemDescription({
	problem,
}: ProblemDescriptionProps) {
	return (
		<div className="bg-dark-layer-1">
			<div className="flex h-11 w-full items-center pt-2 bg-dark-layer-2 text-white overflow-x-hidden">
				<div
					className={
						"bg-dark-layer-1 rounded-t-[5px] px-5 py-[10px] text-xs cursor-pointer"
					}
				>
					Description
				</div>
			</div>

			<div className="flex px-0 py-4 h-[calc(100vh-94px)] overflow-y-auto">
				<div className="px-5">
					<div className="w-full">
						<div className="flex space-x-4">
							<div className="flex-1 mr-2 text-lg text-white font-medium">
								{problem.title}
							</div>
						</div>
						<div className="flex items-center mt-3">
							<div
								className={`text-olive bg-olive inline-block rounded-[21px] bg-opacity-[.15] px-2.5 py-1 text-xs font-medium capitalize `}
							>
								Easy
							</div>
							<div className="rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-green-s text-dark-green-s">
								<BsCheck2Circle />
							</div>
							<div className="flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px]  ml-4 text-lg transition-colors duration-200 text-dark-gray-6">
								<AiFillLike />
								<span className="text-xs">120</span>
							</div>
							<div className="flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px]  ml-4 text-lg transition-colors duration-200 text-green-s text-dark-gray-6">
								<AiFillDislike />
								<span className="text-xs">2</span>
							</div>
							<div className="cursor-pointer hover:bg-dark-fill-3  rounded p-[3px]  ml-4 text-xl transition-colors duration-200 text-green-s text-dark-gray-6 ">
								<TiStarOutline />
							</div>
						</div>

						<div className="text-white text-sm">
							<div
								dangerouslySetInnerHTML={{ __html: problem.problemStatement }}
							/>
						</div>

						<div className="mt-4">
							{problem.examples.map((example, index) => {
								return (
									<div key={example.id}>
										<p className="font-medium text-white mb-2">
											Example {index + 1}:{" "}
										</p>

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
					</div>
				</div>
			</div>
		</div>
	);
}
