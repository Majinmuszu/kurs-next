import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/ui/molecules/Navigation";
import { Footer } from "@/ui/molecules/Footer";

const inter = Inter({ subsets: ["latin", "latin-ext"] });

export const metadata: Metadata = {
	title: "My awesome szop",
	description: "My awesome description for my awesome szop.",
};

export default function RootLayout({
	children,
	modalCart,
}: Readonly<{
	children: React.ReactNode;
	modalCart: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${inter.className} min-h-screen`}>
				<Navigation />
				<main className="container mx-auto min-h-[calc(100vh-56px)] flex-1 p-4 pt-36 sm:pt-28 ">
					{children}
				</main>
				<Footer />
				{modalCart}
			</body>
		</html>
	);
}
