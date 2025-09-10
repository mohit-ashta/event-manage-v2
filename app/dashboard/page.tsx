"use client"

import { useState, useEffect } from "react"
import { Calendar, Heart, Bookmark, Plus, TrendingUp, Users, Clock, ArrowLeft, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { useRouter } from "next/navigation"

// Mock event data
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
]

// Mock user data
const mockUserData = {
  name: "Alex Johnson",
  email: "alex@example.com",
  joinDate: "2023-06-15",
  eventsAttended: 12,
  upcomingEvents: 3,
  totalSpent: 1247,
}

export default function DashboardPage() {
  const router = useRouter()
  const [favorites, setFavorites] = useState<number[]>([])
  const [bookmarks, setBookmarks] = useState<number[]>([])
  const [bookedEvents] = useState<number[]>([1, 2, 3]) // Mock booked events

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

  const favoriteEvents = mockEvents.filter((event) => favorites.includes(event.id))
  const bookmarkedEvents = mockEvents.filter((event) => bookmarks.includes(event.id))
  const upcomingEvents = mockEvents.filter((event) => bookedEvents.includes(event.id))

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <Button variant="ghost" onClick={() => router.push("/")} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Events
          </Button>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-balance">Welcome back, {mockUserData.name}!</h1>
              <p className="text-muted-foreground mt-2">Here's what's happening with your events</p>
            </div>
            <div className="flex gap-2">
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Create Event
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6 lg:grid-cols-4">
          {/* Stats Cards */}
          <div className="lg:col-span-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-0 bg-primary text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
                <Calendar className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockUserData.upcomingEvents}</div>
                <p className="text-xs ">Next event in 5 days</p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-primary text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Events Attended</CardTitle>
                <TrendingUp className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockUserData.eventsAttended}</div>
                <p className="text-xs">+2 from last month</p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-primary text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Favorites</CardTitle>
                <Heart className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{favorites.length}</div>
                <p className="text-xs">Events you love</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${mockUserData.totalSpent}</div>
                <p className="text-xs text-muted-foreground">On event tickets</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Your Upcoming Events</CardTitle>
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {upcomingEvents.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingEvents.map((event) => (
                      <div
                        key={event.id}
                        className="flex gap-4 p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                      >
                        <img
                          src={event.image || "/placeholder.svg"}
                          alt={event.title}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h3 className="font-semibold text-sm">{event.title}</h3>
                              <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  <span>{new Date(event.date).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  <span>{event.time}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  <span>{event.location}</span>
                                </div>
                              </div>
                            </div>
                            <Badge variant="secondary">{event.category}</Badge>
                          </div>
                        </div>
                        <Link href={`/events/${event.id}`}>
                          <Button size="sm" variant="outline">
                            View
                          </Button>
                        </Link>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No upcoming events</p>
                    <Link href="/">
                      <Button size="sm" className="mt-2">
                        Browse Events
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm">
                        Booked <strong>Tech Conference 2024</strong>
                      </p>
                      <p className="text-xs text-muted-foreground">2 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm">
                        Added <strong>Music Festival 2024</strong> to favorites
                      </p>
                      <p className="text-xs text-muted-foreground">5 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm">
                        Attended <strong>Art & Design Workshop</strong>
                      </p>
                      <p className="text-xs text-muted-foreground">1 week ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/favorites">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Heart className="h-4 w-4 mr-2" />
                    My Favorites ({favorites.length})
                  </Button>
                </Link>
                <Link href="/bookmarks">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Bookmark className="h-4 w-4 mr-2" />
                    My Bookmarks ({bookmarks.length})
                  </Button>
                </Link>
                <Link href="/">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Calendar className="h-4 w-4 mr-2" />
                    Browse Events
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Profile Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary font-semibold text-lg">
                        {mockUserData.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{mockUserData.name}</p>
                      <p className="text-sm text-muted-foreground">{mockUserData.email}</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Member since</span>
                      <span>{new Date(mockUserData.joinDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Events attended</span>
                      <span>{mockUserData.eventsAttended}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-4 bg-transparent">
                    Edit Profile
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Favorite Events Preview */}
            {favoriteEvents.length > 0 && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Recent Favorites</CardTitle>
                    <Link href="/favorites">
                      <Button variant="ghost" size="sm">
                        View All
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {favoriteEvents.slice(0, 2).map((event) => (
                      <div key={event.id} className="flex gap-3">
                        <img
                          src={event.image || "/placeholder.svg"}
                          alt={event.title}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{event.title}</p>
                          <p className="text-xs text-muted-foreground">{event.location}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
