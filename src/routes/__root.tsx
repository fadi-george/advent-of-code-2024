import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <div className="p-4 bg-slate-200 min-h-screen flex flex-col">
      <Outlet />
    </div>
  );
}
