import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { AppHeader } from "@/components/app-header"
import { AppFooter } from "@/components/app-footer"
import { AISuggestionsForm } from "@/components/ai-suggestions-form"

export default async function AISuggestionsPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader user={data.user} />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">AI Event Suggestions</h1>
            <p className="text-muted-foreground">
              Use AI to generate compelling event descriptions powered by Google Gemini
            </p>
          </div>
          <AISuggestionsForm />
        </div>
      </main>
      <AppFooter />
    </div>
  )
}
