import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/days/$day')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/days/$day"!</div>
}
