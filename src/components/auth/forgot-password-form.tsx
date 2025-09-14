import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";

export default function ForgotPasswordForm({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card>
				<CardHeader className="text-center">
					<CardTitle className="text-xl">
						Reset your password
					</CardTitle>
					<CardDescription>
						Enter your email address and we&apos;ll send you a link
						to reset your password
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form>
						<div className="grid gap-6">
							<div className="grid gap-3">
								<Label htmlFor="email">Email address</Label>
								<div className="relative">
									<Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
									<Input
										id="email"
										type="email"
										placeholder="Enter your email address"
										className="pl-10"
										required
									/>
								</div>
							</div>
							<Button type="submit" className="w-full">
								Send reset link
							</Button>
						</div>
					</form>
					<div className="mt-6 text-center">
						<Link
							href="/sign-in"
							className="inline-flex items-center gap-2 text-sm underline-offset-4 hover:underline"
						>
							<ArrowLeft className="h-4 w-4" />
							Back to sign in
						</Link>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
