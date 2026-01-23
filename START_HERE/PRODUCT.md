# 📋 PRODUCT SPECIFICATION - MVP #6: AI Lead Finder + CRM

**Responsabilidad**: Product Manager  
**Enfoque**: QUÉ construir, POR QUÉ, CUÁNDO

---

## 🎯 Business Context

### Objetivo del MVP

Crear un **CRM ligero con AI lead scoring** que automatice la generación, calificación y seguimiento de leads B2B.

### Problema de Negocio

- **B2B sales teams** gastan 40% del tiempo buscando leads manualmente
- **Scoring inconsistente**: Cada vendedor califica diferente
- **Follow-up manual**: Se pierden leads por falta de seguimiento
- **Tools caros**: $150-300/usuario/mes (Salesforce, HubSpot)

### Oportunidad

- Mercado CRM: $80B globally
- TAM: 500K empresas B2B pequeñas (10-100 empleados)
- Nuestro edge: AI scoring + $99/mes + fácil setup

### Success Goal

- **200 empresas** usando en 60 días
- **Promedio 500 leads** gestionados por empresa
- **>40% leads calificados** vía AI
- **>25% conversion rate** (lead → cliente)

---

## 👥 Target Users

### Persona 1: Laura Gómez (Sales Manager)

- **Rol**: Jefa de ventas en agencia marketing
- **Team**: 5 vendedores
- **Pain**: Equipo pierde tiempo calificando leads malos
- **Willingness to pay**: $199/mes

### Persona 2: Roberto Silva (Business Development)

- **Rol**: BDR en empresa SaaS
- **Uso**: 100+ leads nuevos/semana
- **Expectativa**: AI score confiable, seguimiento automático

---

## 🎨 Features (MoSCoW)

### ✅ **MUST-HAVE**

#### Feature #1: Lead Management

**Value**: Core CRM  
**Effort**: 3 días

**User Story**:
Como sales rep, quiero:

- Ver lista de leads (tabla con filtros)
- Ver detalle de lead (company, contact, notes)
- Agregar lead manualmente (form)
- Importar leads (CSV)

#### Feature #2: AI Lead Scoring

**Value**: Diferenciador  
**Effort**: 4 días

**User Story**:
Como sales manager, quiero:

- AI calcule score 0-100 para cada lead
- Ver "AI Insights" (por qué es buen fit)
- Filtrar por AI score (>90, 70-89, <70)

**AI Logic** (OpenAI):

- Inputs: Company size, industry, tech stack, recent activity
- Output: Score + reasons

#### Feature #3: Pipeline Kanban

**Value**: Visual sales process  
**Effort**: 3 días

**User Story**:
Como sales rep, quiero:

- Ver pipeline en kanban (New → Qualified → Contacted → Proposal → Won)
- Drag-and-drop leads entre etapas
- Ver $ value por etapa

#### Feature #4: Email Campaigns

**Value**: Automatización  
**Effort**: 4 días

**User Story**:
Como sales rep, quiero:

- Crear email campaign
- Usar AI para subject line suggestions
- Personalizar con variables {{first_name}}, {{company}}
- Enviar a lista de leads

#### Feature #5: Analytics

**Value**: Insights  
**Effort**: 2 días

**User Story**:
Como sales manager, quiero:

- Ver conversion rate por etapa
- Ver avg deal size
- Ver leads generados vs convertidos

---

## ✅ Acceptance Criteria

### Feature #1: Lead Management

**AC-1.1**: Lead List

- [ ] Table muestra: Company, Contact, Industry, AI Score, Status
- [ ] Filters: Industry, AI Score, Status, Date
- [ ] Button "Import Leads" abre CSV uploader
- [ ] Button "Add Lead" abre form

**AC-1.2**: Lead Detail

- [ ] Shows company info, contact, AI insights panel
- [ ] Activity timeline (notes, emails, calls)
- [ ] Actions: Send Email, Schedule Call, Mark Qualified

**Implementation**: `ENGINEERING.md` → § 6.2

---

### Feature #2: AI Lead Scoring

**AC-2.1**: AI Scoring

- [ ] Cron job (diario) calcula scores para new leads
- [ ] OpenAI API call con company data
- [ ] Score saved en DB (0-100)
- [ ] "AI Insights" panel muestra reasons

**AC-2.2**: Display

- [ ] Badge color: green (90+), yellow (70-89), red (<70)
- [ ] Filter slider: 0-100

**Implementation**: `ENGINEERING.md` → § 6.3

---

### Feature #3: Pipeline Kanban

**AC-3.1**: Kanban Board

- [ ] 5 columns: New, Qualified, Contacted, Proposal, Won
- [ ] Drag-and-drop leads
- [ ] Card shows: company, contact, AI score, $ value
- [ ] Column header shows: count + total $ value

**Implementation**: `ENGINEERING.md` → § 6.4

---

### Feature #4: Email Campaigns

**AC-4.1**: Campaign Builder

- [ ] Step 1: Select leads (checkboxes)
- [ ] Step 2: Compose email (rich text + variables)
- [ ] Step 3: Review recipients
- [ ] Button "Send Campaign"

**AC-4.2**: AI Suggestions

- [ ] Button "AI Suggestion" for subject line
- [ ] OpenAI generates 3 options
- [ ] Click option to insert

**Implementation**: `ENGINEERING.md` → § 6.5

---

### Feature #5: Analytics

**AC-5.1**: Dashboard

- [ ] Cards: Total leads, Qualified %, In pipeline, Converted
- [ ] Conversion funnel chart
- [ ] Avg deal size

**Implementation**: `ENGINEERING.md` → § 6.6

---

## 📊 Success Metrics

### North Star Metric

**Leads converted to customers**  
Target: 1,000/mes (200 empresas x 5 conversions)

### Primary Metrics

| Metric                  | Target               |
| ----------------------- | -------------------- |
| **AI Scoring Accuracy** | >85%                 |
| **Email Open Rate**     | >30%                 |
| **Pipeline Velocity**   | <14 días (New → Won) |
| **Lead → Customer**     | >25%                 |

---

## 📅 Timeline

### Sprint 1 (Semana 1)

- Día 1-2: Setup + Auth
- Día 3-5: Lead CRUD + Import CSV
- Día 6-7: AI scoring integration

### Sprint 2 (Semana 2)

- Día 8-10: Pipeline kanban
- Día 11-13: Email campaigns
- Día 14: Analytics + QA

---

**Última actualización**: 2026-01-13  
**MVP**: #6 - AI Lead Finder + CRM
