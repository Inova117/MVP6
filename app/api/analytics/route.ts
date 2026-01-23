import { NextResponse } from 'next/server'

export async function GET() {
    return NextResponse.json({
        metrics: {
            conversionRate: '11.3%',
            conversionTrend: '+2.4%',
            avgDealSize: '$15,200',
            dealSizeTrend: '+8.1%',
            salesCycle: '12 days',
            cycleTrend: '-3 days',
            activeDeals: 67,
            activeTrend: '+12',
        },
        funnel: [
            { stage: 'New Leads', count: 248, percentage: 100 },
            { stage: 'Qualified', count: 94, percentage: 38 },
            { stage: 'Contacted', count: 67, percentage: 27 },
            { stage: 'Proposal', count: 45, percentage: 18 },
            { stage: 'Won', count: 28, percentage: 11 },
        ],
        trends: [
            { month: 'Jan', leads: 180, converted: 22 },
            { month: 'Feb', leads: 210, converted: 26 },
            { month: 'Mar', leads: 195, converted: 24 },
            { month: 'Apr', leads: 248, converted: 28 },
        ],
        topPerformers: [
            { name: 'Sarah Johnson', deals: 12, value: 186000 },
            { name: 'Mike Chen', deals: 10, value: 142000 },
            { name: 'Emma Davis', deals: 8, value: 128000 },
        ],
        aiPerformance: [
            { range: 'High Score (90-100)', label: 'Hot', value: '42%', count: 34 },
            { range: 'Medium Score (70-89)', label: 'Warm', value: '18%', count: 86 },
            { range: 'Low Score (<70)', label: 'Cold', value: '5%', count: 128 },
        ],
    })
}
