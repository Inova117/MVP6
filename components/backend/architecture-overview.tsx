// Architecture Overview for MVP #6 - AI Lead CRM
'use client'

export function ArchitectureOverview() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
          <svg
            className="w-6 h-6 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Architecture Overview
          </h2>
          <p className="text-slate-600">
            AI-powered CRM with automated lead scoring
          </p>
        </div>
      </div>

      <div className="bg-slate-50 rounded-lg p-6 mb-6">
        <div className="mermaid">
          {`graph TB
    A[Sales Team] -->|HTTPS| B[Next.js Frontend]
    B -->|API Routes| C[Server-Side API]
    C -->|Validates| D[Zod Schemas]
    C -->|Queries| E[(Supabase PostgreSQL)]
    C -->|Auth Check| F[Supabase Auth]
    C -->|AI Scoring| G[OpenAI API]
    C -->|Email| H[Resend API]
    E -->|RLS Policies| I[Row Level Security]
    E -->|Triggers| J[Auto Scoring]
    F -->|JWT Token| B
    
    style A fill:#e3f2fd
    style B fill:#bbdefb
    style C fill:#90caf9
    style D fill:#fff9c4
    style E fill:#c8e6c9
    style F fill:#ffccbc
    style G fill:#e1bee7
    style H fill:#fff9c4
    style I fill:#f8bbd0
    style J fill:#ffccbc`}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
          <div className="flex items-center gap-2 mb-2">
            <svg
              className="w-5 h-5 text-blue-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <h3 className="font-semibold text-slate-900">AI Lead Scoring</h3>
          </div>
          <p className="text-sm text-slate-600">
            OpenAI-powered automatic lead qualification and scoring.
          </p>
        </div>

        <div className="p-4 bg-green-50 rounded-lg border border-green-100">
          <div className="flex items-center gap-2 mb-2">
            <svg
              className="w-5 h-5 text-green-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <h3 className="font-semibold text-slate-900">Email Campaigns</h3>
          </div>
          <p className="text-sm text-slate-600">
            Automated email sequences with Resend integration.
          </p>
        </div>

        <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
          <div className="flex items-center gap-2 mb-2">
            <svg
              className="w-5 h-5 text-purple-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <h3 className="font-semibold text-slate-900">Pipeline Kanban</h3>
          </div>
          <p className="text-sm text-slate-600">
            Drag-and-drop pipeline management with @dnd-kit.
          </p>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-slate-200">
        <p className="text-sm text-slate-600 mb-3 font-medium">
          Technologies Used:
        </p>
        <div className="flex flex-wrap gap-2">
          {[
            'Next.js 14',
            'TypeScript',
            'Supabase',
            'OpenAI',
            'Resend',
            '@dnd-kit',
            'Tailwind CSS',
            'Zod',
            'Vercel',
          ].map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-slate-100 text-slate-700 text-sm rounded-full font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
