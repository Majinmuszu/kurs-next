import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/ui/molecules/Navigation";
import Footer from "@/ui/molecules/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "My awesome szop",
	description: "My awesome description for my awesome szop.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Navigation />
				<main className="container mx-auto flex-1 p-4">{children}</main>
				<Footer />
			</body>
		</html>
	);
}
