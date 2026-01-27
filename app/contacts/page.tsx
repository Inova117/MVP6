'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Search, Star, Plus, Filter } from 'lucide-react'
import Link from 'next/link'

interface Contact {
    id: string
    name: string
    avatar: string
    company: string
    lastInteraction: string
    tags: string[]
    score: number
    starred: boolean
}

export default function ContactsPage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedFilter, setSelectedFilter] = useState('all')

    // Mock data
    const contacts: Contact[] = [
        {
            id: '1',
            name: 'Sarah Johnson',
            avatar: 'SJ',
            company: 'TechCorp Solutions',
            lastInteraction: '2 days ago',
            tags: ['close friend', 'work'],
            score: 95,
            starred: true
        },
        {
            id: '2',
            name: 'Mike Chen',
            avatar: 'MC',
            company: 'Digital Innovations',
            lastInteraction: '1 week ago',
            tags: ['met at conference', 'needs follow-up'],
            score: 87,
            starred: true
        },
        {
            id: '3',
            name: 'Emma Davis',
            avatar: 'ED',
            company: 'Cloud Services Inc',
            lastInteraction: '3 days ago',
            tags: ['close friend'],
            score: 92,
            starred: true
        },
        {
            id: '4',
            name: 'Alex Kumar',
            avatar: 'AK',
            company: 'DataFlow Systems',
            lastInteraction: '2 weeks ago',
            tags: ['work', 'needs follow-up'],
            score: 78,
            starred: false
        },
        {
            id: '5',
            name: 'Olivia Martinez',
            avatar: 'OM',
            company: 'NextGen Robotics',
            lastInteraction: '5 days ago',
            tags: ['met at event'],
            score: 88,
            starred: false
        },
        {
            id: '6',
            name: 'James Taylor',
            avatar: 'JT',
            company: 'AI Dynamics',
            lastInteraction: '1 week ago',
            tags: ['work'],
            score: 91,
            starred: false
        }
    ]

    const filteredContacts = contacts.filter(contact => {
        const matchesSearch = contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            contact.company.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesFilter = selectedFilter === 'all' ||
            (selectedFilter === 'starred' && contact.starred) ||
            contact.tags.includes(selectedFilter)
        return matchesSearch && matchesFilter
    })

    const allTags = Array.from(new Set(contacts.flatMap(c => c.tags)))

    return (
        <div className="min-h-screen bg-warm-cream p-6 md:p-10">
            <div className="max-w-7xl mx-auto space-generous">
                {/* Header */}
                <div className="fade-in mb-10">
                    <h1 className="text-balance mb-3">Your Network</h1>
                    <p className="text-lg text-muted-foreground font-light">
                        {contacts.length} people you care about
                    </p>
                </div>

                {/* Search & Filters */}
                <div className="slide-up mb-8 space-y-4">
                    {/* Search Bar */}
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                            type="text"
                            placeholder="Search by name or company..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-12 h-14 rounded-xl border-warm-sand bg-white focus-sage text-base"
                        />
                    </div>

                    {/* Filter Tags */}
                    <div className="flex items-center gap-3 overflow-x-auto pb-2 smooth-scroll">
                        <button
                            onClick={() => setSelectedFilter('all')}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${selectedFilter === 'all'
                                    ? 'bg-sage-500 text-white shadow-sage'
                                    : 'bg-white text-foreground hover:bg-sage-50'
                                }`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setSelectedFilter('starred')}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap flex items-center gap-2 ${selectedFilter === 'starred'
                                    ? 'bg-sage-500 text-white shadow-sage'
                                    : 'bg-white text-foreground hover:bg-sage-50'
                                }`}
                        >
                            <Star className="h-4 w-4" />
                            Starred
                        </button>
                        {allTags.map(tag => (
                            <button
                                key={tag}
                                onClick={() => setSelectedFilter(tag)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${selectedFilter === tag
                                        ? 'bg-sage-500 text-white shadow-sage'
                                        : 'bg-white text-foreground hover:bg-sage-50'
                                    }`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Contacts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
                    {filteredContacts.map((contact) => (
                        <Card
                            key={contact.id}
                            className="card-elevated bg-white border-0 rounded-2xl hover:shadow-sage transition-all cursor-pointer group"
                        >
                            <CardContent className="p-6">
                                {/* Header with Avatar and Star */}
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-sage-400 to-sage-600 text-white font-semibold text-xl flex-shrink-0 shadow-soft">
                                        {contact.avatar}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-lg text-foreground mb-1 truncate group-hover:text-sage-600 transition-colors">
                                            {contact.name}
                                        </h3>
                                        <p className="text-sm text-muted-foreground truncate">
                                            {contact.company}
                                        </p>
                                    </div>
                                    {contact.starred && (
                                        <Star className="h-5 w-5 text-warm-peach fill-warm-peach flex-shrink-0" />
                                    )}
                                </div>

                                {/* Last Interaction */}
                                <div className="mb-4 pb-4 border-b border-warm-sand">
                                    <p className="text-sm text-muted-foreground">
                                        Last interaction: <span className="text-foreground font-medium">{contact.lastInteraction}</span>
                                    </p>
                                </div>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {contact.tags.map((tag) => (
                                        <Badge
                                            key={tag}
                                            variant="secondary"
                                            className="bg-sage-50 text-sage-700 border-0 rounded-full px-3 py-1 text-xs"
                                        >
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>

                                {/* Connection Strength Indicator */}
                                <div className="flex items-center gap-2">
                                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-sage-400 to-sage-600 rounded-full transition-all"
                                            style={{ width: `${contact.score}%` }}
                                        />
                                    </div>
                                    <span className="text-xs font-medium text-sage-600">
                                        {contact.score}
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Empty State */}
                {filteredContacts.length === 0 && (
                    <Card className="bg-white border-0 rounded-2xl">
                        <CardContent className="p-16 text-center">
                            <Filter className="h-16 w-16 text-muted-foreground/40 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">No contacts found</h3>
                            <p className="text-muted-foreground">
                                Try adjusting your search or filters
                            </p>
                        </CardContent>
                    </Card>
                )}
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
