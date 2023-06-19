import "./globals.css";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "./providers";
import Topbar from "@/components/Topbar/Topbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "LeetClone",
	description: "A LeetCode Clone",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
