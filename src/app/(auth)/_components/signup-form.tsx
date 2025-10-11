"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { SignUpSchema, TSignUp } from "../_schema/sign-up";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@/components/ui/input-group";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

export function SignUpForm() {
	const [showPassword, setShowPassword] = useState(false);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<TSignUp>({
		resolver: zodResolver(SignUpSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
	});

	const handleSubmitMutation = useMutation({
		mutationFn: async (data: Omit<TSignUp, "confirmPassword">) =>
			await authClient.signUp.email({
				...data,
				name: `${data.firstName} ${data.lastName}`,
			}),
		onSuccess: () => {
			toast.success("Account created successfully!");
			reset();
		},
		onError: (error: any) => {
			toast.error(error.message || "Something went wrong");
		},
	});

	const onSubmit: SubmitHandler<TSignUp> = (data) => {
		const signUpData: Omit<TSignUp, "confirmPassword"> = {
			firstName: data.firstName,
			lastName: data.lastName,
			email: data.email,
			password: data.password,
		};
		console.log(signUpData);
		handleSubmitMutation.mutate(signUpData);
	};

	return (
		<Card>
			<CardHeader className="text-center">
				<CardTitle className="text-xl">Create your account</CardTitle>
				<CardDescription>
					Sign up to get started with your new account
				</CardDescription>
			</CardHeader>

			<CardContent>
				<div className="grid gap-6">
					<div className="flex flex-col gap-4">
						<Button variant="outline" className="w-full">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								className="mr-2 h-4 w-4"
							>
								<path
									d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
									fill="currentColor"
								/>
							</svg>
							Continue with Apple
						</Button>
						<Button variant="outline" className="w-full">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								className="mr-2 h-4 w-4"
							>
								<path
									d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
									fill="currentColor"
								/>
							</svg>
							Continue with Google
						</Button>
					</div>

					<div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
						<span className="relative z-10 bg-card px-2 text-muted-foreground">
							Or continue with
						</span>
					</div>

					<form
						onSubmit={handleSubmit(onSubmit)}
						className="grid gap-6"
					>
						<FieldGroup className="grid grid-cols-2 gap-4">
							<Field>
								<FieldLabel htmlFor="firstName">
									First name
								</FieldLabel>
								<Input
									id="firstName"
									placeholder="Imad Eddine"
									{...register("firstName")}
									required
									disabled={handleSubmitMutation.isPending}
								/>
								<FieldError>
									{errors.firstName?.message}
								</FieldError>
							</Field>
							<Field>
								<FieldLabel htmlFor="lastName">
									Last name
								</FieldLabel>
								<Input
									id="lastName"
									{...register("lastName")}
									placeholder="Fillali"
									required
									disabled={handleSubmitMutation.isPending}
								/>
								<FieldError>
									{errors.lastName?.message}
								</FieldError>
							</Field>
						</FieldGroup>

						<Field>
							<FieldLabel htmlFor="email">Email</FieldLabel>
							<Input
								id="email"
								type="email"
								{...register("email")}
								placeholder="m@example.com"
								required
								disabled={handleSubmitMutation.isPending}
							/>
							<FieldError>{errors.email?.message}</FieldError>
						</Field>

						<Field>
							<FieldLabel htmlFor="password">Password</FieldLabel>
							<InputGroup>
								<InputGroupInput
									id="password"
									{...register("password")}
									type={showPassword ? "text" : "password"}
									placeholder="Enter your password"
									required
									disabled={handleSubmitMutation.isPending}
								/>
								<InputGroupAddon
									align="inline-end"
									className="cursor-pointer"
									onClick={() =>
										setShowPassword(!showPassword)
									}
								>
									{showPassword ? <EyeOff /> : <Eye />}
								</InputGroupAddon>
							</InputGroup>
							<FieldError>{errors.password?.message}</FieldError>
						</Field>

						<Field>
							<FieldLabel htmlFor="confirmPassword">
								Confirm Password
							</FieldLabel>
							<Input
								id="confirmPassword"
								{...register("confirmPassword")}
								type="password"
								placeholder="Confirm your password"
								required
								disabled={handleSubmitMutation.isPending}
							/>
							<FieldError>
								{errors.confirmPassword?.message}
							</FieldError>
						</Field>

						<Button
							type="submit"
							className="w-full"
							disabled={handleSubmitMutation.isPending}
						>
							{handleSubmitMutation.isPending && <Spinner />}
							Create account
						</Button>
					</form>

					<div className="text-center text-sm">
						Already have an account?{" "}
						<Link
							href="/sign-in"
							className="underline underline-offset-4"
						>
							Sign in
						</Link>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
