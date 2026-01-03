import Link from "next/link"
import { Calendar, Mail, Github } from "lucide-react"

export function AppFooter() {
  return (
    <footer className="border-t border-border bg-muted/30 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              <span className="font-semibold">EventManager</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Modern event management for everyone. Organize, track, and succeed.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-sm">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/ai-suggestions" className="text-muted-foreground hover:text-foreground transition-colors">
                  AI Suggestions
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-sm">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-muted-foreground hover:text-foreground transition-colors">
                  Support
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-foreground transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-sm">Connect</h4>
            <div className="flex gap-3">
              <a
                href="mailto:support@eventmanager.com"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} EventManager</p>
        </div>
      </div>
    </footer>
  )
}
