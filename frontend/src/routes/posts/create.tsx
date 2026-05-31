import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Save, Send } from "lucide-react";
import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Separator } from "../../components/ui/separator";
import { Textarea } from "../../components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "../../components/ui/toggle-group";
import { platforms } from "../../data/mockData";

export const Route = createFileRoute("/posts/create")({
	component: CreatePostPage,
});

function CreatePostPage() {
	const navigate = useNavigate();
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);

	const handleSaveDraft = () => {
		navigate({ to: "/posts" });
	};

	return (
		<main className="mx-auto max-w-[1200px] px-4 py-8">
			<div className="mb-8 flex items-center gap-4">
				<Button
					variant="ghost"
					size="icon"
					onClick={() => navigate({ to: "/posts" })}
					className="h-8 w-8"
				>
					<ArrowLeft className="h-4 w-4" />
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
					<Label htmlFor="content">Content</Label>
					<Textarea
						id="content"
						placeholder="Write your post content... Markdown is supported."
						value={content}
						onChange={(e) => setContent(e.target.value)}
						className="min-h-[300px] resize-y font-mono text-sm"
					/>
				</div>

				<Separator />

				<div className="space-y-2">
					<Label>Platforms</Label>
					<ToggleGroup
						type="multiple"
						value={selectedPlatforms}
						onValueChange={setSelectedPlatforms}
						className="justify-start"
					>
						{platforms.map((platform) => (
							<ToggleGroupItem
								key={platform.id}
								value={platform.id}
								variant="outline"
								className="gap-1.5 px-3 py-1.5 text-xs"
							>
								{platform.name}
							</ToggleGroupItem>
						))}
					</ToggleGroup>
					{selectedPlatforms.length === 0 && (
						<p className="text-xs text-muted-foreground">
							Select at least one platform to publish to.
						</p>
					)}
				</div>

				<Separator />

				<div className="flex items-center gap-3">
					<Button
						variant="outline"
						onClick={handleSaveDraft}
						className="gap-1.5"
					>
						<Save className="h-4 w-4" />
						Save Draft
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
