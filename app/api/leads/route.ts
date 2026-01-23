import { NextResponse } from 'next/server'

export async function GET() {
    // Simulated database delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    return NextResponse.json({
        leads: [
            {
                id: '1',
                companyName: 'TechCorp Solutions',
                industry: 'Technology',
                contactName: 'Sarah Johnson',
                contactEmail: 'sarah@techcorp.com',
                aiScore: 95,
                status: 'qualified',
                dealValue: 15000,
                createdAt: '2026-01-20',
            },
            {
                id: '2',
                companyName: 'Digital Innovations',
                industry: 'Marketing',
                contactName: 'Mike Chen',
                contactEmail: 'mike@digitalinnovations.com',
                aiScore: 87,
                status: 'contacted',
                dealValue: 12000,
                createdAt: '2026-01-19',
            },
            {
                id: '3',
                companyName: 'Cloud Services Inc',
                industry: 'Cloud Computing',
                contactName: 'Emma Davis',
                contactEmail: 'emma@cloudservices.com',
                aiScore: 92,
                status: 'proposal',
                dealValue: 18000,
                createdAt: '2026-01-18',
            },
            {
                id: '4',
                companyName: 'DataFlow Systems',
                industry: 'Data Analytics',
                contactName: 'Alex Kumar',
                contactEmail: 'alex@dataflow.com',
                aiScore: 78,
                status: 'new',
                dealValue: 9000,
                createdAt: '2026-01-17',
            },
            {
                id: '5',
                companyName: 'NextGen Robotics',
                industry: 'Robotics',
                contactName: 'Olivia Martinez',
                contactEmail: 'olivia@nextgenrobotics.com',
                aiScore: 88,
                status: 'new',
                dealValue: 14000,
                createdAt: '2026-01-16',
            },
        ],
    })
}

export async function POST(request: Request) {
    const body = await request.json()

    // Simulated creation
    return NextResponse.json({
        success: true,
        message: 'Lead created successfully',
        lead: {
            id: Math.random().toString(36).substr(2, 9),
            ...body,
            createdAt: new Date().toISOString(),
        },
    }, { status: 201 })
}
