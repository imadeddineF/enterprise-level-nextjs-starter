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
import { ArrowLeft, Lock } from "lucide-react";

export function ResetPasswordForm({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card>
				<CardHeader className="text-center">
					<CardTitle className="text-xl">Set new password</CardTitle>
					<CardDescription>
						Enter your new password below to complete the reset
						process
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form>
						<div className="grid gap-6">
							<div className="grid gap-3">
								<Label htmlFor="password">New Password</Label>
								<div className="relative">
									<Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
									<Input
										id="password"
										type="password"
										placeholder="Enter your new password"
										className="pl-10"
										required
									/>
								</div>
							</div>
							<div className="grid gap-3">
								<Label htmlFor="confirmPassword">
									Confirm New Password
								</Label>
								<div className="relative">
									<Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
									<Input
										id="confirmPassword"
										type="password"
										placeholder="Confirm your new password"
										className="pl-10"
										required
									/>
								</div>
							</div>
							<Button type="submit" className="w-full">
								Update password
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
