'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Star, Calendar, MessageCircle, Users, Plus } from 'lucide-react'
import Link from 'next/link'

interface Reminder {
    id: string
    person: string
    type: 'follow-up' | 'birthday' | 'meeting'
    time: string
    note: string
}

interface Contact {
    id: string
    name: string
    avatar: string
    lastInteraction: string
    tags: string[]
}

interface Activity {
    id: string
    person: string
    type: 'note' | 'call' | 'meeting'
    content: string
    timestamp: string
}

export default function HomePage() {
    const [currentTime, setCurrentTime] = useState(new Date())
    const [reminders, setReminders] = useState<Reminder[]>([])
    const [starredContacts, setStarredContacts] = useState<Contact[]>([])
    const [recentActivity, setRecentActivity] = useState<Activity[]>([])

    useEffect(() => {
        // Update time every minute
        const timer = setInterval(() => setCurrentTime(new Date()), 60000)

        // Mock data
        setReminders([
            {
                id: '1',
                person: 'Sarah Johnson',
                type: 'follow-up',
                time: '2:00 PM',
                note: 'Check in about project proposal'
            },
            {
                id: '2',
                person: 'Mike Chen',
                type: 'meeting',
                time: '4:30 PM',
                note: 'Coffee chat at Blue Bottle'
            }
        ])

        setStarredContacts([
            {
                id: '1',
                name: 'Sarah Johnson',
                avatar: 'SJ',
                lastInteraction: '2 days ago',
                tags: ['close friend', 'work']
            },
            {
                id: '2',
                name: 'Mike Chen',
                avatar: 'MC',
                lastInteraction: '1 week ago',
                tags: ['met at conference']
            },
            {
                id: '3',
                name: 'Emma Davis',
                avatar: 'ED',
                lastInteraction: '3 days ago',
                tags: ['needs follow-up']
            }
        ])

        setRecentActivity([
            {
                id: '1',
                person: 'Sarah Johnson',
                type: 'note',
                content: 'Had a great conversation about the new project direction',
                timestamp: '2 hours ago'
            },
            {
                id: '2',
                person: 'Alex Kumar',
                type: 'call',
                content: 'Quick catch-up call, discussed upcoming collaboration',
                timestamp: 'Yesterday'
            }
        ])

        return () => clearInterval(timer)
    }, [])

    const getGreeting = () => {
        const hour = currentTime.getHours()
        if (hour < 12) return 'Good morning'
        if (hour < 18) return 'Good afternoon'
        return 'Good evening'
    }

    const formatDate = () => {
        return currentTime.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric'
        })
    }

    const getReminderIcon = (type: string) => {
        switch (type) {
            case 'meeting':
                return <Calendar className="h-4 w-4" />
            case 'follow-up':
                return <MessageCircle className="h-4 w-4" />
            default:
                return <Calendar className="h-4 w-4" />
        }
    }

    return (
        <div className="min-h-screen bg-warm-cream p-6 md:p-10 space-generous">
            {/* Hero Section */}
            <div className="max-w-5xl mx-auto fade-in">
                <h1 className="text-balance mb-2">
                    {getGreeting()}, Martin
                </h1>
                <p className="text-lg text-muted-foreground font-light">
                    {formatDate()}
                </p>
            </div>

            <div className="max-w-5xl mx-auto mt-12 space-y-10">
                {/* Today's Reminders */}
                <section className="slide-up">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl">Today's Reminders</h2>
                        <Link
                            href="/timeline"
                            className="text-sage-600 hover:text-sage-700 transition-colors text-sm font-medium"
                        >
                            View all
                        </Link>
                    </div>

                    <div className="space-y-4 stagger-children">
                        {reminders.map((reminder) => (
                            <Card
                                key={reminder.id}
                                className="card-elevated bg-white border-0 rounded-2xl hover:shadow-sage transition-all cursor-pointer"
                            >
                                <CardContent className="p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sage-100 text-sage-600 flex-shrink-0">
                                            {getReminderIcon(reminder.type)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="font-semibold text-foreground">
                                                    {reminder.person}
                                                </h3>
                                                <Badge variant="outline" className="bg-sage-50 text-sage-700 border-sage-200">
                                                    {reminder.time}
                                                </Badge>
                                            </div>
                                            <p className="text-muted-foreground leading-relaxed">
                                                {reminder.note}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {reminders.length === 0 && (
                        <Card className="bg-white border-0 rounded-2xl">
                            <CardContent className="p-12 text-center">
                                <Calendar className="h-12 w-12 text-muted-foreground/40 mx-auto mb-4" />
                                <p className="text-muted-foreground">
                                    No reminders for today. Enjoy your day!
                                </p>
                            </CardContent>
                        </Card>
                    )}
                </section>

                {/* Starred Contacts */}
                <section className="slide-up" style={{ animationDelay: '100ms' }}>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl">Starred Contacts</h2>
                        <Link
                            href="/contacts"
                            className="text-sage-600 hover:text-sage-700 transition-colors text-sm font-medium"
                        >
                            View all
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {starredContacts.map((contact) => (
                            <Card
                                key={contact.id}
                                className="card-elevated bg-white border-0 rounded-2xl hover:shadow-sage transition-all cursor-pointer group"
                            >
                                <CardContent className="p-6">
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-sage-400 to-sage-600 text-white font-semibold text-lg flex-shrink-0">
                                            {contact.avatar}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-foreground mb-1 truncate">
                                                {contact.name}
                                            </h3>
                                            <p className="text-sm text-muted-foreground">
                                                {contact.lastInteraction}
                                            </p>
                                        </div>
                                        <Star className="h-5 w-5 text-warm-peach fill-warm-peach flex-shrink-0" />
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {contact.tags.map((tag) => (
                                            <Badge
                                                key={tag}
                                                variant="secondary"
                                                className="bg-sage-50 text-sage-700 border-0 rounded-full px-3 py-1"
                                            >
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* Recent Activity */}
                <section className="slide-up" style={{ animationDelay: '200ms' }}>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl">Recent Activity</h2>
                        <Link
                            href="/timeline"
                            className="text-sage-600 hover:text-sage-700 transition-colors text-sm font-medium"
                        >
                            View timeline
                        </Link>
                    </div>

                    <div className="space-y-4">
                        {recentActivity.map((activity) => (
                            <Card
                                key={activity.id}
                                className="card-elevated bg-white border-0 rounded-2xl hover:shadow-soft-lg transition-all"
                            >
                                <CardContent className="p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted flex-shrink-0">
                                            <Users className="h-5 w-5 text-muted-foreground" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h4 className="font-medium text-foreground">
                                                    {activity.person}
                                                </h4>
                                                <span className="text-sm text-muted-foreground">
                                                    {activity.timestamp}
                                                </span>
                                            </div>
                                            <p className="text-muted-foreground leading-relaxed">
                                                {activity.content}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>
            </div>

            {/* Floating Action Button */}
            <Link
                href="/note"
                className="fixed bottom-8 right-8 h-16 w-16 rounded-full bg-sage-500 text-white shadow-sage-lg hover:shadow-sage-xl hover:scale-110 transition-all duration-300 flex items-center justify-center ripple touch-target group"
            >
                <Plus className="h-6 w-6 group-hover:rotate-90 transition-transform duration-300" />
            </Link>
        </div>
    )
}
