import { describe, it, expect } from 'vitest'
import { cn, formatDate, formatCurrency, getInitials } from '../../lib/utils'

describe('Utils', () => {
    describe('cn', () => {
        it('merges tailwind classes correctly', () => {
            expect(cn('bg-red-500', 'text-white')).toBe('bg-red-500 text-white')
            expect(cn('p-4 p-2')).toBe('p-2') // tailwind-merge in action
        })

        it('handles conditional classes', () => {
            expect(cn('base', true && 'is-true', false && 'is-false')).toBe('base is-true')
        })
    })

    describe('formatDate', () => {
        it('formats a date string correctly', () => {
            const date = '2026-01-23T12:00:00Z'
            expect(formatDate(date)).toBe('Jan 23, 2026')
        })

        it('formats a Date object correctly', () => {
            const date = new Date(2026, 0, 23)
            expect(formatDate(date)).toBe('Jan 23, 2026')
        })
    })

    describe('formatCurrency', () => {
        it('formats numbers as USD', () => {
            expect(formatCurrency(1000)).toBe('$1,000.00')
            expect(formatCurrency(1234.56)).toBe('$1,234.56')
        })
    })

    describe('getInitials', () => {
        it('returns initials for two words', () => {
            expect(getInitials('John Doe')).toBe('JD')
        })

        it('returns initials for one word', () => {
            expect(getInitials('John')).toBe('J')
        })

        it('handles multiple words and takes first two', () => {
            expect(getInitials('John Q. Public')).toBe('JQ')
        })
    })
})
