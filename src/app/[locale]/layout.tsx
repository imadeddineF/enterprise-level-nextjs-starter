import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { baseUrl } from "../sitemap";
import ReactQueryProvider from "@/providers/react-query-provider";
import { Toaster } from "@/components/ui/sonner";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Locale, hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export async function generateMetadata(
	props: Omit<LayoutProps<"/[locale]">, "children">
): Promise<Metadata> {
	const { locale } = await props.params;

	const t = await getTranslations({
		locale: locale as Locale,
		namespace: "root.metadata",
	});

	return {
		title: {
			default: t("title"),
			template: "%s | Next Starter",
		},
		description: t("description"),
		icons: {
			icon: "/favicon.ico",
		},
		openGraph: {
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
	};
}

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
	children,
	params,
}: LayoutProps<"/[locale]">) {
	const { locale } = await params;
	if (!hasLocale(routing.locales, locale)) {
		notFound();
	}

	// Enable static rendering
	setRequestLocale(locale);

	// Load messages for the client provider
	const messages = (await import(`../../messages/${locale}.json`)).default;

	return (
		<html lang={locale} suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<NextIntlClientProvider
						locale={locale as Locale}
						messages={messages}
					>
						<ReactQueryProvider>{children}</ReactQueryProvider>
						<Toaster richColors position="top-center" />
					</NextIntlClientProvider>
				</ThemeProvider>
				<Analytics />
			</body>
		</html>
	);
}
