import { z } from 'zod'

/**
 * Validation schema for Lead creation and updates
 */
export const leadSchema = z.object({
    companyName: z.string().min(2, 'Company name is required').max(100),
    industry: z.string().optional().nullable(),
    website: z.string().url('Invalid website URL').optional().nullable().or(z.literal('')),
    contactName: z.string().min(2, 'Contact name is required').max(100),
    contactEmail: z.string().email('Invalid email address'),
    contactPhone: z.string().optional().nullable(),
    dealValue: z.number().nonnegative('Deal value must be positive').optional().nullable(),
    status: z.enum(['new', 'qualified', 'contacted', 'proposal', 'won', 'lost']).default('new'),
})

export type LeadInput = z.infer<typeof leadSchema>

/**
 * Validation schema for Email Campaigns
 */
export const campaignSchema = z.object({
    name: z.string().min(3, 'Campaign name must be at least 3 characters'),
    subject: z.string().min(5, 'Subject line is too short'),
    body: z.string().min(10, 'Email body is too short'),
})

export type CampaignInput = z.infer<typeof campaignSchema>

/**
 * Validation schema for AI Score prompt input
 */
export const aiScoreSchema = z.object({
    companyName: z.string(),
    industry: z.string().optional(),
    website: z.string().optional(),
})

export type AIScoreInput = z.infer<typeof aiScoreSchema>
