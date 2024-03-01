"use client";
const GlobalError = () => (
	<html lang="en">
		<head>
			<meta charSet="utf-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<title>Error generic</title>
		</head>
		<body className="flex h-screen items-center justify-center">
			<div className="text-center">
				<h1 className="mb-4 text-4xl font-bold">Error</h1>
				<p className="text-lg">Something went wrong. Please try again later.</p>
			</div>
		</body>
	</html>
);

export default GlobalError;
