import { Link } from "@tanstack/react-router";
import {
	Bookmark,
	FileText,
	Globe,
	Image,
	LayoutDashboard,
	Link2,
	PenLine,
	Plus,
	Sparkles,
} from "lucide-react";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "./ui/sidebar";

const mainNav = [
	{
		title: "Dashboard",
		icon: LayoutDashboard,
		to: "/",
	},
	{
		title: "All Posts",
		icon: FileText,
		to: "/posts",
	},
	{
		title: "Create Post",
		icon: Plus,
		to: "/posts/create",
	},
	{
		title: "Saved",
		icon: Bookmark,
		to: "/saved",
	},
];

const secondaryNav = [
	{
		title: "Sources",
		icon: Globe,
		to: "/sources",
	},
	{
		title: "Artifacts",
		icon: Image,
		to: "/artifacts",
	},
];

const utilityNav = [
	{
		title: "Editor",
		icon: PenLine,
		to: "/editor",
	},
	{
		title: "Crafting",
		icon: Sparkles,
		to: "/crafting",
	},
	{
		title: "Connect",
		icon: Link2,
		to: "/connect",
	},
];

export function PostMorphSidebar() {
	return (
		<Sidebar collapsible="icon" variant="inset">
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size="lg" asChild>
							<Link to="/" className="no-underline">
								<div className="flex aspect-square size-8 items-center justify-center rounded-md bg-primary text-[13px] font-bold text-primary-foreground">
									P
								</div>
								<div className="flex flex-col gap-0.5 leading-none">
									<span className="font-semibold">PostMorph</span>
									<span className="text-[11px] text-muted-foreground">
										AI Content Workspace
									</span>
								</div>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>

			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Workspace</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{mainNav.map((item) => (
								<SidebarMenuItem key={item.to}>
									<SidebarMenuButton asChild tooltip={item.title}>
										<Link to={item.to} className="no-underline">
											<item.icon className="h-4 w-4" />
											<span>{item.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>

				<SidebarGroup>
					<SidebarGroupLabel>Content</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{secondaryNav.map((item) => (
								<SidebarMenuItem key={item.to}>
									<SidebarMenuButton asChild tooltip={item.title}>
										<Link to={item.to} className="no-underline">
											<item.icon className="h-4 w-4" />
											<span>{item.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>

				<SidebarGroup>
					<SidebarGroupLabel>Tools</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{utilityNav.map((item) => (
								<SidebarMenuItem key={item.to}>
									<SidebarMenuButton asChild tooltip={item.title}>
										<Link to={item.to} className="no-underline">
											<item.icon className="h-4 w-4" />
											<span>{item.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>

			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton asChild>
							<Link to="/posts/create" className="no-underline">
								<Plus className="h-4 w-4" />
								<span>New Post</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
}
