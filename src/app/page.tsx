import CreateTenantForm from "@/features/multi-tenant/create-tenant-form";

export default function Home() {
	return (
		<div className="flex min-h-screen items-center justify-center p-10">
			<CreateTenantForm />
		</div>
	);
}
