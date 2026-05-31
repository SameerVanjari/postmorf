import { Bold, Eye, Heading2, Italic, Link2, List } from "lucide-react";
import { useState } from "react";
import { cn } from "../lib/utils";
import { Separator } from "./ui/separator";
import { Textarea } from "./ui/textarea";
import { Toggle } from "./ui/toggle";

interface PostEditorProps {
	readonly value: string;
	readonly onChange: (value: string) => void;
	readonly placeholder?: string;
	readonly minHeight?: string;
}

export function PostEditor({
	value,
	onChange,
	placeholder = "Start writing... Markdown is supported.",
	minHeight = "min-h-[400px]",
}: PostEditorProps) {
	const [preview, setPreview] = useState(false);

	const insertMarkdown = (prefix: string, suffix = "") => {
		const textarea = document.querySelector(
			".post-editor-textarea",
		) as HTMLTextAreaElement | null;
		if (!textarea) return;

		const start = textarea.selectionStart;
		const end = textarea.selectionEnd;
		const selected = value.slice(start, end);
		const newText =
			value.slice(0, start) +
			prefix +
			selected +
			(suffix || prefix) +
			value.slice(end);
		onChange(newText);

		setTimeout(() => {
			textarea.focus();
			const cursor = start + prefix.length + selected.length;
			textarea.setSelectionRange(cursor, cursor);
		}, 0);
	};

	const renderPreview = (text: string) => {
		return text
			.replace(
				/^### (.+)$/gm,
				'<h3 class="text-[16px] font-semibold mt-4 mb-2">$1</h3>',
			)
			.replace(
				/^## (.+)$/gm,
				'<h2 class="text-[18px] font-semibold mt-5 mb-2">$1</h2>',
			)
			.replace(
				/^# (.+)$/gm,
				'<h1 class="text-[20px] font-semibold mt-6 mb-3">$1</h1>',
			)
			.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
			.replace(/\*(.+?)\*/g, "<em>$1</em>")
			.replace(/^- (.+)$/gm, '<li class="ml-4 list-disc text-[14px]">$1</li>')
			.replace(
				/^(\d+)\. (.+)$/gm,
				'<li class="ml-4 list-decimal text-[14px]">$2</li>',
			)
			.replace(/\n\n/g, "<br/><br/>")
			.replace(/\n/g, "<br/>");
	};

	return (
		<div className="space-y-3">
			<div className="flex items-center gap-1 rounded-md border border-border bg-background p-1">
				<Toggle
					size="sm"
					onClick={() => insertMarkdown("**")}
					aria-label="Bold"
				>
					<Bold className="h-3.5 w-3.5" />
				</Toggle>
				<Toggle
					size="sm"
					onClick={() => insertMarkdown("*")}
					aria-label="Italic"
				>
					<Italic className="h-3.5 w-3.5" />
				</Toggle>
				<Toggle
					size="sm"
					onClick={() => insertMarkdown("## ")}
					aria-label="Heading"
				>
					<Heading2 className="h-3.5 w-3.5" />
				</Toggle>
				<Toggle
					size="sm"
					onClick={() => insertMarkdown("- ")}
					aria-label="List"
				>
					<List className="h-3.5 w-3.5" />
				</Toggle>
				<Toggle
					size="sm"
					onClick={() => insertMarkdown("[", "](url)")}
					aria-label="Link"
				>
					<Link2 className="h-3.5 w-3.5" />
				</Toggle>

				<Separator orientation="vertical" className="mx-1 h-5" />

				<Toggle
					size="sm"
					pressed={preview}
					onClick={() => setPreview(!preview)}
					aria-label="Toggle preview"
				>
					<Eye className="h-3.5 w-3.5" />
				</Toggle>
			</div>

			{preview ? (
				<div
					className={cn(
						"rounded-md border border-border bg-background p-4 text-[14px] leading-relaxed",
						minHeight,
					)}
					// biome-ignore lint/security/noDangerouslySetInnerHtml: sanitized markdown preview
					dangerouslySetInnerHTML={{
						__html:
							renderPreview(value) ||
							'<span class="text-muted-foreground">Nothing to preview</span>',
					}}
				/>
			) : (
				<Textarea
					value={value}
					onChange={(e) => onChange(e.target.value)}
					placeholder={placeholder}
					className={cn(
						"post-editor-textarea resize-y font-mono text-sm",
						minHeight,
					)}
				/>
			)}
		</div>
	);
}
