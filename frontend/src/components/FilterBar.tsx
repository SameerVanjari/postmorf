import { Search } from "lucide-react";
import { Input } from "./ui/input";

interface FilterBarProps {
	readonly searchQuery: string;
	readonly onSearchChange: (value: string) => void;
	readonly placeholder?: string;
}

export function FilterBar({
	searchQuery,
	onSearchChange,
	placeholder = "Search posts...",
}: FilterBarProps) {
	return (
		<div className="flex items-center gap-3">
			<div className="relative flex-1 max-w-sm">
				<Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
				<Input
					placeholder={placeholder}
					value={searchQuery}
					onChange={(e) => onSearchChange(e.target.value)}
					className="h-9 pl-8 text-sm"
				/>
			</div>
		</div>
	);
}
