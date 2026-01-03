import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { AppHeader } from "@/components/app-header"
import { AppFooter } from "@/components/app-footer"
import { EventsList } from "@/components/events-list"
import { EventStats } from "@/components/event-stats"

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader user={data.user} />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here&apos;s an overview of your events.</p>
        </div>
        <EventStats />
        <EventsList user={data.user} />
      </main>
      <AppFooter />
    </div>
  )
}
