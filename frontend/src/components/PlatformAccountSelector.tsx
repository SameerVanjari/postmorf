import { accounts, platforms } from "../data/mockData";
import type { Account } from "../lib/types";
import { cn } from "../lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface PlatformAccountSelectorProps {
	readonly selected: string[];
	readonly onChange: (selected: string[]) => void;
}

function getPlatformAccounts(platformId: string): Account[] {
	return accounts.filter((a) => a.platformId === platformId);
}

export function PlatformAccountSelector({
	selected,
	onChange,
}: PlatformAccountSelectorProps) {
	const togglePlatform = (platformId: string) => {
		if (selected.includes(platformId)) {
			onChange(selected.filter((s) => s !== platformId));
		} else {
			onChange([...selected, platformId]);
		}
	};

	return (
		<div className="space-y-3">
			{platforms.map((platform) => {
				const platformAccounts = getPlatformAccounts(platform.id);
				const isSelected = selected.includes(platform.id);

				return (
					<div key={platform.id}>
						<button
							type="button"
							onClick={() => togglePlatform(platform.id)}
							className={cn(
								"flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-colors",
								isSelected
									? "border-primary bg-primary/5"
									: "border-border hover:bg-muted/50",
							)}
						>
							<div
								className={cn(
									"flex h-6 w-6 items-center justify-center rounded border-2 transition-colors",
									isSelected
										? "border-primary bg-primary"
										: "border-muted-foreground/30",
								)}
							>
								{isSelected && (
									<svg
										width="12"
										height="12"
										viewBox="0 0 12 12"
										fill="none"
										aria-hidden="true"
									>
										<title>Selected</title>
										<path
											d="M2.5 6L5 8.5L9.5 3.5"
											stroke="white"
											strokeWidth="1.5"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
								)}
							</div>
							<div className="min-w-0 flex-1">
								<p className="text-[14px] font-medium">{platform.name}</p>
								{platformAccounts.length > 0 && (
									<div className="mt-1 flex -space-x-1.5">
										{platformAccounts.slice(0, 3).map((account) => (
											<Avatar
												key={account.id}
												className="h-5 w-5 border-2 border-background"
											>
												<AvatarImage src={account.avatar} />
												<AvatarFallback className="text-[10px]">
													{account.handle.charAt(0).toUpperCase()}
												</AvatarFallback>
											</Avatar>
										))}
									</div>
								)}
							</div>
						</button>

						{isSelected && platformAccounts.length > 0 && (
							<div className="ml-9 mt-2 space-y-1">
								{platformAccounts.map((account) => (
									<div
										key={account.id}
										className="flex items-center gap-2 rounded-md border border-border px-2.5 py-2"
									>
										<Avatar className="h-5 w-5">
											<AvatarImage src={account.avatar} />
											<AvatarFallback className="text-[10px]">
												{account.handle.charAt(0).toUpperCase()}
											</AvatarFallback>
										</Avatar>
										<div className="min-w-0">
											<p className="truncate text-[13px] font-medium">
												{account.displayName}
											</p>
											<p className="truncate text-[11px] text-muted-foreground">
												{account.handle}
											</p>
										</div>
									</div>
								))}
							</div>
						)}
					</div>
				);
			})}
		</div>
	);
}
