# ElevenLabs Demo Script - AI Lead CRM Backend

## Script for Voice Generation (Duration: ~90 seconds)

---

Welcome to the AI Lead CRM backend demonstration. This is a powerful B2B sales automation system built with Next.js and TypeScript, designed to generate, score, and manage leads automatically.

Let me walk you through the architecture.

**The API Layer**

Our backend is organized into five RESTful API endpoints, each serving a specific purpose in the sales pipeline.

First, we have the **Leads API**. This endpoint handles lead management with both GET and POST operations. When you fetch leads, you receive comprehensive information including company details, contact information, and most importantly, an AI-generated score ranging from zero to one hundred. For example, TechCorp Solutions has a score of ninety-five, indicating a high-quality lead. The POST endpoint allows creating new leads with automatic timestamp generation.

Next is the **Pipeline API**. This powers our Kanban board visualization, organizing leads across five stages: new, qualified, contacted, proposal, and won. Each lead in the pipeline includes its AI score and deal value, making it easy to prioritize high-value opportunities. Currently, we're tracking nine active deals with a total value exceeding one hundred fifty thousand dollars.

The **Campaigns API** manages email automation. It returns campaign data including open rates and click rates. Our Q1 Product Launch campaign achieved a sixty-eight percent open rate and twenty-four percent click rate, significantly above industry averages. The API also provides AI-generated subject line suggestions to optimize engagement.

Our **Analytics API** delivers comprehensive business intelligence. It calculates conversion rates, average deal sizes, and sales cycle duration. The funnel analysis shows that we convert eleven percent of new leads to won deals, with an average deal size of fifteen thousand two hundred dollars. The AI performance breakdown reveals that leads with scores above ninety convert at forty-two percent, while those below seventy convert at only five percent.

Finally, the **Stats API** provides real-time dashboard metrics with trend indicators. All four key metrics are trending upward, with average deal value increasing by eighteen percent.

**Data Architecture**

The database schema uses Supabase with four main tables: leads, activities, email campaigns, and campaign recipients. The leads table includes AI insights stored as an array, allowing the system to explain why each lead received its particular score.

**The AI Integration**

While currently using mock data for demonstration, the production system integrates OpenAI for intelligent lead scoring based on company size, industry fit, website quality, and engagement signals. This ensures every lead is automatically prioritized without manual intervention.

This backend architecture provides everything needed for a modern B2B sales operation: automated lead generation, intelligent scoring, pipeline management, and email automation, all accessible through clean, type-safe APIs.

Thank you for watching this backend demonstration.

---

## Usage Instructions

1. Copy the script text above (excluding the title and usage sections)
2. Go to ElevenLabs (elevenlabs.io)
3. Paste the script into the text-to-speech interface
4. Select your preferred voice (recommended: professional, clear voice like "Adam" or "Antoni")
5. Generate the audio
6. The script is designed to last approximately 90 seconds at normal speaking pace

## Script Highlights

- **Duration**: ~90 seconds
- **Word Count**: ~450 words
- **Tone**: Professional, technical, informative
- **Structure**: Clear sections with logical flow
- **Technical Details**: Specific metrics and examples from the actual backend code
- **Key Features Covered**:
  - 5 API endpoints
  - Database schema
  - AI scoring system
  - Real performance metrics
  - Business intelligence capabilities
