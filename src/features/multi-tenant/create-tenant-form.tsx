import Link from "next/link";
import { SubdomainForm } from "./subdomain-form";
import { rootDomain } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Settings } from "lucide-react";

export default async function CreateTenantForm() {
	return (
		<div className="p-10 border h-fit relative rounded-md">
			{/* Header */}
			<div className="absolute top-6 right-6">
				<Link
					href="/admin"
					className="inline-flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors rounded-md"
				>
					<Settings className="h-4 w-4" />
					Admin
				</Link>
			</div>

			{/* Main Content */}
			<div className="flex items-center justify-center">
				<div className="w-full max-w-md">
					{/* Title Section */}
					<div className="text-center mb-8">
						<div className="inline-flex items-center justify-center w-16 h-16 bg-secondary rounded-full mb-4">
							<span className="text-2xl font-bold">
								{rootDomain.charAt(0).toUpperCase()}
							</span>
						</div>
						<h1 className="text-3xl font-bold mb-2">
							Welcome to {rootDomain}
						</h1>
						<p className="text-muted-foreground">
							Create your personalized space with a custom
							subdomain and icon
						</p>
					</div>

					{/* Form Card */}
					<Card className="p-6">
						<SubdomainForm />
					</Card>

					{/* Footer */}
					<p className="text-center text-xs text-muted-foreground mt-6">
						Your subdomain will be available at{" "}
						<span className="font-mono">yourname.{rootDomain}</span>
					</p>
				</div>
			</div>
		</div>
	);
}
