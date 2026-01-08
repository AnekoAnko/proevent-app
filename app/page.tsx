import { AppHeader } from "@/components/AppHeader"
import { AppFooter } from "@/components/AppFooter"
import { Button } from "@/components/ui/button"
import { Calendar, Users, MapPin, Sparkles, Wand2, Shield } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-24 text-center">
          <div className="mx-auto max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-sm font-medium text-secondary-foreground">
              <Sparkles className="h-4 w-4" />
              Modern Event Management
            </div>
            <h1 className="text-balance text-5xl font-bold tracking-tight md:text-6xl">Organize Events with Ease</h1>
            <p className="text-pretty text-lg text-muted-foreground md:text-xl">
              Create, manage, and track all your events in one beautiful interface. Perfect for event organizers and
              teams.
            </p>
            <div className="flex items-center justify-center gap-4 pt-4">
              <Link href="/auth/sign-up">
                <Button size="lg" className="h-12 px-8">
                  Start Free Trial
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button size="lg" variant="outline" className="h-12 px-8 bg-transparent">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="border-t border-border bg-muted/30 py-24">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="space-y-3 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Event Planning</h3>
                <p className="text-muted-foreground">Create and schedule events with detailed information and timing</p>
              </div>
              <div className="space-y-3 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                  <Users className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold">Attendee Management</h3>
                <p className="text-muted-foreground">Track attendees and their confirmation status effortlessly</p>
              </div>
              <div className="space-y-3 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Location Details</h3>
                <p className="text-muted-foreground">Store venue information and share it with attendees</p>
              </div>
            </div>
          </div>
        </section>

        {/* New Features Section */}
        <section className="container mx-auto px-4 py-24">
          <div className="mx-auto max-w-3xl space-y-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Powered by AI</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-lg border border-border bg-card p-6 text-left">
                <Wand2 className="h-8 w-8 text-primary mb-3" />
                <h3 className="text-lg font-semibold mb-2">AI Suggestions</h3>
                <p className="text-sm text-muted-foreground">
                  Generate compelling event descriptions with AI assistance powered by Gemini
                </p>
              </div>
              <div className="rounded-lg border border-border bg-card p-6 text-left">
                <Shield className="h-8 w-8 text-primary mb-3" />
                <h3 className="text-lg font-semibold mb-2">Secure & Private</h3>
                <p className="text-sm text-muted-foreground">
                  Your data is protected with enterprise-grade security and row-level policies
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <AppFooter />
    </div>
  )
}
