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
import { ArrowLeft } from "lucide-react";

export function OtpCodeForm({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card>
				<CardHeader className="text-center">
					<CardTitle className="text-xl">Verify your email</CardTitle>
					<CardDescription>
						Enter the 6-digit code we sent to your email address
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form>
						<div className="grid gap-6">
							<div className="grid gap-3">
								<Label htmlFor="otpCode">
									Verification Code
								</Label>
								<div className="flex gap-2">
									{[1, 2, 3, 4, 5, 6].map((index) => (
										<Input
											key={index}
											type="text"
											maxLength={1}
											className="w-12 h-12 text-center text-lg font-mono"
											inputMode="numeric"
											pattern="[0-9]"
											autoComplete="one-time-code"
										/>
									))}
								</div>
								<p className="text-sm text-muted-foreground">
									Didn&apos;t receive a code?{" "}
									<Button
										type="button"
										variant="link"
										className="p-0 h-auto text-sm"
									>
										Resend code
									</Button>
								</p>
							</div>
							<Button type="submit" className="w-full">
								Verify code
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
