"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, Users } from "lucide-react"

interface Attendee {
  id: string
  name: string
  email: string
  status: string
}

interface ManageAttendeesDialogProps {
  eventId: string
  eventTitle: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ManageAttendeesDialog({ eventId, eventTitle, open, onOpenChange }: ManageAttendeesDialogProps) {
  const [attendees, setAttendees] = useState<Attendee[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)
  const supabase = createClient()

  const fetchAttendees = async () => {
    setIsLoading(true)
    const { data } = await supabase
      .from("attendees")
      .select("*")
      .eq("event_id", eventId)
      .order("created_at", { ascending: false })

    if (data) {
      setAttendees(data)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    if (open) {
      fetchAttendees()
      setShowAddForm(false)
    }
  }, [open, eventId])

  const handleAddAttendee = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const name = formData.get("name") as string
    const email = formData.get("email") as string

    const { error } = await supabase.from("attendees").insert({
      event_id: eventId,
      name,
      email,
      status: "pending",
    })

    if (!error) {
      fetchAttendees()
      setShowAddForm(false)
    }
  }

  const handleDeleteAttendee = async (id: string) => {
    const { error } = await supabase.from("attendees").delete().eq("id", id)

    if (!error) {
      fetchAttendees()
    }
  }

  const handleUpdateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("attendees").update({ status }).eq("id", id)

    if (!error) {
      fetchAttendees()
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-500">Confirmed</Badge>
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>
      default:
        return <Badge variant="secondary">Pending</Badge>
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Manage Attendees
          </DialogTitle>
          <DialogDescription>{eventTitle}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {!showAddForm && (
            <Button onClick={() => setShowAddForm(true)} variant="outline" className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Add Attendee
            </Button>
          )}

          {showAddForm && (
            <form onSubmit={handleAddAttendee} className="space-y-3 rounded-lg border border-border p-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" placeholder="John Doe" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="john@example.com" required />
              </div>
              <div className="flex gap-2">
                <Button type="submit" size="sm">
                  Add
                </Button>
                <Button type="button" variant="outline" size="sm" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          )}

          <div className="space-y-2">
            {isLoading ? (
              <p className="py-8 text-center text-sm text-muted-foreground">Loading attendees...</p>
            ) : attendees.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">
                No attendees yet. Add your first attendee above.
              </p>
            ) : (
              <div className="max-h-[400px] space-y-2 overflow-y-auto">
                {attendees.map((attendee) => (
                  <div
                    key={attendee.id}
                    className="flex items-center justify-between rounded-lg border border-border p-3"
                  >
                    <div className="flex-1">
                      <p className="font-medium">{attendee.name}</p>
                      <p className="text-sm text-muted-foreground">{attendee.email}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Select value={attendee.status} onValueChange={(value) => handleUpdateStatus(attendee.id, value)}>
                        <SelectTrigger className="w-[130px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="confirmed">Confirmed</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteAttendee(attendee.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
