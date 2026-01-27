'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MessageCircle, Phone, Calendar, Plus, Smile, Meh, Frown } from 'lucide-react'
import Link from 'next/link'

interface TimelineEntry {
    id: string
    person: string
    type: 'note' | 'call' | 'meeting'
    content: string
    timestamp: string
    date: string
    tags: string[]
    sentiment?: 'positive' | 'neutral' | 'negative'
}

export default function TimelinePage() {
    const [entries] = useState<TimelineEntry[]>([
        {
            id: '1',
            person: 'Sarah Johnson',
            type: 'note',
            content: 'Had a great conversation about the new project direction. She\'s really excited about the possibilities and wants to collaborate more closely.',
            timestamp: '2 hours ago',
            date: 'Today',
            tags: ['work', 'project'],
            sentiment: 'positive'
        },
        {
            id: '2',
            person: 'Mike Chen',
            type: 'call',
            content: 'Quick catch-up call. Discussed upcoming conference and potential speaking opportunity. He mentioned wanting to introduce me to his network.',
            timestamp: 'Yesterday at 3:30 PM',
            date: 'Yesterday',
            tags: ['met at conference', 'opportunity'],
            sentiment: 'positive'
        },
        {
            id: '3',
            person: 'Emma Davis',
            type: 'meeting',
            content: 'Coffee meeting at Blue Bottle. Talked about her new startup idea and how we might work together. Very promising conversation.',
            timestamp: '3 days ago',
            date: 'Jan 23',
            tags: ['close friend', 'business'],
            sentiment: 'positive'
        },
        {
            id: '4',
            person: 'Alex Kumar',
            type: 'note',
            content: 'Haven\'t heard back about the proposal. Should follow up next week to see if they\'re still interested.',
            timestamp: '1 week ago',
            date: 'Jan 19',
            tags: ['needs follow-up'],
            sentiment: 'neutral'
        },
        {
            id: '5',
            person: 'Olivia Martinez',
            type: 'call',
            content: 'Brief call to discuss collaboration timeline. She\'s swamped with current projects but interested in Q2.',
            timestamp: '1 week ago',
            date: 'Jan 19',
            tags: ['work'],
            sentiment: 'neutral'
        }
    ])

    const getIcon = (type: string) => {
        switch (type) {
            case 'call':
                return <Phone className="h-5 w-5" />
            case 'meeting':
                return <Calendar className="h-5 w-5" />
            default:
                return <MessageCircle className="h-5 w-5" />
        }
    }

    const getSentimentIcon = (sentiment?: string) => {
        switch (sentiment) {
            case 'positive':
                return <Smile className="h-5 w-5 text-success" />
            case 'negative':
                return <Frown className="h-5 w-5 text-danger" />
            default:
                return <Meh className="h-5 w-5 text-muted-foreground" />
        }
    }

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'call':
                return 'bg-blue-100 text-blue-700'
            case 'meeting':
                return 'bg-purple-100 text-purple-700'
            default:
                return 'bg-sage-100 text-sage-700'
        }
    }

    // Group entries by date
    const groupedEntries = entries.reduce((acc, entry) => {
        if (!acc[entry.date]) {
            acc[entry.date] = []
        }
        acc[entry.date]!.push(entry)
        return acc
    }, {} as Record<string, TimelineEntry[]>)

    return (
        <div className="min-h-screen bg-warm-cream p-6 md:p-10">
            <div className="max-w-4xl mx-auto space-generous">
                {/* Header */}
                <div className="fade-in mb-10">
                    <h1 className="text-balance mb-3">Timeline</h1>
                    <p className="text-lg text-muted-foreground font-light">
                        Your memory feed of meaningful interactions
                    </p>
                </div>

                {/* Timeline */}
                <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-sage-200 hidden md:block" />

                    {/* Entries by Date */}
                    {Object.entries(groupedEntries).map(([date, dateEntries], dateIndex) => (
                        <div key={date} className="mb-12 slide-up" style={{ animationDelay: `${dateIndex * 50}ms` }}>
                            {/* Date Header */}
                            <div className="flex items-center gap-4 mb-6">
                                <div className="hidden md:flex h-12 w-12 items-center justify-center rounded-full bg-sage-500 text-white font-semibold shadow-sage z-10">
                                    {date === 'Today' ? '📅' : '📆'}
                                </div>
                                <h2 className="text-xl font-semibold text-foreground md:ml-4">
                                    {date}
                                </h2>
                            </div>

                            {/* Entries for this date */}
                            <div className="space-y-4 md:ml-20">
                                {dateEntries.map((entry) => (
                                    <Card
                                        key={entry.id}
                                        className="card-elevated bg-white border-0 rounded-2xl hover:shadow-sage transition-all cursor-pointer group"
                                    >
                                        <CardContent className="p-6">
                                            {/* Header */}
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="flex items-center gap-3">
                                                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${getTypeColor(entry.type)}`}>
                                                        {getIcon(entry.type)}
                                                    </div>
                                                    <div>
                                                        <h3 className="font-semibold text-foreground group-hover:text-sage-600 transition-colors">
                                                            {entry.person}
                                                        </h3>
                                                        <p className="text-sm text-muted-foreground">
                                                            {entry.timestamp}
                                                        </p>
                                                    </div>
                                                </div>
                                                {entry.sentiment && (
                                                    <div className="flex-shrink-0">
                                                        {getSentimentIcon(entry.sentiment)}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Content */}
                                            <p className="text-foreground leading-relaxed mb-4">
                                                {entry.content}
                                            </p>

                                            {/* Tags */}
                                            <div className="flex flex-wrap gap-2">
                                                {entry.tags.map((tag) => (
                                                    <Badge
                                                        key={tag}
                                                        variant="secondary"
                                                        className="bg-sage-50 text-sage-700 border-0 rounded-full px-3 py-1 text-xs"
                                                    >
                                                        {tag}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Load More (placeholder) */}
                <div className="text-center mt-8">
                    <button className="px-6 py-3 rounded-xl bg-white text-sage-600 hover:bg-sage-50 transition-colors font-medium shadow-soft">
                        Load earlier entries
                    </button>
                </div>
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
