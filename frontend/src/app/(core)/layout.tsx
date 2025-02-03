import { ModeToggle } from "@/components/mode-toggle";
import { ViewToggle } from "@/components/view-toggle";

interface CoreLayoutProps {
  children: React.ReactNode;
}

export default function CoreLayout({ children }: CoreLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <header className="flex items-center justify-between bg-primary-foreground px-4 py-6 text-white">
        <div className="">
          <h1 className="text-left text-3xl font-bold text-primary">
            Jadwal Seminar
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <ModeToggle />
          <ViewToggle />
        </div>
      </header>
      {children}
    </div>
  );
}
