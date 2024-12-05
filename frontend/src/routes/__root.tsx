import { Toaster } from "@/components/ui/toaster";
import { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <div className="p-8 bg-slate-200 min-h-screen flex flex-col">
      <Outlet />
      <Toaster />
    </div>
  );
}
