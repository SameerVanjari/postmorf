import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays, Globe } from "lucide-react";
import { useState } from "react";
import { PlatformAccountSelector } from "../components/PlatformAccountSelector";
import { PostEditor } from "../components/PostEditor";
import { Button } from "../components/ui/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "../components/ui/card";
import { SidebarTrigger } from "../components/ui/sidebar";

export const Route = createFileRoute("/editor")({
	component: EditorPage,
});

function EditorPage() {
	const [content, setContent] = useState("");
	const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);

	return (
		<main className="mx-auto max-w-[1200px] px-6 py-8">
			<div className="mb-8 flex items-center gap-4">
				<SidebarTrigger className="h-8 w-8" />
				<div>
					<h1 className="text-[24px] font-semibold leading-tight tracking-tight">
						Editor Workspace
					</h1>
					<p className="mt-1 text-sm text-muted-foreground">
						Rich text editor with sidebar panels.
					</p>
				</div>
			</div>

			<div className="grid grid-cols-[1fr_280px] gap-8">
				<div className="space-y-4">
					<PostEditor
						value={content}
						onChange={setContent}
						minHeight="min-h-[500px]"
					/>
					<div className="flex items-center gap-3">
						<Button size="sm">Save Draft</Button>
						<Button variant="outline" size="sm">
							Preview
						</Button>
					</div>
				</div>

				<div className="space-y-4">
					<Card className="border-border">
						<CardHeader className="pb-2">
							<div className="flex items-center gap-2">
								<Globe className="h-3.5 w-3.5 text-muted-foreground" />
								<CardTitle className="text-[13px] font-medium text-muted-foreground">
									Platforms
								</CardTitle>
							</div>
						</CardHeader>
						<CardContent className="pt-0">
							<PlatformAccountSelector
								selected={selectedPlatforms}
								onChange={setSelectedPlatforms}
							/>
						</CardContent>
					</Card>

					<Card className="border-border">
						<CardHeader className="pb-2">
							<div className="flex items-center gap-2">
								<CalendarDays className="h-3.5 w-3.5 text-muted-foreground" />
								<CardTitle className="text-[13px] font-medium text-muted-foreground">
									Schedule
								</CardTitle>
							</div>
						</CardHeader>
						<CardContent>
							<p className="text-[13px] text-muted-foreground">
								Set a publish date and time.
							</p>
						</CardContent>
					</Card>
				</div>
			</div>
		</main>
	);
}
