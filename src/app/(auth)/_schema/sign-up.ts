import { z } from "zod";
// import { fromZodError } from "zod-validation-error";

const SignUpSchema = z
	.object({
		firstName: z
			.string()
			.trim()
			.min(3, "First name must be at least 3 characters")
			.max(30, "First name must be at most 30 characters"),
		lastName: z
			.string()
			.trim()
			.min(3, "Last name must be at least 3 characters")
			.max(30, "Last name must be at most 30 characters"),
		email: z.email("Please enter a valid email address"),
		password: z
			.string()
			.min(8, "Password must be at least 8 characters long")
			.regex(
				/[A-Z]/,
				"Password must contain at least one uppercase letter"
			)
			.regex(
				/[a-z]/,
				"Password must contain at least one lowercase letter"
			)
			.regex(/[0-9]/, "Password must contain at least one number")
			.regex(
				/[^A-Za-z0-9]/,
				"Password must contain at least one special character"
			),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

export { SignUpSchema };
export type TSignUp = z.infer<typeof SignUpSchema>;
