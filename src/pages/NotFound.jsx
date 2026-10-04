import { Link } from 'react-router-dom'
import PageShell from '../components/PageShell.jsx'

export default function NotFound() {
  return (
    <PageShell title="Page not found" description="That address doesn't exist.">
      <Link to="/" className="btn-primary">Go to homepage</Link>
    </PageShell>
  )
}
