import { ModeToggle } from "@/components/mode-toggle";
import MainContent from "./main-content";

export default async function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="flex items-center justify-between bg-primary-foreground px-4 py-6 text-white">
        <div className="">
          <h1 className="text-left text-3xl font-bold text-primary">
            Jadwal Seminar
          </h1>
        </div>
        <ModeToggle />
      </header>
      <MainContent />
    </div>
  );
}
