"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Calendar, MapPin, Users, Heart, Bookmark, Share2, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

// Mock event data (same as main page)
const mockEvents = [
  {
    id: 1,
    title: "Tech Conference 2024",
    description: "Join industry leaders for cutting-edge technology discussions and networking.",
    fullDescription:
      "This premier technology conference brings together the brightest minds in the industry for three days of intensive learning, networking, and innovation. Featuring keynote speakers from major tech companies, hands-on workshops, and exclusive networking sessions. Topics include AI/ML, cloud computing, cybersecurity, and emerging technologies that will shape the future.",
    date: "2024-03-15",
    time: "09:00 AM",
    endTime: "06:00 PM",
    location: "San Francisco, CA",
    venue: "Moscone Convention Center",
    address: "747 Howard St, San Francisco, CA 94103",
    category: "Technology",
    price: 299,
    image: "/tech-conference-modern-stage.png",
    organizer: "TechEvents Inc.",
    organizerDescription: "Leading technology event organizer with 15+ years of experience.",
    attendees: 1250,
    maxAttendees: 1500,
    rating: 4.8,
    reviews: 324,
    tags: ["AI", "Cloud Computing", "Networking", "Innovation"],
    agenda: [
      { time: "09:00 AM", title: "Registration & Welcome Coffee" },
      { time: "10:00 AM", title: "Keynote: The Future of AI" },
      { time: "11:30 AM", title: "Panel: Cloud Computing Trends" },
      { time: "01:00 PM", title: "Lunch & Networking" },
      { time: "02:30 PM", title: "Workshop: Machine Learning Basics" },
      { time: "04:00 PM", title: "Startup Pitch Competition" },
      { time: "05:30 PM", title: "Closing Remarks & Networking" },
    ],
  },
  {
    id: 2,
    title: "Art & Design Workshop",
    description: "Explore creative techniques with renowned artists and designers.",
    fullDescription:
      "An immersive workshop experience designed for artists and designers of all levels. Learn from master artists as they demonstrate advanced techniques in painting, digital design, and mixed media. This hands-on workshop includes all materials and provides personalized feedback from instructors.",
    date: "2024-03-20",
    time: "02:00 PM",
    endTime: "06:00 PM",
    location: "New York, NY",
    venue: "Creative Arts Studio",
    address: "123 Art District, New York, NY 10001",
    category: "Art",
    price: 150,
    image: "/art-workshop-creative-studio.png",
    organizer: "Creative Minds",
    organizerDescription: "Collective of professional artists and educators.",
    attendees: 85,
    maxAttendees: 100,
    rating: 4.9,
    reviews: 67,
    tags: ["Painting", "Digital Art", "Mixed Media", "Creative"],
    agenda: [
      { time: "02:00 PM", title: "Welcome & Introduction" },
      { time: "02:30 PM", title: "Traditional Painting Techniques" },
      { time: "03:30 PM", title: "Digital Art Fundamentals" },
      { time: "04:30 PM", title: "Break & Gallery Walk" },
      { time: "05:00 PM", title: "Mixed Media Creation" },
      { time: "05:45 PM", title: "Showcase & Feedback" },
    ],
  },
  // Add more events as needed...
]

export default function EventDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const eventId = Number.parseInt(params.id as string)
  const [event, setEvent] = useState(mockEvents.find((e) => e.id === eventId))
  const [favorites, setFavorites] = useState<number[]>([])
  const [bookmarks, setBookmarks] = useState<number[]>([])

  useEffect(() => {
    const savedFavorites = localStorage.getItem("eventFavorites")
    const savedBookmarks = localStorage.getItem("eventBookmarks")

    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
    if (savedBookmarks) {
      setBookmarks(JSON.parse(savedBookmarks))
    }
  }, [])

  const toggleFavorite = (eventId: number) => {
    const newFavorites = favorites.includes(eventId)
      ? favorites.filter((id) => id !== eventId)
      : [...favorites, eventId]

    setFavorites(newFavorites)
    localStorage.setItem("eventFavorites", JSON.stringify(newFavorites))
  }

  const toggleBookmark = (eventId: number) => {
    const newBookmarks = bookmarks.includes(eventId)
      ? bookmarks.filter((id) => id !== eventId)
      : [...bookmarks, eventId]

    setBookmarks(newBookmarks)
    localStorage.setItem("eventBookmarks", JSON.stringify(newBookmarks))
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Event Not Found</h1>
          <Button onClick={() => router.push("/")}>Back to Events</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" onClick={() => router.push("/")} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Events
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Event Image */}
            <div className="relative">
              <img
                src={event.image || "/placeholder.svg"}
                alt={event.title}
                className="w-full h-64 md:h-80 object-cover rounded-lg"
              />
              <Badge className="absolute top-4 left-4 bg-white/90 text-gray-900">{event.category}</Badge>
            </div>

            {/* Event Title & Actions */}
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-balance mb-2">{event.title}</h1>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{event.rating}</span>
                    <span>({event.reviews} reviews)</span>
                  </div>
                  <span>by {event.organizer}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => toggleFavorite(event.id)}>
                  <Heart
                    className={`h-4 w-4 mr-2 ${favorites.includes(event.id) ? "fill-red-500 text-red-500" : ""}`}
                  />
                  {favorites.includes(event.id) ? "Favorited" : "Favorite"}
                </Button>
                <Button variant="outline" size="sm" onClick={() => toggleBookmark(event.id)}>
                  <Bookmark
                    className={`h-4 w-4 mr-2 ${bookmarks.includes(event.id) ? "fill-blue-500 text-blue-500" : ""}`}
                  />
                  {bookmarks.includes(event.id) ? "Bookmarked" : "Bookmark"}
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            {/* Event Description */}
            <Card>
              <CardHeader>
                <CardTitle>About This Event</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{event.fullDescription || event.description}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {event.tags?.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Event Agenda */}
            {event.agenda && (
              <Card>
                <CardHeader>
                  <CardTitle>Event Schedule</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {event.agenda.map((item, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="text-sm font-medium text-primary min-w-20">{item.time}</div>
                        <div className="text-sm">{item.title}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Organizer Info */}
            <Card>
              <CardHeader>
                <CardTitle>About the Organizer</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-semibold">{event.organizer.charAt(0)}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">{event.organizer}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{event.organizerDescription}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Card */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">${event.price}</span>
                  <span className="text-sm text-muted-foreground">per person</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full" size="lg">
                  Book Now
                </Button>
                <div className="text-center text-sm text-muted-foreground">
                  {event.attendees} of {event.maxAttendees} spots filled
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full"
                    style={{
                      width: `${(event.attendees / event.maxAttendees) * 100}%`,
                    }}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Event Details */}
            <Card>
              <CardHeader>
                <CardTitle>Event Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <div className="font-medium">
                      {new Date(event.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {event.time} - {event.endTime}
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <div className="font-medium">{event.venue}</div>
                    <div className="text-sm text-muted-foreground">{event.address}</div>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{event.attendees.toLocaleString()} attending</div>
                    <div className="text-sm text-muted-foreground">
                      {event.maxAttendees - event.attendees} spots remaining
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Location Map Placeholder */}
            <Card>
              <CardHeader>
                <CardTitle>Location</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-full h-48 bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <MapPin className="h-8 w-8 mx-auto mb-2" />
                    <p className="text-sm">Interactive map would go here</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4 bg-transparent">
                  View on Maps
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
