import { notFound, redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { AppHeader } from "@/components/AppHeader"
import { AppFooter } from "@/components/AppFooter"
import { EventDetails } from "@/components/EventDetails"

export default async function EventPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  const supabase = await createClient()

  const { data: user, error: userError } = await supabase.auth.getUser()
  if (userError || !user?.user) {
    redirect("/auth/login")
  }

  const { data: event, error } = await supabase.from("events").select("*").eq("id", resolvedParams.id).single()

  if (error || !event) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader user={user.user} />
      <main className="flex-1">
        <EventDetails event={event} user={user.user} />
      </main>
      <AppFooter />
    </div>
  )
}
