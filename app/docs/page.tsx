'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { FileText, Code, Shield, Terminal } from 'lucide-react'

export default function DocsPage() {
    const endpoints = [
        {
            method: 'GET',
            path: '/api/stats',
            desc: 'Dashboard metrics and recent leads',
        },
        {
            method: 'GET',
            path: '/api/leads',
            desc: 'List all leads with filters',
        },
        {
            method: 'POST',
            path: '/api/leads',
            desc: 'Create a new lead',
        },
        {
            method: 'GET',
            path: '/api/pipeline',
            desc: 'Kanban board lead data',
        },
        {
            method: 'GET',
            path: '/api/campaigns',
            desc: 'Campaign list and AI suggestions',
        },
        {
            method: 'GET',
            path: '/api/analytics',
            desc: 'Detailed conversion metrics',
        },
    ]

    return (
        <div className="mx-auto max-w-4xl space-y-8">
            {/* Header */}
            <div className="text-center">
                <h1 className="text-4xl font-bold text-slate-900">Backend API Documentation</h1>
                <p className="mt-4 text-lg text-slate-600">
                    Explora los endpoints simulados de nuestro MVP. Esta arquitectura está lista para ser conectada a Supabase.
                </p>
            </div>

            {/* Grid of Docs */}
            <div className="grid gap-8">
                {/* Endpoints Table */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Terminal className="h-5 w-5 text-primary-600" />
                            Interactive Endpoints
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-slate-200 text-left text-sm font-medium text-slate-600">
                                        <th className="pb-3 pr-4">Method</th>
                                        <th className="pb-3 pr-4">Path</th>
                                        <th className="pb-3">Description</th>
                                        <th className="pb-3 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {endpoints.map((ep) => (
                                        <tr key={ep.path} className="group">
                                            <td className="py-4 pr-4">
                                                <Badge variant={ep.method === 'GET' ? 'success' : 'default'}>
                                                    {ep.method}
                                                </Badge>
                                            </td>
                                            <td className="py-4 pr-4">
                                                <code className="rounded bg-slate-100 px-2 py-1 text-sm text-primary-700">
                                                    {ep.path}
                                                </code>
                                            </td>
                                            <td className="py-4">
                                                <p className="text-sm text-slate-600">{ep.desc}</p>
                                            </td>
                                            <td className="py-4 text-right">
                                                <a
                                                    href={ep.path}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-xs font-medium text-primary-600 hover:underline"
                                                >
                                                    View JSON
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>

                {/* Documentation Sections */}
                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <Shield className="h-5 w-5 text-green-600" />
                                Security Policies
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-slate-600">
                                Implementamos **Row Level Security (RLS)** en todas las tablas clave.
                                Los usuarios solo pueden acceder a los leads que les pertenecen.
                            </p>
                            <ul className="mt-4 list-inside list-disc text-xs text-slate-500 space-y-1">
                                <li>Policy: "Enable read for users based on owner_id"</li>
                                <li>Policy: "Enable insert for authenticated only"</li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <Code className="h-5 w-5 text-blue-600" />
                                Validation Schemas
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-slate-600">
                                Usamos **Zod** para asegurar que cada bit de información que entra al backend sea válido.
                            </p>
                            <pre className="mt-4 rounded bg-slate-900 p-3 text-[10px] text-white overflow-x-auto">
                                {`export const leadSchema = z.object({
  companyName: z.string().min(2),
  contactEmail: z.string().email(),
  status: z.enum(['new', 'won', ...])
})`}
                            </pre>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Footer Meta */}
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-6">
                <div className="flex items-start gap-4">
                    <FileText className="h-6 w-6 text-slate-400" />
                    <div>
                        <h4 className="font-semibold text-slate-900">Información Técnica Completa</h4>
                        <p className="mt-1 text-sm text-slate-600">
                            Para ver el diseño detallado de la base de datos, los flujos de CI/CD y los estándares de calidad, consulta la carpeta <code className="text-primary-700">docs/</code> en la raíz del proyecto.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
