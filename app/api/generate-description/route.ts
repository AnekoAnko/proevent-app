import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: Request) {
  try {
    // Check authentication
    const supabase = await createClient()
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { title, type, details } = await request.json()

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 })
    }

    // Construct the prompt for Gemini
    let prompt = `Write a compelling and professional event description for an event titled "${title}".`

    if (type) {
      prompt += ` This is a ${type} event.`
    }

    if (details) {
      prompt += ` Here are some key details to include: ${details}`
    }

    prompt += ` The description should be engaging, informative, and between 100-200 words. Focus on the value attendees will get from the event.`

    // Call Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 500,
          },
        }),
      },
    )

    if (!response.ok) {
      console.error("Gemini API error:", await response.text())
      throw new Error("Failed to generate description")
    }

    const data = await response.json()
    const description = data.candidates[0]?.content?.parts[0]?.text || "Unable to generate description"

    return NextResponse.json({ description })
  } catch (error) {
    console.error("Error in generate-description:", error)
    return NextResponse.json({ error: "Failed to generate description" }, { status: 500 })
  }
}
