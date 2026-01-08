"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sparkles, Copy, RefreshCw } from "lucide-react"
import { toast } from "sonner"

export function AISuggestionsForm() {
  const [eventTitle, setEventTitle] = useState("")
  const [eventType, setEventType] = useState("")
  const [keyDetails, setKeyDetails] = useState("")
  const [generatedDescription, setGeneratedDescription] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = async () => {
    if (!eventTitle.trim()) {
      toast.error("Please enter an event title")
      return
    }

    setIsGenerating(true)
    setGeneratedDescription("")

    try {
      const response = await fetch("/api/generate-description", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: eventTitle,
          type: eventType,
          details: keyDetails,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate description")
      }

      const data = await response.json()
      setGeneratedDescription(data.description)
      toast.success("Description generated successfully!")
    } catch (error) {
      console.error("Error generating description:", error)
      toast.error("Failed to generate description. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedDescription)
    toast.success("Copied to clipboard!")
  }

  const handleReset = () => {
    setEventTitle("")
    setEventType("")
    setKeyDetails("")
    setGeneratedDescription("")
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Event Information
          </CardTitle>
          <CardDescription>Provide details about your event and let AI create a compelling description</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Event Title *</Label>
            <Input
              id="title"
              placeholder="e.g., Summer Tech Conference 2024"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Event Type</Label>
            <Select value={eventType} onValueChange={setEventType}>
              <SelectTrigger>
                <SelectValue placeholder="Select event type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="conference">Conference</SelectItem>
                <SelectItem value="workshop">Workshop</SelectItem>
                <SelectItem value="seminar">Seminar</SelectItem>
                <SelectItem value="meetup">Meetup</SelectItem>
                <SelectItem value="webinar">Webinar</SelectItem>
                <SelectItem value="networking">Networking Event</SelectItem>
                <SelectItem value="training">Training Session</SelectItem>
                <SelectItem value="celebration">Celebration</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="details">Key Details (Optional)</Label>
            <Textarea
              id="details"
              placeholder="Add any specific details you want included: target audience, topics covered, speakers, unique features, etc."
              value={keyDetails}
              onChange={(e) => setKeyDetails(e.target.value)}
              rows={4}
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={handleGenerate} disabled={isGenerating} className="flex-1">
              {isGenerating ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Description
                </>
              )}
            </Button>
            {generatedDescription && (
              <Button onClick={handleReset} variant="outline">
                Reset
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {generatedDescription && (
        <Card>
          <CardHeader>
            <CardTitle>Generated Description</CardTitle>
            <CardDescription>Copy this description and use it when creating your event</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-muted p-4">
              <p className="whitespace-pre-wrap text-sm">{generatedDescription}</p>
            </div>
            <Button onClick={handleCopy} variant="outline" className="w-full bg-transparent">
              <Copy className="mr-2 h-4 w-4" />
              Copy to Clipboard
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
