"use client";

import Topbar from "@/components/Topbar/Topbar";
import Workspace from "@/components/Workspace/Workspace";

interface ProblemsPageProps {}

export default function ProblemsPage({}: ProblemsPageProps) {
	return (
		<>
			<Topbar problemPage />

			<Workspace />
		</>
	);
}
