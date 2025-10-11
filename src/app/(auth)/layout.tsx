import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

export default function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="flex flex-col items-center min-h-svh justify-center gap-1 p-6 md:p-10">
			<Tabs className="mb-4">
				<TabsList>
					<Link href={"/sign-in"}>
						<TabsTrigger value="signin">Sign In</TabsTrigger>
					</Link>
					<Link href={"/sign-up"}>
						<TabsTrigger value="signup">Sign Up</TabsTrigger>
					</Link>
					<Link href={"/sign-up/verify"}>
						<TabsTrigger value="verify">Verify email</TabsTrigger>
					</Link>
					<Link href={"/forgot-password"}>
						<TabsTrigger value="forgot-password">
							Forgot Password
						</TabsTrigger>
					</Link>
					<Link href={"/reset-password"}>
						<TabsTrigger value="reset-password">
							Reset Password
						</TabsTrigger>
					</Link>
					<Link href={"/otp-code"}>
						<TabsTrigger value="otp-code">OTP Code</TabsTrigger>
					</Link>
				</TabsList>
			</Tabs>

			<div className="flex w-full max-w-sm flex-col gap-6">
				{children}
			</div>
		</div>
	);
}
