import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { baseUrl } from "../sitemap";
import ReactQueryProvider from "@/providers/react-query-provider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	metadataBase: new URL(baseUrl),
	title: {
		default: "SOAI | Home",
		template: "%s | SOAI",
	},
	description: "",
	openGraph: {
		title: "SOAI | Home",
		description: "",
		url: baseUrl,
		siteName: "",
		locale: "en",
		type: "website",
		images: [
			{
				url: "/og.png",
				width: 800,
				height: 600,
			},
			{
				url: "/og.png",
				width: 1800,
				height: 1600,
			},
		],
	},
	twitter: {
		title: "SOAI | Home",
		description: "",
		images: [
			{
				url: "/og.png",
				width: 800,
				height: 600,
			},
			{
				url: "/og.png",
				width: 1800,
				height: 1600,
			},
		],
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	icons: {
		icon: "/favicon.ico",
		shortcut: "/favicon-16x16.png",
		apple: "/apple-touch-icon.png",
	},
};

export default function LocaleLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<ReactQueryProvider>{children}</ReactQueryProvider>
					<Toaster richColors position="top-center" />
				</ThemeProvider>
			</body>
		</html>
	);
}
