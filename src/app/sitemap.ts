import type { MetadataRoute } from "next";

export const baseUrl = "https://schoolaialgiers.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const routes = ["", "/(landing)"].map((route) => ({
		url: `${baseUrl}${route}`,
		lastModified: new Date().toISOString().split("T")[0],
	}));

	return [...routes];
}
