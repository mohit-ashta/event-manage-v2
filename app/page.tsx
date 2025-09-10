"use client"

import { useState, useEffect } from "react"
import {
  Search,
  Calendar,
  MapPin,
  Heart,
  Bookmark,
  ArrowRight,
  Users,
  Zap,
  Shield,
  TrendingUp,
  CheckCircle,
  Play,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

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

const categories = ["All", "Technology", "Art", "Music", "Business", "Food", "Fitness"]

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [favorites, setFavorites] = useState<number[]>([])
  const [bookmarks, setBookmarks] = useState<number[]>([])

  // Load favorites and bookmarks from localStorage
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

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                <Calendar className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">EventHub</span>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">
                Features
              </Link>
              <Link href="#events" className="text-sm font-medium hover:text-primary transition-colors">
                Events
              </Link>
              <Link href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">
                Pricing
              </Link>
              <Link href="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">
                Dashboard
              </Link>
            </nav>
            <div className="flex items-center gap-2">
              <Link href="/favorites">
                <Button variant="ghost" size="sm">
                  <Heart className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/bookmarks">
                <Button variant="ghost" size="sm">
                  <Bookmark className="h-4 w-4" />
                </Button>
              </Link>
              <Button size="sm">Get Started</Button>
            </div>
          </div>
        </div>
      </header>

      <section className="relative py-20 lg:py-32 overflow-hidden">
     <div
      className="absolute inset-0"
      style={{
        backgroundImage: "url(/event.avif)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "#e31705bd",
        backgroundBlendMode: "multiply",
  
      }}
    />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-primary/10 text-white border-white">
              🚀 The Future of Event Management
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-balance mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-white">
              Discover, Create & Manage Events Like Never Before
            </h1>
            <p className="text-xl md:text-2xl text-zinc-400 text-balance mb-8 max-w-3xl mx-auto leading-relaxed">
              The ultimate platform for event organizers and attendees. From intimate workshops to massive conferences,
              we make every event unforgettable.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button size="lg" className="text-lg px-8 py-6">
                Explore Events
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent text-white">
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>
            <div className="flex flex-wrap justify-center gap-8 text-sm text-white">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>50,000+ Events</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>1M+ Happy Users</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>99.9% Uptime</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-balance mb-4">Everything You Need for Perfect Events</h2>
            <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
              Powerful tools and features designed to make event management effortless and engaging.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Search className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Smart Discovery</h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  AI-powered search and recommendations help you find the perfect events based on your interests and
                  location.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Easy Management</h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Create, manage, and promote your events with our intuitive dashboard and powerful organizational
                  tools.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Community Building</h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Connect with like-minded people, build lasting relationships, and grow your professional network.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Real-time Updates</h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Stay informed with instant notifications about event changes, new bookings, and important updates.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Secure Payments</h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Bank-level security for all transactions with multiple payment options and fraud protection.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Analytics & Insights</h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Detailed analytics and reporting to help you understand your audience and optimize your events.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">50K+</div>
              <div className="text-muted-foreground">Events Created</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">1M+</div>
              <div className="text-muted-foreground">Happy Users</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">150+</div>
              <div className="text-muted-foreground">Countries</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">99.9%</div>
              <div className="text-muted-foreground">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      <section id="events" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-balance mb-4">Featured Events</h2>
            <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
              Discover amazing events happening near you and around the world.
            </p>
          </div>

          {/* Search and Categories */}
          <div className="mb-12 space-y-6">
            <div className="max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 text-lg"
                />
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Events Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {mockEvents.map((event) => (
              <Card
                key={event.id}
                className="group overflow-hidden hover:shadow-xl pt-0 transition-all duration-300 border-0 shadow-lg"
              >
                <div className="relative">
                  <img
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    className="h-48 w-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute top-3 right-3 flex gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
                      onClick={() => toggleFavorite(event.id)}
                    >
                      <Heart
                        className={`h-4 w-4 ${
                          favorites.includes(event.id) ? "fill-red-500 text-red-500" : "text-gray-600"
                        }`}
                      />
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
                      onClick={() => toggleBookmark(event.id)}
                    >
                      <Bookmark
                        className={`h-4 w-4 ${
                          bookmarks.includes(event.id) ? "fill-blue-500 text-blue-500" : "text-gray-600"
                        }`}
                      />
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
                      <Users className="h-4 w-4" />
                      <span>{event.attendees.toLocaleString()} attending</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">by {event.organizer}</span>
                      <Link href={`/events/${event.id}`}>
                        <Button size="sm">
                          View Details
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" variant="outline">
              View All Events
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-balance mb-6">Ready to Create Amazing Events?</h2>
            <p className="text-xl text-muted-foreground text-balance mb-8 max-w-2xl mx-auto">
              Join thousands of event organizers who trust EventHub to bring their vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-6">
                Start Creating Events
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent">
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold">EventHub</span>
              </div>
              <p className="text-muted-foreground">
                The ultimate platform for discovering and managing events worldwide.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Features</div>
                <div>Pricing</div>
                <div>API</div>
                <div>Integrations</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>About</div>
                <div>Blog</div>
                <div>Careers</div>
                <div>Contact</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Help Center</div>
                <div>Community</div>
                <div>Status</div>
                <div>Privacy</div>
              </div>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2025 EventHub. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
