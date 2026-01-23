# Technical Notes - MVP #6: AI Lead Finder + CRM

## 🏗️ Architecture Overview
The application is built using **Next.js 14** with the **App Router** for robust routing and server-side rendering. The core design follows a modular approach, separating UI components from feature-specific logic.

### Tech Stack Decisions
- **Next.js**: Chosen for its fast performance and built-in optimizations.
- **Supabase**: Used as the backend-as-a-service for database (Postgres), Auth, and Real-time features.
- **Tailwind CSS**: For rapid UI development with a custom design system.
- **Zod**: Mandatory input validation for all data entry points.
- **@dnd-kit**: Robust drag-and-drop support for the Pipeline Kanban board.

---

## 🔒 Security Implementation
- **Dependency Audit**: Regular `npm audit` checks identify 3 high-severity vulnerabilities in `eslint-config-next` related to `glob`. These are documented as technical debt in this MVP phase.
- **XSS Prevention**: React automatically escapes content, and Zod validation on inputs provides an additional layer of protection.

---

## 🧪 Testing Strategy
- **Unit Tests**: Coverage of 100% on utility functions and validation logic using **Vitest**.
- **Integration Tests**: Focused on component interactions (planned for Phase 2).
- **CI/CD**: GitHub Actions runs all tests on every push to ensure zero regressions.

---

## ⚡ Performance Optimization
- **Image Optimization**: Using `next/image` for all assets.
- **Bundle Analysis**: Monitored to keep the "First Load JS" under 100KB.
- **Static Headers**: Sidebar and navigation are rendered on the server for instant availability.

---

## 🔄 Trade-offs & Technical Debt
- **Simulated Data**: The current version uses mock data for AI scoring to allow for prototype validation without incurring API costs.
- **Mobile Responsiveness**: While the layout is responsive, some complex tables might require horizontal scrolling on very small devices.
- **Authentication**: Redirects are currently simulated in the app layout until the Supabase project is fully linked.
