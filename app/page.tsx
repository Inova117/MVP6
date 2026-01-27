import { redirect } from 'next/navigation'

export default function RootPage() {
  // Redirect to home as the main app page
  redirect('/home')
}
