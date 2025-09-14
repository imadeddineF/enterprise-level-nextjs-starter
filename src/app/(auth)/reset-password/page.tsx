import { ResetPasswordForm } from "@/components/auth/reset-password-form";
import React from "react";

export default function ResetPasswordPage() {
	return (
		<div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
			<div className="flex w-full max-w-sm flex-col gap-6">
				<ResetPasswordForm />
			</div>
		</div>
	);
}
