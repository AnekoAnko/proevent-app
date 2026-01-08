import { AppHeader } from "@/components/AppHeader"
import { AppFooter } from "@/components/AppFooter"
import { createClient } from "@/lib/supabase/server"
import { Mail, MessageCircle, Book, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default async function SupportPage() {
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()

  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader user={data?.user} />

      <main className="flex-1">
        <section className="container mx-auto px-4 py-16">
          <div className="mx-auto max-w-4xl space-y-8">
            <div className="space-y-4 text-center">
              <h1 className="text-4xl font-bold tracking-tight md:text-5xl">How can we help?</h1>
              <p className="text-xl text-muted-foreground">Get support, find answers, and connect with our team</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 mt-12">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-primary/10 p-2">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle>Email Support</CardTitle>
                      <CardDescription>We typically respond within 24 hours</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Send us an email and our support team will get back to you as soon as possible.
                  </p>
                  <a href="mailto:support@eventmanager.com">
                    <Button className="w-full">Email Us</Button>
                  </a>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-primary/10 p-2">
                      <HelpCircle className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle>FAQ</CardTitle>
                      <CardDescription>Find answers to common questions</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Browse our frequently asked questions to find quick answers to common issues.
                  </p>
                  <Link href="/faq">
                    <Button variant="outline" className="w-full bg-transparent">
                      View FAQ
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-primary/10 p-2">
                      <Book className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle>Documentation</CardTitle>
                      <CardDescription>Learn how to use EventManager</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Comprehensive guides and tutorials to help you make the most of our platform.
                  </p>
                  <Button variant="outline" className="w-full bg-transparent" disabled>
                    Coming Soon
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-primary/10 p-2">
                      <MessageCircle className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle>Community</CardTitle>
                      <CardDescription>Connect with other users</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Join our community to share tips, ask questions, and help others.
                  </p>
                  <Button variant="outline" className="w-full bg-transparent" disabled>
                    Coming Soon
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-12">
              <CardHeader>
                <CardTitle>Need help getting started?</CardTitle>
                <CardDescription>Here are some helpful resources</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">Creating Your First Event</h4>
                  <p className="text-sm text-muted-foreground">
                    Navigate to your dashboard and click the "Create Event" button. Fill in the details like title,
                    description, location, and dates. You can also add an image URL to make your event more appealing.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">Managing Attendees</h4>
                  <p className="text-sm text-muted-foreground">
                    Click on any event card to view details. From there, you can add attendees, track their status, and
                    manage the guest list for your event.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">Using AI Suggestions</h4>
                  <p className="text-sm text-muted-foreground">
                    Visit the AI Suggestions page to generate compelling event descriptions. Simply provide some basic
                    information about your event and let AI create engaging content for you.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <AppFooter />
    </div>
  )
}
