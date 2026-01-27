'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { User, Bell, Palette, Database, Shield, Save } from 'lucide-react'

export default function SettingsPage() {
    const [name, setName] = useState('Martin')
    const [email, setEmail] = useState('martin@example.com')
    const [notifications, setNotifications] = useState(true)
    const [darkMode, setDarkMode] = useState(false)
    const [saved, setSaved] = useState(false)

    const handleSave = () => {
        setSaved(true)
        setTimeout(() => setSaved(false), 2000)
    }

    return (
        <div className="min-h-screen bg-warm-cream p-6 md:p-10">
            <div className="max-w-4xl mx-auto space-generous">
                {/* Header */}
                <div className="fade-in mb-10">
                    <h1 className="text-balance mb-3">Settings</h1>
                    <p className="text-lg text-muted-foreground font-light">
                        Manage your account and preferences
                    </p>
                </div>

                {/* Settings Sections */}
                <div className="space-y-6 slide-up">
                    {/* Profile Settings */}
                    <Card className="card-elevated bg-white border-0 rounded-2xl">
                        <CardHeader className="pb-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sage-100 text-sage-600">
                                    <User className="h-5 w-5" />
                                </div>
                                <CardTitle className="text-xl">Profile</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    Name
                                </label>
                                <Input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="h-12 rounded-xl border-warm-sand bg-white focus-sage"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    Email
                                </label>
                                <Input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="h-12 rounded-xl border-warm-sand bg-white focus-sage"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Notifications */}
                    <Card className="card-elevated bg-white border-0 rounded-2xl">
                        <CardHeader className="pb-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sage-100 text-sage-600">
                                    <Bell className="h-5 w-5" />
                                </div>
                                <CardTitle className="text-xl">Notifications</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-foreground">Reminder Notifications</p>
                                    <p className="text-sm text-muted-foreground">
                                        Get notified about upcoming reminders
                                    </p>
                                </div>
                                <button
                                    onClick={() => setNotifications(!notifications)}
                                    className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${notifications ? 'bg-sage-500' : 'bg-muted'
                                        }`}
                                >
                                    <span
                                        className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${notifications ? 'translate-x-7' : 'translate-x-1'
                                            }`}
                                    />
                                </button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Appearance */}
                    <Card className="card-elevated bg-white border-0 rounded-2xl">
                        <CardHeader className="pb-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sage-100 text-sage-600">
                                    <Palette className="h-5 w-5" />
                                </div>
                                <CardTitle className="text-xl">Appearance</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-foreground">Dark Mode</p>
                                    <p className="text-sm text-muted-foreground">
                                        Switch to dark theme
                                    </p>
                                </div>
                                <button
                                    onClick={() => setDarkMode(!darkMode)}
                                    className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${darkMode ? 'bg-sage-500' : 'bg-muted'
                                        }`}
                                >
                                    <span
                                        className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${darkMode ? 'translate-x-7' : 'translate-x-1'
                                            }`}
                                    />
                                </button>
                            </div>
                            <div className="pt-2">
                                <p className="text-sm font-medium text-foreground mb-3">Theme Color</p>
                                <div className="flex gap-3">
                                    <button className="h-12 w-12 rounded-full bg-sage-500 border-2 border-sage-600 shadow-soft" />
                                    <button className="h-12 w-12 rounded-full bg-blue-500 border-2 border-transparent hover:border-blue-600 shadow-soft" />
                                    <button className="h-12 w-12 rounded-full bg-purple-500 border-2 border-transparent hover:border-purple-600 shadow-soft" />
                                    <button className="h-12 w-12 rounded-full bg-rose-500 border-2 border-transparent hover:border-rose-600 shadow-soft" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Data & Privacy */}
                    <Card className="card-elevated bg-white border-0 rounded-2xl">
                        <CardHeader className="pb-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sage-100 text-sage-600">
                                    <Shield className="h-5 w-5" />
                                </div>
                                <CardTitle className="text-xl">Data & Privacy</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-muted transition-colors">
                                <p className="font-medium text-foreground">Export Your Data</p>
                                <p className="text-sm text-muted-foreground">
                                    Download all your contacts and notes
                                </p>
                            </button>
                            <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-muted transition-colors">
                                <p className="font-medium text-foreground">Privacy Settings</p>
                                <p className="text-sm text-muted-foreground">
                                    Manage who can see your information
                                </p>
                            </button>
                            <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-danger/10 text-danger transition-colors">
                                <p className="font-medium">Delete Account</p>
                                <p className="text-sm opacity-75">
                                    Permanently delete your account and data
                                </p>
                            </button>
                        </CardContent>
                    </Card>

                    {/* Database Connection */}
                    <Card className="card-elevated bg-white border-0 rounded-2xl">
                        <CardHeader className="pb-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sage-100 text-sage-600">
                                    <Database className="h-5 w-5" />
                                </div>
                                <CardTitle className="text-xl">Database</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-foreground">Connection Status</p>
                                    <p className="text-sm text-muted-foreground">Supabase</p>
                                </div>
                                <Badge variant="secondary" className="bg-success-light text-success-dark border-0">
                                    Connected
                                </Badge>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-foreground mb-2">API Endpoint</p>
                                <code className="block px-4 py-3 bg-muted rounded-xl text-sm text-muted-foreground font-mono">
                                    https://your-project.supabase.co
                                </code>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Save Button */}
                    <button
                        onClick={handleSave}
                        className={`w-full h-14 rounded-xl font-semibold text-lg transition-all ripple ${saved
                                ? 'bg-success text-white'
                                : 'bg-sage-500 text-white hover:bg-sage-600 shadow-sage hover:shadow-sage-lg'
                            }`}
                    >
                        {saved ? (
                            <span className="flex items-center justify-center gap-2">
                                <Save className="h-5 w-5" />
                                Saved!
                            </span>
                        ) : (
                            'Save Changes'
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}
