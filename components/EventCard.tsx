"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Calendar, MapPin, MoreVertical, Trash2, Users, Edit, Eye, ImageIcon } from "lucide-react"
import { format } from "date-fns"
import { createClient } from "@/lib/supabase/client"
import { useState } from "react"
import { ManageAttendeesDialog } from "@/components/ManageAttendeesDialog"
import { EditEventDialog } from "@/components/EditEventDialog"
import Link from "next/link"

interface EventCardProps {
  user: any
  event: {
    id: string
    title: string
    created_by: string
    description: string | null
    location: string | null
    start_date: string
    end_date: string
    image_url?: string | null
  }
  onDelete: () => void
  onUpdate?: () => void
}

export function EventCard({ user, event, onDelete, onUpdate }: EventCardProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [showAttendees, setShowAttendees] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [imageError, setImageError] = useState(false)
  const supabase = createClient()
  
  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this event?")) return

    setIsDeleting(true)
    const { error } = await supabase.from("events").delete().eq("id", event.id)

    if (!error) {
      onDelete()
    }
    setIsDeleting(false)
  }

  const handleEventUpdated = () => {
    setShowEdit(false)
    if (onUpdate) {
      onUpdate()
    }
  }

  const isPast = new Date(event.end_date) < new Date()
  const isOngoing = new Date(event.start_date) <= new Date() && new Date(event.end_date) >= new Date()

  return (
    <>
      <Card className="group flex flex-col overflow-hidden transition-all hover:shadow-lg">
        {event.image_url && !imageError ? (
          <div className="relative aspect-video w-full overflow-hidden bg-muted">
            <img
              src={event.image_url || "/placeholder.svg"}
              alt={event.title}
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
              onError={() => setImageError(true)}
            />
          </div>
        ) : event.image_url && imageError ? (
          <div className="flex aspect-video w-full items-center justify-center bg-muted">
            <div className="text-center text-muted-foreground">
              <ImageIcon className="mx-auto h-8 w-8 mb-2" />
              <p className="text-xs">Image unavailable</p>
            </div>
          </div>
        ) : null}

        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                {isOngoing && <Badge className="bg-green-500">Live Now</Badge>}
                {isPast && <Badge variant="secondary">Completed</Badge>}
                {!isPast && !isOngoing && <Badge>Upcoming</Badge>}
              </div>
              <CardTitle className="line-clamp-1">{event.title}</CardTitle>
              <CardDescription className="line-clamp-2">{event.description || "No description"}</CardDescription>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href={`/events/${event.id}`}>
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                  </Link>
                </DropdownMenuItem>
                {user && user.id === event.created_by && (
                  <>
                    <DropdownMenuItem onClick={() => setShowEdit(true)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Event
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleDelete} disabled={isDeleting} className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent className="flex-1 space-y-4">
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{format(new Date(event.start_date), "MMM d, yyyy h:mm a")}</span>
            </div>
            {event.location && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span className="line-clamp-1">{event.location}</span>
              </div>
            )}
          </div>
          {user && user.id === event.created_by && (
            <Button variant="outline" className="w-full bg-transparent" onClick={() => setShowAttendees(true)}>
              <Users className="mr-2 h-4 w-4" />
              Manage Attendees
            </Button>
          )}
        </CardContent>
      </Card>

      <ManageAttendeesDialog
        eventId={event.id}
        eventTitle={event.title}
        open={showAttendees}
        onOpenChange={setShowAttendees}
      />

      <EditEventDialog event={event} open={showEdit} onOpenChange={setShowEdit} onEventUpdated={handleEventUpdated} />
    </>
  )
}
