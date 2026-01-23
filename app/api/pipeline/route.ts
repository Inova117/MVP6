import { NextResponse } from 'next/server'

export async function GET() {
    return NextResponse.json({
        leads: [
            {
                id: '1',
                companyName: 'TechCorp Solutions',
                contactName: 'Sarah Johnson',
                aiScore: 95,
                dealValue: 15000,
                status: 'new',
            },
            {
                id: '2',
                companyName: 'Digital Innovations',
                contactName: 'Mike Chen',
                aiScore: 87,
                dealValue: 12000,
                status: 'new',
            },
            {
                id: '3',
                companyName: 'Cloud Services Inc',
                contactName: 'Emma Davis',
                aiScore: 92,
                dealValue: 18000,
                status: 'qualified',
            },
            {
                id: '4',
                companyName: 'DataFlow Systems',
                contactName: 'Alex Kumar',
                aiScore: 78,
                dealValue: 9000,
                status: 'qualified',
            },
            {
                id: '5',
                companyName: 'NextGen Robotics',
                contactName: 'Olivia Martinez',
                aiScore: 88,
                dealValue: 14000,
                status: 'contacted',
            },
            {
                id: '6',
                companyName: 'AI Dynamics',
                contactName: 'James Taylor',
                aiScore: 91,
                dealValue: 16500,
                status: 'contacted',
            },
            {
                id: '7',
                companyName: 'Smart Analytics Co',
                contactName: 'Lisa Wang',
                aiScore: 94,
                dealValue: 20000,
                status: 'proposal',
            },
            {
                id: '8',
                companyName: 'Future Systems',
                contactName: 'David Brown',
                aiScore: 89,
                dealValue: 13000,
                status: 'proposal',
            },
            {
                id: '9',
                companyName: 'Enterprise Solutions',
                contactName: 'Maria Garcia',
                aiScore: 96,
                dealValue: 25000,
                status: 'won',
            },
        ],
    })
}
