import { describe, it, expect } from 'vitest'
import { leadSchema, campaignSchema } from '../../lib/validations'

describe('Validations', () => {
    describe('leadSchema', () => {
        it('validates a correct lead object', () => {
            const validLead = {
                companyName: 'Test Corp',
                contactName: 'Jane Doe',
                contactEmail: 'jane@test.com',
                industry: 'Tech',
                website: 'https://test.com',
                dealValue: 5000,
                status: 'new',
            }
            const result = leadSchema.safeParse(validLead)
            expect(result.success).toBe(true)
        })

        it('fails on invalid email', () => {
            const invalidLead = {
                companyName: 'Test Corp',
                contactName: 'Jane Doe',
                contactEmail: 'invalid-email',
            }
            const result = leadSchema.safeParse(invalidLead)
            expect(result.success).toBe(false)
            if (!result.success) {
                expect(result.error.issues[0].message).toBe('Invalid email address')
            }
        })

        it('fails when required fields are missing', () => {
            const incompleteLead = {
                companyName: 'Test Corp',
            }
            const result = leadSchema.safeParse(incompleteLead)
            expect(result.success).toBe(false)
        })
    })

    describe('campaignSchema', () => {
        it('validates a correct campaign object', () => {
            const validCampaign = {
                name: 'Winter Promo',
                subject: 'Save 20% Today!',
                body: 'This is a long enough email body for our test campaign.',
            }
            const result = campaignSchema.safeParse(validCampaign)
            expect(result.success).toBe(true)
        })

        it('fails when body is too short', () => {
            const shortCampaign = {
                name: 'Warm up',
                subject: 'Hi',
                body: 'Too short',
            }
            const result = campaignSchema.safeParse(shortCampaign)
            expect(result.success).toBe(false)
        })
    })
})
