import { NextResponse } from 'next/server'

export async function GET() {
    return NextResponse.json({
        stats: [
            {
                name: 'Total Leads',
                value: '248',
                change: '+12%',
                trend: 'up',
            },
            {
                name: 'Qualified Leads',
                value: '94',
                change: '+8%',
                trend: 'up',
            },
            {
                name: 'In Pipeline',
                value: '67',
                change: '+5%',
                trend: 'up',
            },
            {
                name: 'Avg Deal Value',
                value: '$12,450',
                change: '+18%',
                trend: 'up',
            },
        ],
        recentLeads: [
            {
                id: '1',
                company: 'TechCorp Solutions',
                contact: 'Sarah Johnson',
                score: 95,
                status: 'qualified',
                dealValue: 15000,
            },
            {
                id: '2',
                company: 'Digital Innovations',
                contact: 'Mike Chen',
                score: 87,
                status: 'contacted',
                dealValue: 12000,
            },
            {
                id: '3',
                company: 'Cloud Services Inc',
                contact: 'Emma Davis',
                score: 92,
                status: 'proposal',
                dealValue: 18000,
            },
            {
                id: '4',
                company: 'DataFlow Systems',
                contact: 'Alex Kumar',
                score: 78,
                status: 'new',
                dealValue: 9000,
            },
        ],
    })
}
