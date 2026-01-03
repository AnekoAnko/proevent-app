"use client"

import type React from "react"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface CreateEventDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onEventCreated: () => void
}

export function CreateEventDialog({ open, onOpenChange, onEventCreated }: CreateEventDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const location = formData.get("location") as string
    const startDate = formData.get("start_date") as string
    const endDate = formData.get("end_date") as string
    const imageUrl = formData.get("image_url") as string

    const { data: userData } = await supabase.auth.getUser()
    if (!userData.user) {
      setError("You must be logged in to create an event")
      setIsLoading(false)
      return
    }

    const { error: insertError } = await supabase.from("events").insert({
      title,
      description: description || null,
      location: location || null,
      start_date: new Date(startDate).toISOString(),
      end_date: new Date(endDate).toISOString(),
      image_url: imageUrl || null,
      created_by: userData.user.id,
    })

    if (insertError) {
      setError(insertError.message)
      setIsLoading(false)
      return
    }

    setIsLoading(false)
    onEventCreated()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Event</DialogTitle>
          <DialogDescription>Fill in the details for your new event</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Event Title</Label>
              <Input id="title" name="title" placeholder="Annual Team Meeting" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" placeholder="Describe your event..." rows={3} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="image_url">Image URL (Optional)</Label>
              <Input id="image_url" name="image_url" type="url" placeholder="https://example.com/image.jpg" />
              <p className="text-xs text-muted-foreground">
                Add a publicly accessible image URL to make your event stand out
              </p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" name="location" placeholder="Conference Room A" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="start_date">Start Date & Time</Label>
                <Input id="start_date" name="start_date" type="datetime-local" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="end_date">End Date & Time</Label>
                <Input id="end_date" name="end_date" type="datetime-local" required />
              </div>
            </div>
            {error && <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</div>}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Event"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
