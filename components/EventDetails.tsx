"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Calendar, MapPin, Users, Clock, Edit, Trash2, User, ImageIcon } from "lucide-react"
import { format, formatDistanceToNow } from "date-fns"
import Link from "next/link"
import { EditEventDialog } from "@/components/EditEventDialog"

interface Attendee {
  id: string
  name: string
  email: string
  status: string
}

interface EventDetailsProps {
  event: {
    id: string
    title: string
    created_by: string
    description: string | null
    location: string | null
    start_date: string
    end_date: string
    created_at: string
    image_url?: string | null
  },
  user: any;
}

export function EventDetails({ event, user }: EventDetailsProps) {
  const [attendees, setAttendees] = useState<Attendee[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showEdit, setShowEdit] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [imageError, setImageError] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    fetchAttendees()
  }, [event.id])

  const fetchAttendees = async () => {
    setIsLoading(true)
    const { data } = await supabase
      .from("attendees")
      .select("*")
      .eq("event_id", event.id)
      .order("created_at", { ascending: false })

    if (data) {
      setAttendees(data)
    }
    setIsLoading(false)
  }

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this event? This action cannot be undone.")) return

    setIsDeleting(true)
    const { error } = await supabase.from("events").delete().eq("id", event.id)

    if (!error) {
      router.push("/dashboard")
    }
    setIsDeleting(false)
  }

  const handleEventUpdated = () => {
    setShowEdit(false)
    router.refresh()
  }

  const isPast = new Date(event.end_date) < new Date()
  const isOngoing = new Date(event.start_date) <= new Date() && new Date(event.end_date) >= new Date()

  const confirmedAttendees = attendees.filter((a) => a.status === "confirmed").length
  const pendingAttendees = attendees.filter((a) => a.status === "pending").length
  const cancelledAttendees = attendees.filter((a) => a.status === "cancelled").length

  return (
    <>
      <div className="border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card>
              {event.image_url && !imageError ? (
                <div className="relative aspect-video w-full overflow-hidden">
                  <img
                    src={event.image_url || "/placeholder.svg"}
                    alt={event.title}
                    className="h-full w-full object-cover"
                    onError={() => setImageError(true)}
                  />
                </div>
              ) : event.image_url && imageError ? (
                <div className="flex aspect-video w-full items-center justify-center bg-muted">
                  <div className="text-center text-muted-foreground">
                    <ImageIcon className="mx-auto h-12 w-12 mb-2" />
                    <p className="text-sm">Image unavailable</p>
                  </div>
                </div>
              ) : null}

              <CardHeader>
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  {isOngoing && <Badge className="bg-green-500">Live Now</Badge>}
                  {isPast && <Badge variant="secondary">Completed</Badge>}
                  {!isPast && !isOngoing && <Badge>Upcoming</Badge>}
                </div>
                <CardTitle className="text-3xl">{event.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {user.id === event.created_by && (
                  <div className="flex flex-wrap gap-2">
                    <Button onClick={() => setShowEdit(true)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Event
                    </Button>
                    <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
                      <Trash2 className="mr-2 h-4 w-4" />
                      {isDeleting ? "Deleting..." : "Delete Event"}
                    </Button>
                  </div>
                )}
                <Separator />

                <div>
                  <h3 className="mb-2 text-lg font-semibold">Description</h3>
                  <p className="text-muted-foreground">{event.description || "No description provided"}</p>
                </div>

                <Separator />

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Start Date</p>
                      <p className="text-sm text-muted-foreground">{format(new Date(event.start_date), "PPpp")}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(event.start_date), { addSuffix: true })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">End Date</p>
                      <p className="text-sm text-muted-foreground">{format(new Date(event.end_date), "PPpp")}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(event.end_date), { addSuffix: true })}
                      </p>
                    </div>
                  </div>

                  {event.location && (
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Location</p>
                        <p className="text-sm text-muted-foreground">{event.location}</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Attendee Statistics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Total</span>
                    <span className="text-2xl font-bold">{attendees.length}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Confirmed</span>
                    <Badge className="bg-green-500">{confirmedAttendees}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Pending</span>
                    <Badge variant="secondary">{pendingAttendees}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Cancelled</span>
                    <Badge variant="destructive">{cancelledAttendees}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Attendees List</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <p className="py-4 text-center text-sm text-muted-foreground">Loading attendees...</p>
                ) : attendees.length === 0 ? (
                  <p className="py-4 text-center text-sm text-muted-foreground">No attendees yet</p>
                ) : (
                  <div className="max-h-[400px] space-y-3 overflow-y-auto">
                    {attendees.map((attendee) => (
                      <div key={attendee.id} className="flex items-start gap-3 rounded-lg border border-border p-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                          <User className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{attendee.name}</p>
                          <p className="text-sm text-muted-foreground">{attendee.email}</p>
                          <div className="mt-1">
                            {attendee.status === "confirmed" && (
                              <Badge variant="outline" className="bg-green-500/10 text-green-500">
                                Confirmed
                              </Badge>
                            )}
                            {attendee.status === "pending" && <Badge variant="secondary">Pending</Badge>}
                            {attendee.status === "cancelled" && <Badge variant="destructive">Cancelled</Badge>}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <EditEventDialog event={event} open={showEdit} onOpenChange={setShowEdit} onEventUpdated={handleEventUpdated} />
    </>
  )
}
