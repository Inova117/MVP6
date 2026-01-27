'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { X, Check, Smile, Meh, Frown, Tag } from 'lucide-react'

export default function NotePage() {
    const router = useRouter()
    const [content, setContent] = useState('')
    const [selectedTags, setSelectedTags] = useState<string[]>([])
    const [sentiment, setSentiment] = useState<'positive' | 'neutral' | 'negative' | null>(null)
    const [isSaving, setIsSaving] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)

    const availableTags = [
        'work',
        'close friend',
        'met at conference',
        'met at event',
        'needs follow-up',
        'project',
        'opportunity',
        'business'
    ]

    const toggleTag = (tag: string) => {
        setSelectedTags(prev =>
            prev.includes(tag)
                ? prev.filter(t => t !== tag)
                : [...prev, tag]
        )
    }

    const handleSave = async () => {
        setIsSaving(true)

        // Simulate save
        await new Promise(resolve => setTimeout(resolve, 800))

        setIsSaving(false)
        setShowSuccess(true)

        // Show success animation then redirect
        setTimeout(() => {
            router.push('/timeline')
        }, 1200)
    }

    const handleClose = () => {
        router.back()
    }

    return (
        <div className="fixed inset-0 bg-warm-cream z-50 overflow-y-auto">
            {/* Success Overlay */}
            {showSuccess && (
                <div className="fixed inset-0 bg-sage-500/10 backdrop-blur-sm flex items-center justify-center z-50 fade-in">
                    <div className="bg-white rounded-3xl p-8 shadow-sage-lg scale-in">
                        <div className="flex flex-col items-center gap-4">
                            <div className="h-16 w-16 rounded-full bg-success flex items-center justify-center">
                                <Check className="h-8 w-8 text-white" />
                            </div>
                            <p className="text-lg font-semibold text-foreground">Note saved!</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className="min-h-screen p-6 md:p-10">
                <div className="max-w-3xl mx-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8 fade-in">
                        <h1 className="text-3xl font-display font-semibold">New Note</h1>
                        <button
                            onClick={handleClose}
                            className="h-12 w-12 rounded-full bg-white hover:bg-muted transition-colors flex items-center justify-center shadow-soft"
                        >
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    {/* Note Content */}
                    <div className="space-y-6 slide-up">
                        {/* Text Area */}
                        <div className="bg-white rounded-2xl shadow-soft-md p-6">
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="What's on your mind? Capture a thought, reflection, or memory..."
                                className="w-full min-h-[300px] resize-none border-0 focus:outline-none focus:ring-0 text-lg leading-relaxed font-sans placeholder:text-muted-foreground/50"
                                autoFocus
                            />
                        </div>

                        {/* Sentiment Selector */}
                        <div className="bg-white rounded-2xl shadow-soft-md p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <Smile className="h-5 w-5 text-muted-foreground" />
                                <h3 className="font-semibold text-foreground">How did this feel?</h3>
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setSentiment('positive')}
                                    className={`flex-1 h-16 rounded-xl transition-all ${sentiment === 'positive'
                                        ? 'bg-success text-white shadow-soft-md scale-105'
                                        : 'bg-muted hover:bg-success/10 text-muted-foreground'
                                        }`}
                                >
                                    <Smile className="h-6 w-6 mx-auto" />
                                </button>
                                <button
                                    onClick={() => setSentiment('neutral')}
                                    className={`flex-1 h-16 rounded-xl transition-all ${sentiment === 'neutral'
                                        ? 'bg-sage-500 text-white shadow-soft-md scale-105'
                                        : 'bg-muted hover:bg-sage-100 text-muted-foreground'
                                        }`}
                                >
                                    <Meh className="h-6 w-6 mx-auto" />
                                </button>
                                <button
                                    onClick={() => setSentiment('negative')}
                                    className={`flex-1 h-16 rounded-xl transition-all ${sentiment === 'negative'
                                        ? 'bg-danger text-white shadow-soft-md scale-105'
                                        : 'bg-muted hover:bg-danger/10 text-muted-foreground'
                                        }`}
                                >
                                    <Frown className="h-6 w-6 mx-auto" />
                                </button>
                            </div>
                        </div>

                        {/* Tags */}
                        <div className="bg-white rounded-2xl shadow-soft-md p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <Tag className="h-5 w-5 text-muted-foreground" />
                                <h3 className="font-semibold text-foreground">Add tags</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {availableTags.map((tag) => (
                                    <button
                                        key={tag}
                                        onClick={() => toggleTag(tag)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedTags.includes(tag)
                                            ? 'bg-sage-500 text-white shadow-sage'
                                            : 'bg-muted hover:bg-sage-50 text-foreground'
                                            }`}
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Save Button */}
                        <button
                            onClick={handleSave}
                            disabled={!content.trim() || isSaving}
                            className={`w-full h-16 rounded-xl font-semibold text-lg transition-all ${!content.trim() || isSaving
                                ? 'bg-muted text-muted-foreground cursor-not-allowed'
                                : 'bg-sage-500 text-white hover:bg-sage-600 shadow-sage hover:shadow-sage-lg hover:scale-[1.02] ripple'
                                }`}
                        >
                            {isSaving ? (
                                <span className="flex items-center justify-center gap-2">
                                    <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Saving...
                                </span>
                            ) : (
                                'Save Note'
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
