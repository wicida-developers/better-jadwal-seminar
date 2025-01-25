import { ModeToggle } from "@/components/mode-toggle";
import { ViewToggle } from "@/components/view-toggle";
import SwitchContent from "./switch-content";

interface HomeProps {
  searchParams: Promise<{
    view: "card" | "table";
  }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const { view } = await searchParams;

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
      <SwitchContent view={view} />
    </div>
  );
}
