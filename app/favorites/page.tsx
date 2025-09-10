"use client"

import { useState, useEffect } from "react"
import { Heart, Calendar, MapPin, Clock, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useRouter } from "next/navigation"

// Mock event data (same as main page)
const mockEvents = [
  {
    id: 1,
    title: "Tech Conference 2024",
    description: "Join industry leaders for cutting-edge technology discussions and networking.",
    date: "2024-03-15",
    time: "09:00 AM",
    location: "San Francisco, CA",
    category: "Technology",
    price: 299,
    image: "/tech-conference-modern-stage.png",
    organizer: "TechEvents Inc.",
    attendees: 1250,
  },
  {
    id: 2,
    title: "Art & Design Workshop",
    description: "Explore creative techniques with renowned artists and designers.",
    date: "2024-03-20",
    time: "02:00 PM",
    location: "New York, NY",
    category: "Art",
    price: 150,
    image: "/art-workshop-creative-studio.png",
    organizer: "Creative Minds",
    attendees: 85,
  },
  {
    id: 3,
    title: "Music Festival 2024",
    description: "Three days of incredible music featuring top artists from around the world.",
    date: "2024-04-05",
    time: "06:00 PM",
    location: "Austin, TX",
    category: "Music",
    price: 450,
    image: "/music-festival-outdoor-stage-lights.png",
    organizer: "Festival Productions",
    attendees: 15000,
  },
  {
    id: 4,
    title: "Business Summit",
    description: "Network with entrepreneurs and learn from successful business leaders.",
    date: "2024-03-25",
    time: "08:30 AM",
    location: "Chicago, IL",
    category: "Business",
    price: 199,
    image: "/business-conference-professional-meeting.png",
    organizer: "Business Network",
    attendees: 500,
  },
  {
    id: 5,
    title: "Food & Wine Tasting",
    description: "Discover exquisite flavors with master chefs and sommeliers.",
    date: "2024-04-10",
    time: "07:00 PM",
    location: "Napa Valley, CA",
    category: "Food",
    price: 125,
    image: "/wine-tasting-elegant-restaurant.png",
    organizer: "Culinary Experiences",
    attendees: 120,
  },
  {
    id: 6,
    title: "Fitness Bootcamp",
    description: "High-intensity workout sessions with professional trainers.",
    date: "2024-03-30",
    time: "06:00 AM",
    location: "Miami, FL",
    category: "Fitness",
    price: 75,
    image: "/fitness-bootcamp-outdoor-training.png",
    organizer: "FitLife Studios",
    attendees: 200,
  },
]

export default function FavoritesPage() {
  const router = useRouter()
  const [favorites, setFavorites] = useState<number[]>([])

  useEffect(() => {
    const savedFavorites = localStorage.getItem("eventFavorites")
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
  }, [])

  const toggleFavorite = (eventId: number) => {
    const newFavorites = favorites.filter((id) => id !== eventId)
    setFavorites(newFavorites)
    localStorage.setItem("eventFavorites", JSON.stringify(newFavorites))
  }

  const favoriteEvents = mockEvents.filter((event) => favorites.includes(event.id))

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <Button variant="ghost" onClick={() => router.push("/")} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Events
          </Button>
          <div className="flex items-center gap-3">
            <Heart className="h-8 w-8 text-red-500" />
            <div>
              <h1 className="text-3xl font-bold text-balance">My Favorites</h1>
              <p className="text-muted-foreground mt-1">
                {favoriteEvents.length} event{favoriteEvents.length !== 1 ? "s" : ""} you've favorited
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {favoriteEvents.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {favoriteEvents.map((event) => (
              <Card key={event.id} className="group overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    className="h-48 w-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute top-3 right-3">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
                      onClick={() => toggleFavorite(event.id)}
                    >
                      <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                    </Button>
                  </div>
                  <Badge className="absolute top-3 left-3 bg-white/90 text-gray-900 hover:bg-white">
                    {event.category}
                  </Badge>
                </div>

                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-lg leading-tight text-balance">{event.title}</h3>
                    <span className="text-lg font-bold text-primary">${event.price}</span>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{event.description}</p>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {new Date(event.date).toLocaleDateString()} at {event.time}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{event.attendees.toLocaleString()} attending</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">by {event.organizer}</span>
                      <Link href={`/events/${event.id}`}>
                        <Button size="sm" className="ml-auto">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2">No favorites yet</h2>
            <p className="text-muted-foreground mb-6">
              Start exploring events and add them to your favorites to see them here.
            </p>
            <Link href="/">
              <Button>Discover Events</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
