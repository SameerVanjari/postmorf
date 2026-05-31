import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, Check } from "lucide-react";
import { Button } from "../components/ui/button";
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../components/ui/card";
import { Separator } from "../components/ui/separator";
import { platforms } from "../data/mockData";

export const Route = createFileRoute("/connect")({
	component: ConnectPage,
});

function ConnectPage() {
	return (
		<main className="mx-auto max-w-[1200px] px-4 py-8">
			<div className="mb-8 flex items-center gap-4">
				<Button
					variant="ghost"
					size="icon"
					onClick={() => window.history.back()}
					className="h-8 w-8"
				>
					<ArrowLeft className="h-4 w-4" />
				</Button>
				<div>
					<h1 className="text-[24px] font-semibold leading-tight tracking-tight">
						Connect Account
					</h1>
					<p className="mt-1 text-sm text-muted-foreground">
						Connect your social platform accounts to publish content.
					</p>
				</div>
			</div>

			<div className="max-w-lg space-y-3">
				{platforms.map((platform) => (
					<Card key={platform.id} className="border-border">
						<CardHeader className="pb-3">
							<div className="flex items-center justify-between">
								<div>
									<CardTitle className="text-[15px] font-semibold">
										{platform.name}
									</CardTitle>
									<CardDescription className="text-[13px]">
										Connect your {platform.name.toLowerCase()} account to
										publish and schedule posts.
									</CardDescription>
								</div>
								<Button variant="outline" size="sm" className="gap-1.5">
									<Check className="h-3.5 w-3.5" />
									Connect
								</Button>
							</div>
						</CardHeader>
					</Card>
				))}

				<Separator className="my-4" />

				<p className="text-[13px] leading-relaxed text-muted-foreground">
					Connected accounts can be managed and disconnected at any time from
					your account settings. PostMorph never publishes without your explicit
					approval.
				</p>
			</div>
		</main>
	);
}
