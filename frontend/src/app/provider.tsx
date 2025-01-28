import { TooltipProvider } from "@/components/ui/hybrid-tooltip";
import { ThemeProvider } from "@/providers/theme-providers";
import React from "react";

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Provider({ children }: ProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <TooltipProvider>{children}</TooltipProvider>
    </ThemeProvider>
  );
}
