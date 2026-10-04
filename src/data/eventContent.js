// Placeholder copy generated from the structured fields. When real descriptions arrive from the
// pipeline, add a `content_sections` array to the event ([{ title, body }]) and it replaces this.
import { formatDateRange } from '../utils/date.js'

export function getEventContent(e) {
  if (Array.isArray(e.content_sections) && e.content_sections.length) return e.content_sections
  const dates = formatDateRange(e.start_date, e.end_date)
  return [
    {
      title: 'About the event',
      body: `${e.event_name} is a ${e.event_category.toLowerCase()} for ${e.sport.toLowerCase()}, organised by ${e.organiser}. It takes place at ${e.venue} in ${e.city}, ${e.state}, on ${dates}.`,
    },
    {
      title: 'Registration information',
      body: e.ticket_registration_url
        ? 'Use the Tickets / Register button to continue on the organiser\u2019s own page.'
        : 'The organiser has not shared ticket or registration details yet.',
    },
    {
      title: 'Important information',
      body: 'Dates, venue and entry rules can change. Please confirm everything with the organiser before you travel.',
    },
  ]
}
