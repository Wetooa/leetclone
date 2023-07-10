import Workspace from "@/components/Workspace/Workspace";
import Topbar from "@/components/Topbar/Topbar";
import { problems } from "@/utils/problems";
import { GetStaticPathsResult } from "next";

interface ProblemsPageProps {}

export default async function ProblemsPage(props: any) {
	const { pid } = props.params;
	const problem = problems[pid];
	problem.handlerFunction = JSON.stringify(problem.handlerFunction);

	return (
		<>
			<Topbar problemPage pid={pid} />
			<Workspace problem={problem} />
		</>
	);
}

async function getStaticPaths(): Promise<GetStaticPathsResult> {
	const paths = Object.keys(problems).map((key) => ({
		params: { pid: key },
	}));

	return {
		paths,
		fallback: false,
	};
}

// export async function getServerSideProps({}) {
// 	// const { pid } = params;
// 	// const problem = problems[pid];

// 	const data = await fetch("https://jsonplaceholder.typicode.com/todos/1").then(
// 		(response) => response.json()
// 	);

// 	return {
// 		props: {
// 			data,
// 		},
// 	};

// 	// if (!problem) {
// 	// 	return {
// 	// 		notFound: true,
// 	// 	};
// 	// }

// 	// problem.handlerFunction = JSON.stringify(problem.handlerFunction);

// 	// return {
// 	// 	props: { problem },
// 	// };
// }
