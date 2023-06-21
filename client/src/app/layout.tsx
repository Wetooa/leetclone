import "./globals.css";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "./providers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
				<ToastContainer />
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
