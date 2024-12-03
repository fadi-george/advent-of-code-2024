import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
  loader: () => {
    const year = new Date().getFullYear();
    return redirect({ to: `/${year}` });
  },
});

function RouteComponent() {
  return null;
}
