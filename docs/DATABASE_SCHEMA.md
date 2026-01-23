# Database Schema - MVP #6: AI Lead Finder + CRM

## Tables

### 1. `leads`

- `id`: UUID PRIMARY KEY
- `company_name`: TEXT NOT NULL
- `industry`: TEXT
- `website`: TEXT
- `contact_name`: TEXT
- `contact_email`: TEXT
- `contact_phone`: TEXT
- `ai_score`: INTEGER (0-100)
- `ai_insights`: JSONB
- `status`: TEXT CHECK (IN 'new', 'qualified', 'contacted', 'proposal', 'won', 'lost')
- `deal_value`: DECIMAL(10,2)
- `created_at`: TIMESTAMP

### 2. `activities`

- `id`: UUID PRIMARY KEY
- `lead_id`: UUID REFERENCES leads(id)
- `type`: TEXT CHECK (IN 'note', 'email', 'call')
- `content`: TEXT
- `created_by`: UUID REFERENCES profiles(id)
- `created_at`: TIMESTAMP

### 3. `email_campaigns`

- `id`: UUID PRIMARY KEY
- `name`: TEXT
- `subject`: TEXT
- `body`: TEXT
- `status`: TEXT CHECK (IN 'draft', 'sent')
- `sent_at`: TIMESTAMP

### 4. `campaign_recipients`

- `id`: UUID PRIMARY KEY
- `campaign_id`: UUID REFERENCES email_campaigns(id)
- `lead_id`: UUID REFERENCES leads(id)
- `sent`: BOOLEAN
- `opened`: BOOLEAN
- `clicked`: BOOLEAN

## RLS Policies

```sql
-- User-scoped
CREATE POLICY "Users can manage own leads"
  ON leads FOR ALL
  USING (created_by = auth.uid());
```

**Last Updated**: 2026-01-13
