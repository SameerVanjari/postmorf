export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-4 py-4 text-xs text-muted-foreground">
        <span>PostMorph — AI Content Workspace</span>
        <span>&copy; {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}
