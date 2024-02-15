/** @type {import('next').NextConfig} */
import withPlaiceholder from "@plaiceholder/next";
const nextConfig = {
	experimental: {
		typedRoutes: true,
	},
	images: {
		domains: ["naszsklep-api.vercel.app"],
	},
};

export default withPlaiceholder(nextConfig);
