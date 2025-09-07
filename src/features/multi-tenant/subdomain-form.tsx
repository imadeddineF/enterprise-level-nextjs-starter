"use client";

import { useState } from "react";
import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Smile, Globe } from "lucide-react";
import {
	EmojiPicker,
	EmojiPickerContent,
	EmojiPickerSearch,
	EmojiPickerFooter,
} from "@/components/ui/emoji-picker";
import { createSubdomainAction } from "@/actions/multi-tenant/create-subdomain-action";
import { rootDomain } from "@/lib/utils";

type CreateState = {
	error?: string;
	success?: boolean;
	subdomain?: string;
	icon?: string;
};

function SubdomainInput({ defaultValue }: { defaultValue?: string }) {
	return (
		<div className="space-y-2">
			<Label htmlFor="subdomain" className="text-sm font-medium">
				Subdomain
			</Label>
			<div className="relative">
				<Globe className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
				<Input
					id="subdomain"
					name="subdomain"
					placeholder="Enter your subdomain"
					defaultValue={defaultValue}
					className="pl-10 pr-28"
					required
				/>
				<div className="absolute right-0 top-0 h-full flex items-center bg-muted border-l px-3 rounded-r-md text-sm text-muted-foreground">
					.{rootDomain}
				</div>
			</div>
		</div>
	);
}

function IconPicker({
	icon,
	setIcon,
	defaultValue,
}: {
	icon: string;
	setIcon: (icon: string) => void;
	defaultValue?: string;
}) {
	const [isPickerOpen, setIsPickerOpen] = useState(false);

	const handleEmojiSelect = ({ emoji }: { emoji: string }) => {
		setIcon(emoji);
		setIsPickerOpen(false);
	};

	return (
		<div className="space-y-2">
			<Label htmlFor="icon" className="text-sm font-medium">
				Choose an Icon
			</Label>
			<input type="hidden" name="icon" value={icon} required />
			<div className="flex items-center gap-3">
				<div className="w-12 h-12 border-2 border-dashed rounded-lg flex items-center justify-center bg-muted">
					{icon ? (
						<span className="text-2xl">{icon}</span>
					) : (
						<Smile className="h-5 w-5 text-muted-foreground" />
					)}
				</div>
				<Popover open={isPickerOpen} onOpenChange={setIsPickerOpen}>
					<PopoverTrigger asChild>
						<Button
							type="button"
							variant="outline"
							className="flex-1"
						>
							<Smile className="h-4 w-4 mr-2" />
							{icon ? "Change Icon" : "Select Icon"}
						</Button>
					</PopoverTrigger>
					<PopoverContent className="p-0 w-[256px]" align="end">
						<EmojiPicker
							className="h-[300px] w-[256px]"
							defaultValue={defaultValue}
							onEmojiSelect={handleEmojiSelect}
						>
							<EmojiPickerSearch />
							<EmojiPickerContent />
							<EmojiPickerFooter />
						</EmojiPicker>
					</PopoverContent>
				</Popover>
			</div>
			<p className="text-xs text-muted-foreground">
				Pick an emoji to represent your space
			</p>
		</div>
	);
}

export function SubdomainForm() {
	const [icon, setIcon] = useState("");

	const [state, action, isPending] = useActionState<CreateState, FormData>(
		createSubdomainAction,
		{}
	);

	return (
		<div className="space-y-6">
			<form action={action} className="space-y-6">
				<SubdomainInput defaultValue={state?.subdomain} />

				<IconPicker
					icon={icon}
					setIcon={setIcon}
					defaultValue={state?.icon}
				/>

				{state?.error && (
					<div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
						{state.error}
					</div>
				)}

				{state?.success && (
					<div className="p-3 text-sm text-primary bg-primary/10 border border-primary/20 rounded-md">
						Subdomain created successfully!
					</div>
				)}

				<Button
					type="submit"
					className="w-full h-11"
					disabled={isPending || !icon}
				>
					{isPending ? "Creating..." : "Create Subdomain"}
				</Button>
			</form>
		</div>
	);
}
