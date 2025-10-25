import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from "@/components/ui/input-otp";
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
							<div className="grid gap-6">
								<div className="flex justify-center">
									<InputOTP maxLength={6}>
										<InputOTPGroup>
											<InputOTPSlot index={0} />
										</InputOTPGroup>
										<InputOTPGroup>
											<InputOTPSlot index={1} />
										</InputOTPGroup>
										<InputOTPGroup>
											<InputOTPSlot index={2} />
										</InputOTPGroup>
										<InputOTPGroup>
											<InputOTPSlot index={3} />
										</InputOTPGroup>
										<InputOTPGroup>
											<InputOTPSlot index={4} />
										</InputOTPGroup>
										<InputOTPGroup>
											<InputOTPSlot index={5} />
										</InputOTPGroup>
									</InputOTP>
								</div>
								<div className="text-center">
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
							<div className="text-center">
								<Link
									href="/sign-in"
									className="inline-flex items-center gap-2 text-sm underline-offset-4 hover:underline"
								>
									<ArrowLeft className="h-4 w-4" />
									Back to sign in
								</Link>
							</div>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
