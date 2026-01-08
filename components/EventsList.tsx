"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Search } from "lucide-react"
import { CreateEventDialog } from "@/components/CreateEventDialog"
import { EventCard } from "@/components/EventCard"

interface Event {
  id: string
  title: string
  created_by: string
  description: string | null
  location: string | null
  start_date: string
  end_date: string
  created_at: string
}

export function EventsList({ user }: { user: any }) {
  const [events, setEvents] = useState<Event[]>([])
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const supabase = createClient()

  const fetchEvents = async () => {
    setIsLoading(true)
    const { data: userData } = await supabase.auth.getUser()
    if (!userData.user) return

    const userId = userData.user.id
    const userEmail = userData.user.email

    const { data: events, error: eventsError } = await supabase
      .from("events")
      .select("*")
      .order("start_date", { ascending: true })

    if (eventsError || !events) return

    const { data: attendeeRows, error: attendeesError } = await supabase
      .from("attendees")
      .select("event_id")
      .eq("email", userEmail)

    if (attendeesError || !attendeeRows) return

    const attendeeEventIds = new Set(
      attendeeRows.map(a => a.event_id)
    )

    const data = events.filter(event =>
      event.created_by === userId ||
      attendeeEventIds.has(event.id)
    )

    if (data) {
      setEvents(data)
      setFilteredEvents(data)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  useEffect(() => {
    let filtered = [...events]

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.location?.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Filter by tab (time-based)
    const now = new Date()
    if (activeTab === "upcoming") {
      filtered = filtered.filter((event) => new Date(event.start_date) > now)
    } else if (activeTab === "past") {
      filtered = filtered.filter((event) => new Date(event.end_date) < now)
    } else if (activeTab === "ongoing") {
      filtered = filtered.filter((event) => new Date(event.start_date) <= now && new Date(event.end_date) >= now)
    }

    setFilteredEvents(filtered)
  }, [events, searchQuery, activeTab])

  const handleEventCreated = () => {
    fetchEvents()
    setIsDialogOpen(false)
  }

  const handleEventDeleted = () => {
    fetchEvents()
  }

  const handleEventUpdated = () => {
    fetchEvents()
  }

  const now = new Date()
  const upcomingCount = events.filter((event) => new Date(event.start_date) > now).length
  const pastCount = events.filter((event) => new Date(event.end_date) < now).length
  const ongoingCount = events.filter(
    (event) => new Date(event.start_date) <= now && new Date(event.end_date) >= now,
  ).length

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex h-64 items-center justify-center">
          <p className="text-muted-foreground">Loading events...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Your Events</h2>
          <p className="text-sm text-muted-foreground">Manage and track all your events</p>
        </div>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Event
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search events by title, description, or location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All ({events.length})</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming ({upcomingCount})</TabsTrigger>
          <TabsTrigger value="ongoing">Live ({ongoingCount})</TabsTrigger>
          <TabsTrigger value="past">Past ({pastCount})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          {filteredEvents.length === 0 ? (
            <Card>
              <CardHeader className="text-center">
                <CardTitle>No Events Found</CardTitle>
                <CardDescription>
                  {searchQuery ? "Try adjusting your search" : "Create your first event to get started"}
                </CardDescription>
              </CardHeader>
              {!searchQuery && (
                <CardContent className="flex justify-center pb-6">
                  <Button onClick={() => setIsDialogOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Your First Event
                  </Button>
                </CardContent>
              )}
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredEvents.map((event) => (
                <EventCard key={event.id} user={user} event={event} onDelete={handleEventDeleted} onUpdate={handleEventUpdated} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="upcoming" className="mt-6">
          {filteredEvents.length === 0 ? (
            <Card>
              <CardHeader className="text-center">
                <CardTitle>No Upcoming Events</CardTitle>
                <CardDescription>All your events have already started or finished</CardDescription>
              </CardHeader>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredEvents.map((event) => (
                <EventCard key={event.id} user={user} event={event} onDelete={handleEventDeleted} onUpdate={handleEventUpdated} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="ongoing" className="mt-6">
          {filteredEvents.length === 0 ? (
            <Card>
              <CardHeader className="text-center">
                <CardTitle>No Live Events</CardTitle>
                <CardDescription>No events are currently in progress</CardDescription>
              </CardHeader>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredEvents.map((event) => (
                <EventCard key={event.id} user={user} event={event} onDelete={handleEventDeleted} onUpdate={handleEventUpdated} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="past" className="mt-6">
          {filteredEvents.length === 0 ? (
            <Card>
              <CardHeader className="text-center">
                <CardTitle>No Past Events</CardTitle>
                <CardDescription>You have no completed events yet</CardDescription>
              </CardHeader>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredEvents.map((event) => (
                <EventCard key={event.id} user={user} event={event} onDelete={handleEventDeleted} onUpdate={handleEventUpdated} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      <CreateEventDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} onEventCreated={handleEventCreated} />
    </div>
  )
}
