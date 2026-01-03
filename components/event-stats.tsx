"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Users, Clock } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useEffect, useState } from "react"

export function EventStats() {
  const [stats, setStats] = useState({
    totalEvents: 0,
    upcomingEvents: 0,
    totalAttendees: 0,
  })
  const supabase = createClient()

  useEffect(() => {
    async function fetchStats() {
      const { data: events } = await supabase.from("events").select("id, start_date")

      const { data: attendees } = await supabase.from("attendees").select("id")

      const now = new Date()
      const upcoming = events?.filter((e: { start_date: string | number | Date }) => new Date(e.start_date) > now).length || 0

      setStats({
        totalEvents: events?.length || 0,
        upcomingEvents: upcoming,
        totalAttendees: attendees?.length || 0,
      })
    }

    fetchStats()
  }, [supabase])

  return (
    <div className="mb-8 grid gap-4 md:grid-cols-3">
      <Card>
        <CardContent className="flex items-center gap-4 p-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <Calendar className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Total Events</p>
            <p className="text-2xl font-bold">{stats.totalEvents}</p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex items-center gap-4 p-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
            <Clock className="h-6 w-6 text-accent" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Upcoming</p>
            <p className="text-2xl font-bold">{stats.upcomingEvents}</p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex items-center gap-4 p-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <Users className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Total Attendees</p>
            <p className="text-2xl font-bold">{stats.totalAttendees}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
