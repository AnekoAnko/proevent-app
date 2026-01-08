import { AppHeader } from "@/components/AppHeader"
import { AppFooter } from "@/components/AppFooter"
import { createClient } from "@/lib/supabase/server"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card } from "@/components/ui/card"

export default async function FAQPage() {
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()

  const faqs = [
    {
      category: "Getting Started",
      questions: [
        {
          q: "How do I create an account?",
          a: "Click on 'Get Started' or 'Sign Up' in the navigation menu. Enter your email and create a password. You'll receive a confirmation email to verify your account.",
        },
        {
          q: "Is EventManager free to use?",
          a: "Yes! EventManager offers a free tier with all essential features. We're committed to making event management accessible to everyone.",
        },
        {
          q: "What browsers are supported?",
          a: "EventManager works best on modern browsers including Chrome, Firefox, Safari, and Edge. We recommend keeping your browser up to date for the best experience.",
        },
      ],
    },
    {
      category: "Events",
      questions: [
        {
          q: "How do I create an event?",
          a: "From your dashboard, click the 'Create Event' button. Fill in the event details including title, description, location, and dates. You can also add an image URL to make your event stand out.",
        },
        {
          q: "Can I edit an event after creating it?",
          a: "Click on any event card and select the 'Edit' button. You can update all event details at any time.",
        },
        {
          q: "How do I add an image to my event?",
          a: "When creating or editing an event, you'll find an 'Image URL' field. Simply paste the URL of any publicly accessible image to add visual appeal to your event.",
        },
        {
          q: "Can I delete an event?",
          a: "Yes, you can delete events from the event details page. Please note that this action cannot be undone.",
        },
      ],
    },
    {
      category: "Attendees",
      questions: [
        {
          q: "How do I add attendees to an event?",
          a: "Click on an event to view its details, then use the 'Manage Attendees' button. You can add attendees by entering their name and email address.",
        },
        {
          q: "What are the different attendee statuses?",
          a: "Attendees can have three statuses: Pending (invitation sent), Confirmed (attending), or Cancelled (not attending). You can update these statuses at any time.",
        },
        {
          q: "Can attendees receive email notifications?",
          a: "Email notifications are currently in development and will be available in a future update.",
        },
      ],
    },
    {
      category: "AI Features",
      questions: [
        {
          q: "What is AI Suggestions?",
          a: "AI Suggestions uses Google's Gemini AI to help you generate compelling event descriptions. Simply provide basic information about your event, and the AI will create engaging content for you.",
        },
        {
          q: "How do I use AI Suggestions?",
          a: "Navigate to the 'AI Suggestions' page from the main menu. Enter your event title, type, and any key details. The AI will generate a professional description that you can use or customize.",
        },
        {
          q: "Is there a limit to AI suggestions?",
          a: "Currently, there are no strict limits on AI suggestions, but we ask users to be reasonable with their usage to ensure availability for everyone.",
        },
      ],
    },
    {
      category: "Account & Security",
      questions: [
        {
          q: "How do I change my password?",
          a: "Password reset functionality is available through the login page. Click 'Forgot Password' and follow the instructions sent to your email.",
        },
        {
          q: "Is my data secure?",
          a: "Yes! We use industry-standard encryption and security practices. All data is stored securely with Supabase, and we implement row-level security policies to protect your information.",
        },
        {
          q: "Can I export my events?",
          a: "Export functionality is planned for a future update. Currently, you can view and manage all your events through the dashboard.",
        },
        {
          q: "How do I delete my account?",
          a: "Please contact our support team at support@eventmanager.com to request account deletion. We'll process your request within 48 hours.",
        },
      ],
    },
    {
      category: "Technical",
      questions: [
        {
          q: "I'm getting an error when creating an event. What should I do?",
          a: "First, ensure all required fields are filled in correctly. If the issue persists, try refreshing the page. If problems continue, please contact support with details about the error.",
        },
        {
          q: "Why can't I see my events?",
          a: "Make sure you're logged in with the correct account. Events are private and only visible to the user who created them. Try refreshing the page or logging out and back in.",
        },
        {
          q: "The page isn't loading properly. What can I do?",
          a: "Try clearing your browser cache and cookies, or use an incognito/private browsing window. Make sure you're using a supported browser.",
        },
      ],
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader user={data?.user} />

      <main className="flex-1">
        <section className="container mx-auto px-4 py-16">
          <div className="mx-auto max-w-3xl space-y-8">
            <div className="space-y-4 text-center">
              <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Frequently Asked Questions</h1>
              <p className="text-xl text-muted-foreground">Find answers to common questions about EventManager</p>
            </div>

            <div className="space-y-8 mt-12">
              {faqs.map((category, idx) => (
                <Card key={idx} className="p-6">
                  <h2 className="text-2xl font-bold mb-4">{category.category}</h2>
                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((faq, qIdx) => (
                      <AccordionItem key={qIdx} value={`item-${idx}-${qIdx}`}>
                        <AccordionTrigger className="text-left">{faq.q}</AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </Card>
              ))}
            </div>

            <Card className="p-6 mt-12 text-center bg-muted/30">
              <h3 className="text-xl font-bold mb-2">Still have questions?</h3>
              <p className="text-muted-foreground mb-4">
                Can't find what you're looking for? Our support team is here to help.
              </p>
              <a
                href="/support"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
              >
                Contact Support
              </a>
            </Card>
          </div>
        </section>
      </main>

      <AppFooter />
    </div>
  )
}
