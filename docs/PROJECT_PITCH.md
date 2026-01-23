# PROJECT PITCH - MVP #6: AI Lead Finder + CRM

## 🎯 Problema vs Solución

### El Problema
Los equipos de venta B2B pequeños pierden el 40% de su tiempo en tareas manuales:
- Buscar y calificar leads de forma inconsistente.
- Seguimiento manual propenso a errores.
- Herramientas actuales (HubSpot/Salesforce) son demasiado complejas y costosas ($150-300/mes).

### La Solución
Un CRM ligero y "delightful" que utiliza IA para:
- Calificar leads automáticamente (0-100) basándose en su perfil.
- Visualizar el pipeline con un sistema drag-and-drop intuitivo.
- Automatizar campañas de email con sugerencias de IA.

---

## 🛠️ Core Features (MoSCoW)

### Must Have (MVP)
- **Lead Management**: Tabla filtrable con datos de contacto e industria.
- **AI Lead Scoring**: Algoritmo de calificación (simulado) con badges de color.
- **Pipeline Kanban**: Tablero visual con funcionalidad drag-and-drop.
- **Email Campaigns**: Creador de campañas con sugerencias de subject lines por IA.
- **Analytics**: Dashboard con funnel de conversión y métricas clave.

### Should Have
- Autenticación con Supabase.
- Integración real con OpenAI API y Resend API.
- Importación de leads vía CSV.

### Could Have
- Integración con LinkedIn para enriquecimiento de datos.
- Notificaciones en tiempo real.

### Won't Have (Next Iterations)
- Aplicación móvil nativa.
- CRM multi-moneda avanzado.

---

## 🎨 Wireframes & UX
- **Navigation**: Sidebar permanente con acceso rápido a las 5 áreas clave.
- **Dashboard**: Vista "at-a-glance" de la salud del negocio.
- **Pipeline**: Interacción física (drag-and-drop) para mover leads.
- **Design System**: Paleta azul/púrpura premium con tipografía moderna (Outfit/Inter).

---

## 💻 Tech Stack
- **Frontend**: Next.js 14+ (App Router).
- **Styling**: Tailwind CSS + Shadcn-like components.
- **State/Interactivity**: @dnd-kit para Kanban.
- **Database/Auth**: Supabase (PostgreSQL + RLS).
- **Quality**: Vitest, Playwright, ESLint (Strict), Prettier.

---

## 🔒 Security & Quality (OWASP Consideration)
- **Data Isolation**: RLS policies en Supabase para asegurar que los usuarios solo vean sus propios leads.
- **Input Validation**: Zod para sanear todos los datos de entrada en el servidor.
- **Secure Auth**: Manejo de sesiones vía Supabase Auth.
- **Zero Warnings Policy**: Build bloqueada si hay warnings de ESLint o tipos.

---

## 🚀 Rabbit Holes & Risks
- **Complexity of Drag-and-drop**: Mitigado usando @dnd-kit que es robusto.
- **AI Token Costs**: Mitigado mediante caching de scores y procesos batch.
- **Data Consistency**: Asegurado mediante tipos estrictos en TypeScript y esquemas de validación Zod.
