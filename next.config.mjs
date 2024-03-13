/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		typedRoutes: true,
		mdxRs: true,
	},
	images: {
		domains: ["naszsklep-api.vercel.app", "static-ourstore.hyperfunctor.com"],
	},
	async redirects() {
		return [
			{
				source: "/products",
				destination: "/products/1",
				permanent: false,
			},
		];
	},
};

export default nextConfig;
