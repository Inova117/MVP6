'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Users, Clock, BarChart3 } from 'lucide-react'

export function Navigation() {
    const pathname = usePathname()

    const links = [
        { href: '/home', label: 'Home', icon: Home },
        { href: '/contacts', label: 'Contacts', icon: Users },
        { href: '/timeline', label: 'Timeline', icon: Clock },
        { href: '/analytics', label: 'Insights', icon: BarChart3 },
    ]

    const isActive = (href: string) => pathname === href || pathname?.startsWith(href + '/')

    return (
        <>
            {/* Desktop Navigation */}
            <nav className="hidden md:block fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-warm-sand z-40">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-sage-400 to-sage-600 flex items-center justify-center text-white font-bold">
                                M
                            </div>
                            <span className="font-display font-semibold text-xl text-foreground">
                                My Network
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            {links.map((link) => {
                                const Icon = link.icon
                                const active = isActive(link.href)
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${active
                                                ? 'bg-sage-500 text-white shadow-sage'
                                                : 'text-muted-foreground hover:bg-sage-50 hover:text-sage-700'
                                            }`}
                                    >
                                        <Icon className="h-5 w-5" />
                                        <span className="font-medium">{link.label}</span>
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Navigation */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-warm-sand z-40 safe-area-bottom">
                <div className="flex items-center justify-around px-4 py-3">
                    {links.map((link) => {
                        const Icon = link.icon
                        const active = isActive(link.href)
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all touch-target ${active
                                        ? 'text-sage-600'
                                        : 'text-muted-foreground'
                                    }`}
                            >
                                <Icon className={`h-6 w-6 ${active ? 'scale-110' : ''} transition-transform`} />
                                <span className="text-xs font-medium">{link.label}</span>
                                {active && (
                                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-sage-600" />
                                )}
                            </Link>
                        )
                    })}
                </div>
            </nav>

            {/* Spacers */}
            <div className="hidden md:block h-20" /> {/* Desktop top spacer */}
            <div className="md:hidden h-20" /> {/* Mobile bottom spacer */}
        </>
    )
}
