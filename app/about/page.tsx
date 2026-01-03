import { AppHeader } from "@/components/app-header"
import { AppFooter } from "@/components/app-footer"
import { createClient } from "@/lib/supabase/server"
import { Calendar, Users, Zap, Heart } from "lucide-react"

export default async function AboutPage() {
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()

  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader user={data?.user} />

      <main className="flex-1">
        <section className="container mx-auto px-4 py-16">
          <div className="mx-auto max-w-3xl space-y-8">
            <div className="space-y-4 text-center">
              <h1 className="text-4xl font-bold tracking-tight md:text-5xl">About EventManager</h1>
              <p className="text-xl text-muted-foreground">
                Making event management simple, powerful, and accessible for everyone
              </p>
            </div>

            <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
              <p className="text-lg">
                EventManager was born from a simple idea: event planning shouldn't be complicated. Whether you're
                organizing a small team meeting or a large conference, you deserve tools that work as hard as you do.
              </p>

              <h2 className="text-2xl font-bold mt-12 mb-4">Our Mission</h2>
              <p>
                We believe that great events start with great planning. Our mission is to provide intuitive, powerful
                tools that help you focus on what matters most - creating memorable experiences for your attendees.
              </p>

              <h2 className="text-2xl font-bold mt-12 mb-4">What We Offer</h2>
              <div className="grid gap-6 md:grid-cols-2 not-prose my-8">
                <div className="rounded-lg border border-border bg-card p-6">
                  <Calendar className="h-8 w-8 text-primary mb-3" />
                  <h3 className="text-lg font-semibold mb-2">Smart Planning</h3>
                  <p className="text-sm text-muted-foreground">
                    Organize events with detailed scheduling, location management, and automated reminders
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-card p-6">
                  <Users className="h-8 w-8 text-primary mb-3" />
                  <h3 className="text-lg font-semibold mb-2">Attendee Management</h3>
                  <p className="text-sm text-muted-foreground">
                    Track RSVPs, manage guest lists, and communicate with attendees effortlessly
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-card p-6">
                  <Zap className="h-8 w-8 text-primary mb-3" />
                  <h3 className="text-lg font-semibold mb-2">AI-Powered</h3>
                  <p className="text-sm text-muted-foreground">
                    Generate compelling event descriptions with our AI assistant powered by Gemini
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-card p-6">
                  <Heart className="h-8 w-8 text-primary mb-3" />
                  <h3 className="text-lg font-semibold mb-2">Made with Care</h3>
                  <p className="text-sm text-muted-foreground">
                    Built with modern technologies and best practices to ensure reliability and security
                  </p>
                </div>
              </div>

              <h2 className="text-2xl font-bold mt-12 mb-4">Our Technology</h2>
              <p>
                EventManager is built on a modern technology stack that prioritizes performance, security, and user
                experience:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Next.js 16</strong> - React framework for production-grade applications
                </li>
                <li>
                  <strong>Supabase</strong> - Secure backend with PostgreSQL and authentication
                </li>
                <li>
                  <strong>Radix UI</strong> - Accessible, high-quality component primitives
                </li>
                <li>
                  <strong>Tailwind CSS</strong> - Modern utility-first styling
                </li>
                <li>
                  <strong>Google Gemini</strong> - AI-powered content generation
                </li>
              </ul>

              <div className="bg-muted/50 rounded-lg p-8 mt-12 text-center">
                <h3 className="text-2xl font-bold mb-4">Ready to get started?</h3>
                <p className="text-muted-foreground mb-6">
                  Join thousands of event organizers who trust EventManager for their planning needs
                </p>
                <a
                  href="/auth/sign-up"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                >
                  Get Started Free
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <AppFooter />
    </div>
  )
}
