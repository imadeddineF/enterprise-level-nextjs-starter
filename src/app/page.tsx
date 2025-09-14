import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, Github } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "@/components/shared/mode-toggle";

export default function LandingPage() {
	return (
		<div className="min-h-screen bg-background">
			{/* Header */}
			<header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-10">
				<div className="container flex h-16 max-w-screen-xl items-center justify-between">
					<div className="flex items-center space-x-2">
						<span className="font-bold text-xl">
							NextJS 15 --Starter--
						</span>
					</div>
					<nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
						<Link
							href={"https://github.com/imadeddineF"}
							target="_blank"
						>
							<Button variant="outline" size="sm">
								<Github className="mr-2 h-4 w-4" />
								GitHub
							</Button>
						</Link>
						<ModeToggle />
					</nav>
				</div>
			</header>

			{/* Hero Section */}
			<section className="container max-w-screen-xl mx-auto px-4 py-24 text-center">
				<div className="mx-auto max-w-4xl">
					<Badge variant="secondary" className="mb-6">
						<Sparkles className="mr-1 h-3 w-3" />
						Next.js 15 - Starter
					</Badge>
					<h1 className="text-4xl font-bold tracking-tight text-balance sm:text-6xl lg:text-7xl mb-6">
						Make you life{" "}
						<span className="text-primary">Easier</span>
					</h1>
					<p className="mx-auto max-w-2xl text-lg text-muted-foreground text-pretty mb-8">
						Experience the next generation of React development with
						our elegant starter template. Optimized for performance,
						built for scale, designed for developers who demand
						excellence.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Button size="lg" className="text-base">
							Get Started
							<ArrowRight className="ml-2 h-4 w-4" />
						</Button>
						<Button
							variant="outline"
							size="lg"
							className="text-base bg-transparent"
						>
							View Demo
						</Button>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className="border-t border-border bg-muted/30">
				<div className="container max-w-screen-xl mx-auto px-10 py-12">
					<div className="flex flex-col md:flex-row justify-between items-center">
						<div className="flex items-center space-x-2 mb-4 md:mb-0">
							<span className="font-bold text-xl">NextJS 15</span>
						</div>
						<div className="flex items-center space-x-6 text-sm text-muted-foreground">
							<Link
								href="https://github.com/imadeddineF"
								target="_blank"
								className="hover:text-primary transition-colors"
							>
								GitHub
							</Link>
						</div>
					</div>
					<div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
						© 2025 NextJS 15 Starter. Built with for developers.
					</div>
				</div>
			</footer>
		</div>
	);
}
