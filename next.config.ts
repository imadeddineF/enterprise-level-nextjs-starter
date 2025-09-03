import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";
import path from "path";

const nextConfig: NextConfig = {
	turbopack: {
		root: path.join(__dirname, ".."),
	},
};

const bundleAnalyzer = withBundleAnalyzer({
	enabled: process.env.ANALYZE === "true",
	openAnalyzer: true,
});

export default bundleAnalyzer(nextConfig);
