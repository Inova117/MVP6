# API Specification - MVP #6: AI Lead Finder + CRM

> **Version**: 1.0.0  
> **Base URL**: `/api`  
> **Format**: JSON  
> **Authentication**: Supabase Auth (JWT Bearer Token)

---

## 📋 Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Authentication](#authentication)
3. [Error Handling](#error-handling)
4. [Endpoints](#endpoints)
   - [Stats & Dashboard](#1-stats--dashboard)
   - [Leads Management](#2-leads-management)
   - [Pipeline](#3-pipeline)
   - [Email Campaigns](#4-email-campaigns)
   - [Analytics](#5-analytics)
5. [Data Models](#data-models)
6. [Testing Guide](#testing-guide)

---

## Architecture Overview

Este MVP utiliza **Next.js 14 API Routes** como backend simulado que replica la estructura que tendrá cuando se conecte a Supabase.

### Flujo de Datos

```
┌─────────────┐      ┌──────────────┐      ┌─────────────┐
│   Client    │─────▶│  API Routes  │─────▶│  Simulated  │
│  (React)    │◀─────│  (Next.js)   │◀─────│    Data     │
└─────────────┘      └──────────────┘      └─────────────┘
                            │
                            ▼
                     ┌──────────────┐
                     │  Validation  │
                     │    (Zod)     │
                     └──────────────┘
```

### Beneficios de esta Arquitectura

- ✅ **Separación de Concerns**: Frontend no conoce la fuente de datos
- ✅ **Type Safety**: Schemas Zod compartidos entre cliente y servidor
- ✅ **Testeable**: Endpoints pueden ser testeados independientemente
- ✅ **Production-Ready**: Solo cambiar implementación interna para conectar a Supabase

---

## Authentication

### Current State (Simulated)

En la fase de simulación, **no se requiere autenticación**. Todos los endpoints son públicos.

### Production Implementation

Cuando se conecte a Supabase, cada endpoint requerirá:

```typescript
// middleware.ts
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  return res
}

export const config = {
  matcher: '/api/:path*',
}
```

### Headers

```http
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

---

## Error Handling

### Error Response Format

Todos los errores siguen este formato estándar:

```typescript
interface ErrorResponse {
  error: string           // Human-readable error message
  code: string           // Machine-readable error code
  details?: unknown      // Additional error context
  timestamp: string      // ISO 8601 timestamp
}
```

### HTTP Status Codes

| Code | Meaning | Usage |
|------|---------|-------|
| `200` | OK | Successful GET request |
| `201` | Created | Successful POST request |
| `400` | Bad Request | Validation error |
| `401` | Unauthorized | Missing/invalid auth token |
| `403` | Forbidden | Insufficient permissions |
| `404` | Not Found | Resource doesn't exist |
| `500` | Internal Server Error | Server-side error |

### Example Error Response

```json
{
  "error": "Validation failed",
  "code": "VALIDATION_ERROR",
  "details": {
    "field": "contactEmail",
    "message": "Invalid email address"
  },
  "timestamp": "2026-01-23T18:00:00.000Z"
}
```

---

## Endpoints

### 1. Stats & Dashboard

#### `GET /api/stats`

Obtiene métricas del dashboard y leads recientes.

**Request**

```http
GET /api/stats HTTP/1.1
Host: localhost:3001
```

**Response** `200 OK`

```typescript
interface StatsResponse {
  stats: Array<{
    name: string
    value: string
    change: string
    trend: 'up' | 'down'
  }>
  recentLeads: Array<{
    id: string
    company: string
    contact: string
    score: number
    status: LeadStatus
    dealValue: number
  }>
}
```

**Example Response**

```json
{
  "stats": [
    {
      "name": "Total Leads",
      "value": "248",
      "change": "+12%",
      "trend": "up"
    },
    {
      "name": "Qualified Leads",
      "value": "94",
      "change": "+8%",
      "trend": "up"
    }
  ],
  "recentLeads": [
    {
      "id": "1",
      "company": "TechCorp Solutions",
      "contact": "Sarah Johnson",
      "score": 95,
      "status": "qualified",
      "dealValue": 15000
    }
  ]
}
```

**Testing**

```bash
# cURL
curl http://localhost:3001/api/stats

# HTTPie
http GET http://localhost:3001/api/stats
```

---

### 2. Leads Management

#### `GET /api/leads`

Lista todos los leads con filtros opcionales.

**Request**

```http
GET /api/leads?industry=Technology&status=new HTTP/1.1
Host: localhost:3001
```

**Query Parameters**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `industry` | string | No | Filter by industry |
| `status` | LeadStatus | No | Filter by status |
| `ai_score_min` | number | No | Minimum AI score (0-100) |
| `ai_score_max` | number | No | Maximum AI score (0-100) |

**Response** `200 OK`

```typescript
interface LeadsResponse {
  leads: Lead[]
  total: number
  page: number
  pageSize: number
}

interface Lead {
  id: string
  companyName: string
  industry: string
  contactName: string
  contactEmail: string
  contactPhone?: string
  website?: string
  aiScore: number | null
  aiInsights?: string
  status: 'new' | 'qualified' | 'contacted' | 'proposal' | 'won' | 'lost'
  dealValue: number | null
  createdAt: string
}
```

**Example Response**

```json
{
  "leads": [
    {
      "id": "1",
      "companyName": "TechCorp Solutions",
      "industry": "Technology",
      "contactName": "Sarah Johnson",
      "contactEmail": "sarah@techcorp.com",
      "contactPhone": "+1-555-0123",
      "website": "https://techcorp.com",
      "aiScore": 95,
      "aiInsights": "High-value prospect in growing market",
      "status": "qualified",
      "dealValue": 15000,
      "createdAt": "2026-01-20T10:00:00Z"
    }
  ],
  "total": 248,
  "page": 1,
  "pageSize": 50
}
```

**Error Responses**

```json
// 400 Bad Request - Invalid query parameter
{
  "error": "Invalid status value",
  "code": "INVALID_PARAMETER",
  "details": {
    "parameter": "status",
    "validValues": ["new", "qualified", "contacted", "proposal", "won", "lost"]
  },
  "timestamp": "2026-01-23T18:00:00.000Z"
}
```

---

#### `POST /api/leads`

Crea un nuevo lead.

**Request**

```http
POST /api/leads HTTP/1.1
Host: localhost:3001
Content-Type: application/json

{
  "companyName": "New Company Inc",
  "contactName": "John Doe",
  "contactEmail": "john@newcompany.com",
  "industry": "SaaS",
  "dealValue": 10000,
  "status": "new"
}
```

**Request Body Schema** (Zod)

```typescript
import { z } from 'zod'

export const leadSchema = z.object({
  companyName: z.string().min(2, 'Company name must be at least 2 characters'),
  contactName: z.string().min(2, 'Contact name must be at least 2 characters'),
  contactEmail: z.string().email('Invalid email address'),
  contactPhone: z.string().optional().nullable(),
  industry: z.string().optional().nullable(),
  website: z.string().url().optional().nullable(),
  dealValue: z.number().positive().optional().nullable(),
  status: z.enum(['new', 'qualified', 'contacted', 'proposal', 'won', 'lost']),
  notes: z.string().optional().nullable(),
})

export type CreateLeadInput = z.infer<typeof leadSchema>
```

**Response** `201 Created`

```json
{
  "success": true,
  "message": "Lead created successfully",
  "lead": {
    "id": "abc123",
    "companyName": "New Company Inc",
    "contactName": "John Doe",
    "contactEmail": "john@newcompany.com",
    "industry": "SaaS",
    "dealValue": 10000,
    "status": "new",
    "aiScore": null,
    "createdAt": "2026-01-23T18:00:00.000Z"
  }
}
```

**Error Responses**

```json
// 400 Bad Request - Validation Error
{
  "error": "Validation failed",
  "code": "VALIDATION_ERROR",
  "details": {
    "issues": [
      {
        "path": ["contactEmail"],
        "message": "Invalid email address"
      }
    ]
  },
  "timestamp": "2026-01-23T18:00:00.000Z"
}

// 409 Conflict - Duplicate Email
{
  "error": "Lead with this email already exists",
  "code": "DUPLICATE_LEAD",
  "details": {
    "existingLeadId": "xyz789"
  },
  "timestamp": "2026-01-23T18:00:00.000Z"
}
```

**Testing**

```bash
# cURL
curl -X POST http://localhost:3001/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "companyName": "Test Corp",
    "contactName": "Jane Doe",
    "contactEmail": "jane@test.com",
    "status": "new"
  }'

# HTTPie
http POST http://localhost:3001/api/leads \
  companyName="Test Corp" \
  contactName="Jane Doe" \
  contactEmail="jane@test.com" \
  status="new"
```

---

### 3. Pipeline

#### `GET /api/pipeline`

Obtiene leads organizados por etapa del pipeline para el Kanban board.

**Request**

```http
GET /api/pipeline HTTP/1.1
Host: localhost:3001
```

**Response** `200 OK`

```typescript
interface PipelineResponse {
  leads: Array<{
    id: string
    companyName: string
    contactName: string
    aiScore: number
    dealValue: number
    status: 'new' | 'qualified' | 'contacted' | 'proposal' | 'won'
  }>
  summary: {
    totalValue: number
    totalLeads: number
    byStage: Record<string, { count: number; value: number }>
  }
}
```

**Example Response**

```json
{
  "leads": [
    {
      "id": "1",
      "companyName": "TechCorp Solutions",
      "contactName": "Sarah Johnson",
      "aiScore": 95,
      "dealValue": 15000,
      "status": "new"
    }
  ],
  "summary": {
    "totalValue": 245000,
    "totalLeads": 67,
    "byStage": {
      "new": { "count": 15, "value": 45000 },
      "qualified": { "count": 20, "value": 80000 },
      "contacted": { "count": 18, "value": 65000 },
      "proposal": { "count": 10, "value": 40000 },
      "won": { "count": 4, "value": 15000 }
    }
  }
}
```

---

### 4. Email Campaigns

#### `GET /api/campaigns`

Lista todas las campañas de email y sugerencias de IA.

**Request**

```http
GET /api/campaigns HTTP/1.1
Host: localhost:3001
```

**Response** `200 OK`

```typescript
interface CampaignsResponse {
  campaigns: Array<{
    id: string
    name: string
    subject: string
    status: 'draft' | 'sent'
    recipients: number
    sentAt: string | null
    openRate: number
    clickRate: number
  }>
  aiSuggestions: string[]
}
```

**Example Response**

```json
{
  "campaigns": [
    {
      "id": "1",
      "name": "Q1 Product Launch",
      "subject": "Introducing Our Revolutionary AI Solution",
      "status": "sent",
      "recipients": 45,
      "sentAt": "2026-01-20T09:00:00Z",
      "openRate": 68,
      "clickRate": 24
    }
  ],
  "aiSuggestions": [
    "🚀 Transform Your Sales Pipeline in 30 Days",
    "Exclusive Invite: See How AI Scores Your Leads",
    "Join 500+ Companies Using AI for Sales Growth"
  ]
}
```

---

### 5. Analytics

#### `GET /api/analytics`

Obtiene métricas detalladas de conversión y rendimiento.

**Request**

```http
GET /api/analytics?period=30d HTTP/1.1
Host: localhost:3001
```

**Query Parameters**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `period` | string | No | Time period: `7d`, `30d`, `90d`, `1y` |
| `groupBy` | string | No | Group by: `day`, `week`, `month` |

**Response** `200 OK`

```typescript
interface AnalyticsResponse {
  metrics: {
    conversionRate: string
    conversionTrend: string
    avgDealSize: string
    dealSizeTrend: string
    salesCycle: string
    cycleTrend: string
    activeDeals: number
    activeTrend: string
  }
  funnel: Array<{
    stage: string
    count: number
    percentage: number
  }>
  trends: Array<{
    month: string
    leads: number
    converted: number
  }>
  topPerformers: Array<{
    name: string
    deals: number
    value: number
  }>
  aiPerformance: Array<{
    range: string
    label: string
    value: string
    count: number
  }>
}
```

**Example Response**

```json
{
  "metrics": {
    "conversionRate": "11.3%",
    "conversionTrend": "+2.4%",
    "avgDealSize": "$15,200",
    "dealSizeTrend": "+8.1%",
    "salesCycle": "12 days",
    "cycleTrend": "-3 days",
    "activeDeals": 67,
    "activeTrend": "+12"
  },
  "funnel": [
    { "stage": "New Leads", "count": 248, "percentage": 100 },
    { "stage": "Qualified", "count": 94, "percentage": 38 },
    { "stage": "Contacted", "count": 67, "percentage": 27 },
    { "stage": "Proposal", "count": 45, "percentage": 18 },
    { "stage": "Won", "count": 28, "percentage": 11 }
  ],
  "trends": [
    { "month": "Jan", "leads": 180, "converted": 22 },
    { "month": "Feb", "leads": 210, "converted": 26 }
  ],
  "topPerformers": [
    { "name": "Sarah Johnson", "deals": 12, "value": 186000 }
  ],
  "aiPerformance": [
    {
      "range": "High Score (90-100)",
      "label": "Hot",
      "value": "42%",
      "count": 34
    }
  ]
}
```

---

## Data Models

### Lead

```typescript
interface Lead {
  id: string
  companyName: string
  industry: string | null
  website: string | null
  contactName: string
  contactEmail: string
  contactPhone: string | null
  aiScore: number | null  // 0-100
  aiInsights: string | null
  status: LeadStatus
  dealValue: number | null
  notes: string | null
  createdAt: string  // ISO 8601
  updatedAt: string  // ISO 8601
  createdBy: string  // User ID
}

type LeadStatus = 
  | 'new' 
  | 'qualified' 
  | 'contacted' 
  | 'proposal' 
  | 'won' 
  | 'lost'
```

### Campaign

```typescript
interface Campaign {
  id: string
  name: string
  subject: string
  body: string
  status: 'draft' | 'sent'
  recipients: number
  sentAt: string | null
  openRate: number  // Percentage
  clickRate: number  // Percentage
  createdAt: string
  createdBy: string
}
```

---

## Testing Guide

### Unit Tests

Cada endpoint debe tener tests que cubran:

1. **Happy Path**: Request válido retorna respuesta esperada
2. **Validation**: Requests inválidos retornan errores apropiados
3. **Edge Cases**: Límites, valores nulos, etc.

**Example Test** (Vitest)

```typescript
// tests/api/leads.test.ts
import { describe, it, expect, beforeEach } from 'vitest'
import { POST } from '@/app/api/leads/route'

describe('POST /api/leads', () => {
  it('creates a lead with valid data', async () => {
    const request = new Request('http://localhost:3001/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        companyName: 'Test Corp',
        contactName: 'John Doe',
        contactEmail: 'john@test.com',
        status: 'new',
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(201)
    expect(data.success).toBe(true)
    expect(data.lead).toHaveProperty('id')
    expect(data.lead.companyName).toBe('Test Corp')
  })

  it('returns 400 for invalid email', async () => {
    const request = new Request('http://localhost:3001/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        companyName: 'Test Corp',
        contactName: 'John Doe',
        contactEmail: 'invalid-email',
        status: 'new',
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.code).toBe('VALIDATION_ERROR')
  })
})
```

### Integration Tests

```bash
# Run all API tests
npm run test:api

# Run with coverage
npm run test:api -- --coverage

# Watch mode
npm run test:api -- --watch
```

### Manual Testing

```bash
# Test all endpoints
./scripts/test-api.sh

# Test specific endpoint
curl -v http://localhost:3001/api/leads
```

---

## Production Checklist

Antes de conectar a Supabase real:

- [ ] Implementar autenticación JWT
- [ ] Agregar rate limiting
- [ ] Configurar CORS apropiadamente
- [ ] Implementar logging estructurado
- [ ] Agregar monitoring (Sentry)
- [ ] Configurar RLS policies en Supabase
- [ ] Migrar validaciones Zod a servidor
- [ ] Implementar paginación real
- [ ] Agregar caching donde sea apropiado
- [ ] Documentar límites de rate (e.g., 100 req/min)

---

## Changelog

### v1.0.0 (2026-01-23)

- Initial API specification
- Simulated endpoints for MVP phase
- Complete request/response documentation
- Error handling standards
- Testing guide

---

**Maintainer**: Zerion MVP Studio  
**Last Updated**: 2026-01-23  
**Status**: ✅ Production-Ready (Simulation Phase)
