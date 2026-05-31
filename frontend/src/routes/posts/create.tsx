import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Save, Send } from "lucide-react";
import { useState } from "react";
import { PlatformAccountSelector } from "../../components/PlatformAccountSelector";
import { PostEditor } from "../../components/PostEditor";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Separator } from "../../components/ui/separator";
import { SidebarTrigger } from "../../components/ui/sidebar";

export const Route = createFileRoute("/posts/create")({
	component: CreatePostPage,
});

function CreatePostPage() {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);

	return (
		<main className="mx-auto max-w-[1200px] px-6 py-8">
			<div className="mb-8 flex items-center gap-4">
				<SidebarTrigger className="h-8 w-8" />
				<Button variant="ghost" size="icon" asChild className="h-8 w-8">
					<Link to="/posts">
						<ArrowLeft className="h-4 w-4" />
					</Link>
				</Button>
				<div>
					<h1 className="text-[24px] font-semibold leading-tight tracking-tight">
						Create Post
					</h1>
					<p className="mt-1 text-sm text-muted-foreground">
						Compose a new post for your platforms.
					</p>
				</div>
			</div>

			<div className="max-w-2xl space-y-6">
				<div className="space-y-2">
					<Label htmlFor="title">Title</Label>
					<Input
						id="title"
						placeholder="Enter post title..."
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</div>

				<div className="space-y-2">
					<Label>Content</Label>
					<PostEditor
						value={content}
						onChange={setContent}
						placeholder="Write your post content..."
					/>
				</div>

				<Separator />

				<div className="space-y-2">
					<Label>Platforms</Label>
					<p className="text-xs text-muted-foreground">
						Select where to publish. Connected accounts appear below each
						platform.
					</p>
					<PlatformAccountSelector
						selected={selectedPlatforms}
						onChange={setSelectedPlatforms}
					/>
				</div>

				<Separator />

				<div className="flex items-center gap-3">
					<Button variant="outline" className="gap-1.5" asChild>
						<Link to="/posts">
							<Save className="h-4 w-4" />
							Save Draft
						</Link>
					</Button>
					<Button className="gap-1.5">
						<Send className="h-4 w-4" />
						Publish
					</Button>
				</div>
			</div>
		</main>
	);
}
